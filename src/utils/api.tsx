import { projectId, publicAnonKey } from "./supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-a5b60fb7`;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${publicAnonKey}`,
};

// ============= RESERVATIONS =============

export async function fetchReservations() {
  try {
    const response = await fetch(`${API_BASE}/reservations`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) throw new Error(data.error || "Failed to fetch reservations");
    return data.data || [];
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
}

export async function createReservation(reservation: any) {
  try {
    const response = await fetch(`${API_BASE}/reservations`, {
      method: "POST",
      headers,
      body: JSON.stringify(reservation),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
}

export async function updateReservation(id: string, updates: any) {
  try {
    const response = await fetch(`${API_BASE}/reservations/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
}

export async function deleteReservation(id: string) {
  try {
    const response = await fetch(`${API_BASE}/reservations/${id}`, {
      method: "DELETE",
      headers,
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return true;
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error;
  }
}

// ============= TABLES =============

export async function fetchTables() {
  try {
    const response = await fetch(`${API_BASE}/tables`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) throw new Error(data.error || "Failed to fetch tables");
    return data.data || [];
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
}

export async function createTable(table: any) {
  try {
    const response = await fetch(`${API_BASE}/tables`, {
      method: "POST",
      headers,
      body: JSON.stringify(table),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
}

export async function updateTable(id: string, updates: any) {
  try {
    const response = await fetch(`${API_BASE}/tables/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error("Error updating table:", error);
    throw error;
  }
}

// ============= CLIENTS =============

export async function fetchClients() {
  try {
    const response = await fetch(`${API_BASE}/clients`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) throw new Error(data.error || "Failed to fetch clients");
    return data.data || [];
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
}

export async function createClient(client: any) {
  try {
    const response = await fetch(`${API_BASE}/clients`, {
      method: "POST",
      headers,
      body: JSON.stringify(client),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
}

// ============= SETTINGS =============

export async function fetchSettings() {
  try {
    const response = await fetch(`${API_BASE}/settings`, { headers });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
}

export async function updateSettings(settings: any) {
  try {
    const response = await fetch(`${API_BASE}/settings`, {
      method: "PUT",
      headers,
      body: JSON.stringify(settings),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
}
