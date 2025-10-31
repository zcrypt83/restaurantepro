import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", logger(console.log));
app.use("*", cors());

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// ============= RESERVATIONS =============

// Get all reservations
app.get("/make-server-a5b60fb7/reservations", async (c) => {
  try {
    const reservations = await kv.getByPrefix("reservation:");
    return c.json({ success: true, data: reservations });
  } catch (error) {
    console.log("Error fetching reservations:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create new reservation
app.post("/make-server-a5b60fb7/reservations", async (c) => {
  try {
    const body = await c.req.json();
    const { client, email, phone, table, date, time, guests, notes, status } = body;

    if (!client || !phone || !table || !date || !time || !guests) {
      return c.json(
        { success: false, error: "Missing required fields" },
        400
      );
    }

    // Check for conflicts
    const existingReservations = await kv.getByPrefix("reservation:");
    const conflict = existingReservations.find(
      (r: any) =>
        r.table === table &&
        r.date === date &&
        r.time === time &&
        r.status !== "cancelled"
    );

    if (conflict) {
      return c.json(
        {
          success: false,
          error: "La mesa ya está reservada en este horario",
        },
        400
      );
    }

    const id = `reservation:${Date.now()}`;
    const reservation = {
      id,
      client,
      email,
      phone,
      table,
      date,
      time,
      guests: parseInt(guests),
      notes: notes || "",
      status: status || "confirmed",
      createdAt: new Date().toISOString(),
    };

    await kv.set(id, reservation);

    // Update client if exists, or create new
    const clientKey = `client:${phone}`;
    const existingClient = await kv.get(clientKey);
    
    if (existingClient) {
      await kv.set(clientKey, {
        ...existingClient,
        totalReservations: (existingClient.totalReservations || 0) + 1,
        lastVisit: date,
      });
    } else {
      await kv.set(clientKey, {
        name: client,
        email: email || "",
        phone,
        totalReservations: 1,
        lastVisit: date,
        createdAt: new Date().toISOString(),
      });
    }

    return c.json({ success: true, data: reservation });
  } catch (error) {
    console.log("Error creating reservation:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update reservation
app.put("/make-server-a5b60fb7/reservations/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    const existing = await kv.get(`reservation:${id}`);
    if (!existing) {
      return c.json(
        { success: false, error: "Reservation not found" },
        404
      );
    }

    const updated = {
      ...existing,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`reservation:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log("Error updating reservation:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete reservation
app.delete("/make-server-a5b60fb7/reservations/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`reservation:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting reservation:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= TABLES =============

// Get all tables
app.get("/make-server-a5b60fb7/tables", async (c) => {
  try {
    const tables = await kv.getByPrefix("table:");
    
    // If no tables exist, initialize default tables
    if (tables.length === 0) {
      const defaultTables = [
        { id: "table:1", name: "Mesa 1", capacity: 2, status: "available" },
        { id: "table:2", name: "Mesa 2", capacity: 2, status: "available" },
        { id: "table:3", name: "Mesa 3", capacity: 4, status: "available" },
        { id: "table:4", name: "Mesa 4", capacity: 4, status: "available" },
        { id: "table:5", name: "Mesa 5", capacity: 6, status: "available" },
        { id: "table:6", name: "Mesa 6", capacity: 8, status: "available" },
        { id: "table:7", name: "Mesa 7", capacity: 4, status: "available" },
        { id: "table:8", name: "Mesa 8", capacity: 6, status: "available" },
        { id: "table:9", name: "Mesa 9", capacity: 4, status: "inactive" },
        { id: "table:10", name: "Mesa 10", capacity: 2, status: "available" },
        { id: "table:11", name: "Mesa 11", capacity: 2, status: "available" },
        { id: "table:12", name: "Mesa 12", capacity: 4, status: "available" },
      ];
      
      // Use mset properly with array of [key, value] pairs
      const pairs: [string, any][] = defaultTables.map(t => [t.id, t]);
      const keys = pairs.map(p => p[0]);
      const values = pairs.map(p => p[1]);
      await kv.mset(keys, values);
      
      return c.json({ success: true, data: defaultTables });
    }
    
    return c.json({ success: true, data: tables });
  } catch (error) {
    console.log("Error fetching tables:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create table
app.post("/make-server-a5b60fb7/tables", async (c) => {
  try {
    const body = await c.req.json();
    const { name, capacity, status } = body;

    if (!name || !capacity) {
      return c.json(
        { success: false, error: "Missing required fields" },
        400
      );
    }

    const id = `table:${Date.now()}`;
    const table = {
      id,
      name,
      capacity: parseInt(capacity),
      status: status || "available",
    };

    await kv.set(id, table);
    return c.json({ success: true, data: table });
  } catch (error) {
    console.log("Error creating table:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update table
app.put("/make-server-a5b60fb7/tables/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    const existing = await kv.get(`table:${id}`);
    if (!existing) {
      return c.json({ success: false, error: "Table not found" }, 404);
    }

    const updated = {
      ...existing,
      ...body,
    };

    await kv.set(`table:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log("Error updating table:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= CLIENTS =============

// Get all clients
app.get("/make-server-a5b60fb7/clients", async (c) => {
  try {
    const clients = await kv.getByPrefix("client:");
    return c.json({ success: true, data: clients });
  } catch (error) {
    console.log("Error fetching clients:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create client
app.post("/make-server-a5b60fb7/clients", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone } = body;

    if (!name || !phone) {
      return c.json(
        { success: false, error: "Missing required fields" },
        400
      );
    }

    const id = `client:${phone}`;
    const client = {
      id,
      name,
      email: email || "",
      phone,
      totalReservations: 0,
      lastVisit: null,
      createdAt: new Date().toISOString(),
    };

    await kv.set(id, client);
    return c.json({ success: true, data: client });
  } catch (error) {
    console.log("Error creating client:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= SETTINGS =============

// Get settings
app.get("/make-server-a5b60fb7/settings", async (c) => {
  try {
    const settings = await kv.get("settings:restaurant");
    
    if (!settings) {
      // Return default settings
      const defaultSettings = {
        name: "Restaurante La Bella Vista",
        phone: "+34 912 345 678",
        email: "info@labellavista.com",
        address: "Calle Principal 123, Madrid, España",
        description: "Restaurante de cocina mediterránea con vistas panorámicas.",
        language: "es",
        timezone: "europe-madrid",
        notifications: {
          email: true,
          autoConfirm: false,
          reminders: true,
        },
        hours: [
          { day: "Lunes", start: "12:00", end: "23:00", enabled: true },
          { day: "Martes", start: "12:00", end: "23:00", enabled: true },
          { day: "Miércoles", start: "12:00", end: "23:00", enabled: true },
          { day: "Jueves", start: "12:00", end: "23:00", enabled: true },
          { day: "Viernes", start: "12:00", end: "00:00", enabled: true },
          { day: "Sábado", start: "12:00", end: "00:00", enabled: true },
          { day: "Domingo", start: "12:00", end: "23:00", enabled: false },
        ],
      };
      
      await kv.set("settings:restaurant", defaultSettings);
      return c.json({ success: true, data: defaultSettings });
    }
    
    return c.json({ success: true, data: settings });
  } catch (error) {
    console.log("Error fetching settings:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update settings
app.put("/make-server-a5b60fb7/settings", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("settings:restaurant", body);
    return c.json({ success: true, data: body });
  } catch (error) {
    console.log("Error updating settings:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
