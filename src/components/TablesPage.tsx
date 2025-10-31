import { useState, useEffect } from "react";
import { UtensilsCrossed, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { fetchTables } from "../utils/api";

export default function TablesPage() {
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTables();
  }, []);

  async function loadTables() {
    try {
      setLoading(true);
      const data = await fetchTables();
      setTables(data);
    } catch (error) {
      console.error("Error loading tables:", error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "from-green-400 to-green-500";
      case "occupied":
        return "from-red-400 to-red-500";
      case "inactive":
        return "from-gray-300 to-gray-400";
      default:
        return "from-gray-300 to-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Disponible";
      case "occupied":
        return "Ocupada";
      case "inactive":
        return "Inactiva";
      default:
        return status;
    }
  };

  const statusCounts = {
    available: Array.isArray(tables) ? tables.filter((t) => t && t.status === "available").length : 0,
    occupied: Array.isArray(tables) ? tables.filter((t) => t && t.status === "occupied").length : 0,
    inactive: Array.isArray(tables) ? tables.filter((t) => t && t.status === "inactive").length : 0,
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Gestión de Mesas</h1>
          <p className="text-muted-foreground mt-1">
            Controla el estado y disponibilidad de tus mesas
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Mesa
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Disponibles</p>
                <h2 className="mt-2">{statusCounts.available}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ocupadas</p>
                <h2 className="mt-2">{statusCounts.occupied}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inactivas</p>
                <h2 className="mt-2">{statusCounts.inactive}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Grid */}
      <Card>
        <CardContent className="p-6">
          {loading ? (
            <p className="text-center text-muted-foreground py-8">
              Cargando mesas...
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className="relative group cursor-pointer transition-transform hover:scale-105"
                >
                  {/* Table Card */}
                  <div
                    className={`aspect-square rounded-2xl bg-gradient-to-br ${getStatusColor(
                      table.status
                    )} shadow-lg flex flex-col items-center justify-center text-white p-4`}
                  >
                    <UtensilsCrossed className="h-8 w-8 mb-2" />
                    <p className="font-semibold">{table.name}</p>
                    <p className="text-sm opacity-90 mt-1">
                      {table.capacity} personas
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                    {getStatusLabel(table.status)}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="text-xs"
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded bg-gradient-to-br from-green-400 to-green-500"></div>
              <span className="text-sm">Disponible - Mesa lista para reservar</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded bg-gradient-to-br from-red-400 to-red-500"></div>
              <span className="text-sm">Ocupada - Mesa con reserva activa</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded bg-gradient-to-br from-gray-300 to-gray-400"></div>
              <span className="text-sm">Inactiva - Mesa no disponible</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
