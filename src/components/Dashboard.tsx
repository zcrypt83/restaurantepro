import { useState, useEffect } from "react";
import { Calendar, Users, UtensilsCrossed, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { fetchReservations, fetchTables, fetchClients } from "../utils/api";

export default function Dashboard() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [reservationsData, tablesData, clientsData] = await Promise.all([
        fetchReservations(),
        fetchTables(),
        fetchClients(),
      ]);
      setReservations(reservationsData);
      setTables(tablesData);
      setClients(clientsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  const todayReservations = Array.isArray(reservations) 
    ? reservations.filter((r) => r && r.date === today) 
    : [];
  
  // Calculate stats
  const availableTables = Array.isArray(tables) 
    ? tables.filter((t) => t && t.status === "available").length 
    : 0;
  const totalTables = Array.isArray(tables) ? tables.length : 0;
  const occupationRate = totalTables > 0 
    ? Math.round((todayReservations.length / totalTables) * 100) 
    : 0;

  const stats = [
    {
      title: "Reservas Hoy",
      value: loading ? "..." : todayReservations.length.toString(),
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      change: "Confirmadas hoy",
    },
    {
      title: "Mesas Libres",
      value: loading ? "..." : `${availableTables}/${totalTables}`,
      icon: UtensilsCrossed,
      color: "from-green-500 to-green-600",
      change: `${Math.round((availableTables / totalTables) * 100)}% disponibles`,
    },
    {
      title: "Clientes Activos",
      value: loading ? "..." : (Array.isArray(clients) ? clients.length : 0).toString(),
      icon: Users,
      color: "from-purple-500 to-purple-600",
      change: "Total registrados",
    },
    {
      title: "Ocupación",
      value: loading ? "..." : `${occupationRate}%`,
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      change: "Hoy",
    },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Panel de Control</h1>
          <p className="text-muted-foreground mt-1">
            Lunes, 27 de Octubre 2025
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
          <Calendar className="h-4 w-4 mr-2" />
          Nueva Reserva
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h2 className="mt-2">{stat.value}</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Reservas de Hoy */}
      <Card>
        <CardHeader>
          <CardTitle>Reservas de Hoy</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Cargando...</p>
          ) : todayReservations.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No hay reservas para hoy
            </p>
          ) : (
            <div className="space-y-4">
              {todayReservations.map((reservation, index) => (
                <div
                  key={reservation.id || `today-reservation-${index}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                      {reservation.client
                        .split(" ")
                        .map((n: string, i: number) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium">{reservation.client}</p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.time} • {reservation.table} • {reservation.guests}{" "}
                        personas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        reservation.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {reservation.status === "confirmed"
                        ? "Confirmada"
                        : "Pendiente"}
                    </span>
                    <Button variant="ghost" size="sm">
                      Ver detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-3 text-blue-500" />
            <h3 className="mb-2">Ver Calendario</h3>
            <p className="text-sm text-muted-foreground">
              Consulta todas las reservas
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <UtensilsCrossed className="h-8 w-8 mx-auto mb-3 text-green-500" />
            <h3 className="mb-2">Gestionar Mesas</h3>
            <p className="text-sm text-muted-foreground">
              Organiza la disponibilidad
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-3 text-purple-500" />
            <h3 className="mb-2">Ver Clientes</h3>
            <p className="text-sm text-muted-foreground">
              Administra tu base de datos
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
