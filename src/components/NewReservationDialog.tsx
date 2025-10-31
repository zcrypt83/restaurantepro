import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { createReservation, fetchTables } from "../utils/api";

interface NewReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReservationCreated?: () => void;
}

export default function NewReservationDialog({
  open,
  onOpenChange,
  onReservationCreated,
}: NewReservationDialogProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    table: "",
    time: "",
    guests: "",
    notes: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"error" | "success">("error");
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadTables();
    }
  }, [open]);

  async function loadTables() {
    try {
      const data = await fetchTables();
      setTables(data);
    } catch (error) {
      console.error("Error loading tables:", error);
    }
  }

  const times = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      setAlertType("error");
      setAlertMessage("Por favor selecciona una fecha");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    setShowAlert(false);
    
    try {
      // Find the selected table - handle both formats (with and without "table:" prefix)
      const selectedTable = tables.find((t) => {
        if (!t.id) return false;
        const tableId = t.id.includes(":") ? t.id.split(":")[1] : t.id;
        return tableId === formData.table;
      });
      
      const reservation = {
        client: formData.name,
        phone: formData.phone,
        email: formData.email,
        table: selectedTable?.name || `Mesa ${formData.table}`,
        date: date.toISOString().split("T")[0],
        time: formData.time,
        guests: formData.guests,
        notes: formData.notes,
        status: "confirmed",
      };

      await createReservation(reservation);
      
      setAlertType("success");
      setAlertMessage("¡Reserva creada exitosamente!");
      setShowAlert(true);
      
      // Reset form
      setTimeout(() => {
        onOpenChange(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          table: "",
          time: "",
          guests: "",
          notes: "",
        });
        setShowAlert(false);
        if (onReservationCreated) {
          onReservationCreated();
        }
      }, 1500);
      
    } catch (error: any) {
      setAlertType("error");
      setAlertMessage(error.message || "Error al crear la reserva");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva Reserva</DialogTitle>
          <DialogDescription>
            Completa la información para registrar una nueva reserva
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Alert for conflicts */}
          {showAlert && (
            <Alert variant={alertType === "error" ? "destructive" : "default"}>
              {alertType === "error" ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Cliente *</Label>
              <Input
                id="name"
                placeholder="Ej: María García"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+34 600 123 456"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="cliente@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>Fecha *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      date.toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time */}
            <div className="space-y-2">
              <Label htmlFor="time">Hora *</Label>
              <Select
                value={formData.time}
                onValueChange={(value) =>
                  setFormData({ ...formData, time: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona hora" />
                </SelectTrigger>
                <SelectContent>
                  {times.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="space-y-2">
              <Label htmlFor="table">Mesa *</Label>
              <Select
                value={formData.table}
                onValueChange={(value) =>
                  setFormData({ ...formData, table: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona mesa" />
                </SelectTrigger>
                <SelectContent>
                  {tables.map((table) => {
                    const tableId = table.id && table.id.includes(":") 
                      ? table.id.split(":")[1] 
                      : table.id || "";
                    return (
                      <SelectItem key={table.id} value={tableId}>
                        {table.name} (Capacidad: {table.capacity})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <Label htmlFor="guests">Número de Personas *</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="12"
                placeholder="4"
                value={formData.guests}
                onChange={(e) =>
                  setFormData({ ...formData, guests: e.target.value })
                }
                required
              />
            </div>

            {/* Notes */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Observaciones</Label>
              <Textarea
                id="notes"
                placeholder="Ej: Cumpleaños, aniversario, alergias, etc."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Reserva"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
