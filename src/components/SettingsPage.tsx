import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { UtensilsCrossed, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1>Configuración</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona la configuración de tu restaurante y sistema
        </p>
      </div>

      {/* Restaurant Info */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Restaurante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
              <UtensilsCrossed className="h-10 w-10 text-white" />
            </div>
            <Button variant="outline">Cambiar Logo</Button>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="restaurant-name">Nombre del Restaurante</Label>
              <Input
                id="restaurant-name"
                defaultValue="Restaurante La Bella Vista"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" defaultValue="+34 912 345 678" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                defaultValue="info@labellavista.com"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                defaultValue="Calle Principal 123, Madrid, España"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                rows={3}
                defaultValue="Restaurante de cocina mediterránea con vistas panorámicas. Especialidad en pescados frescos y paellas."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Horarios de Atención</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { day: "Lunes", start: "12:00", end: "23:00", enabled: true },
              { day: "Martes", start: "12:00", end: "23:00", enabled: true },
              { day: "Miércoles", start: "12:00", end: "23:00", enabled: true },
              { day: "Jueves", start: "12:00", end: "23:00", enabled: true },
              { day: "Viernes", start: "12:00", end: "00:00", enabled: true },
              { day: "Sábado", start: "12:00", end: "00:00", enabled: true },
              { day: "Domingo", start: "12:00", end: "23:00", enabled: false },
            ].map((schedule) => (
              <div
                key={schedule.day}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Switch defaultChecked={schedule.enabled} />
                  <span className="w-24">{schedule.day}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="time"
                    defaultValue={schedule.start}
                    className="w-28"
                    disabled={!schedule.enabled}
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="time"
                    defaultValue={schedule.end}
                    className="w-28"
                    disabled={!schedule.enabled}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferencias del Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <Select defaultValue="es">
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Zona Horaria</Label>
              <Select defaultValue="europe-madrid">
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe-madrid">
                    Europa/Madrid (GMT+1)
                  </SelectItem>
                  <SelectItem value="europe-london">
                    Europa/Londres (GMT+0)
                  </SelectItem>
                  <SelectItem value="america-new-york">
                    América/Nueva York (GMT-5)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificaciones por Email</p>
                <p className="text-sm text-muted-foreground">
                  Recibir alertas de nuevas reservas
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Confirmación Automática</p>
                <p className="text-sm text-muted-foreground">
                  Confirmar reservas automáticamente
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Recordatorios a Clientes</p>
                <p className="text-sm text-muted-foreground">
                  Enviar recordatorios 24h antes
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Usuarios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              {
                name: "Admin Principal",
                email: "admin@restaurante.com",
                role: "Administrador",
              },
              {
                name: "María González",
                email: "maria@restaurante.com",
                role: "Empleado",
              },
              {
                name: "Juan Rodríguez",
                email: "juan@restaurante.com",
                role: "Empleado",
              },
            ].map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">
                    {user.role}
                  </span>
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full">
            Agregar Nuevo Usuario
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
          <Save className="h-4 w-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
