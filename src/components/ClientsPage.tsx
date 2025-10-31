import { useState, useEffect } from "react";
import { Plus, Search, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { fetchClients } from "../utils/api";

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    try {
      setLoading(true);
      const data = await fetchClients();
      setClients(data);
    } catch (error) {
      console.error("Error loading clients:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      searchQuery === "" ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery)
  );

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Gestión de Clientes</h1>
          <p className="text-muted-foreground mt-1">
            Base de datos de clientes y su historial
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Cliente
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total de Clientes</p>
            <h2 className="mt-2">{loading ? "..." : clients.length}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Clientes VIP</p>
            <h2 className="mt-2">
              {loading
                ? "..."
                : clients.filter((c) => (c.totalReservations || 0) >= 15).length}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Más de 15 reservas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Con Reservas</p>
            <h2 className="mt-2">
              {loading
                ? "..."
                : clients.filter((c) => (c.totalReservations || 0) > 0).length}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Clientes activos</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, correo o teléfono..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Table - Desktop */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          {loading ? (
            <p className="text-center text-muted-foreground py-8">
              Cargando clientes...
            </p>
          ) : filteredClients.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No se encontraron clientes
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead className="text-center">Total Reservas</TableHead>
                  <TableHead>Última Visita</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client, index) => (
                  <TableRow key={client.id || `client-${index}`}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                          {client.name
                            .split(" ")
                            .map((n: string, i: number) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          {(client.totalReservations || 0) >= 15 && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                              VIP
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-3 w-3 mr-2" />
                          {client.email || "No proporcionado"}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="h-3 w-3 mr-2" />
                          {client.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-700">
                        {client.totalReservations || 0}
                      </span>
                    </TableCell>
                    <TableCell>
                      {client.lastVisit
                        ? new Date(client.lastVisit).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "Sin visitas"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Ver Perfil
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Clients Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Cargando clientes...
            </CardContent>
          </Card>
        ) : filteredClients.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No se encontraron clientes
            </CardContent>
          </Card>
        ) : (
          filteredClients.map((client, index) => (
            <Card key={client.id || `client-mobile-${index}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                    {client.name
                      .split(" ")
                      .map((n: string, i: number) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{client.name}</p>
                      {(client.totalReservations || 0) >= 15 && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                          VIP
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 mt-2">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Mail className="h-3 w-3 mr-2" />
                        {client.email || "No proporcionado"}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Phone className="h-3 w-3 mr-2" />
                        {client.phone}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm">
                        <span className="font-medium">
                          {client.totalReservations || 0}
                        </span>{" "}
                        reservas
                      </span>
                      <Button variant="ghost" size="sm">
                        Ver Perfil
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
