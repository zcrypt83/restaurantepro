import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
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
import {
  MapPin,
  Star,
  Clock,
  Users,
  Phone,
  Mail,
  ArrowLeft,
  Calendar as CalendarIcon,
  Check,
  Wifi,
  Car,
  UtensilsCrossed,
  Accessibility
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Restaurant } from "../utils/mockRestaurants";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner@2.0.3";

interface RestaurantDetailPageProps {
  restaurant: Restaurant;
  onBack: () => void;
}

export default function RestaurantDetailPage({ restaurant, onBack }: RestaurantDetailPageProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots: string[] = [];
    const [openHour, openMinute] = restaurant.hours.open.split(":").map(Number);
    const [closeHour, closeMinute] = restaurant.hours.close.split(":").map(Number);

    let currentHour = openHour;
    let currentMinute = openMinute;

    while (
      currentHour < closeHour ||
      (currentHour === closeHour && currentMinute <= closeMinute)
    ) {
      slots.push(
        `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`
      );
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour += 1;
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !name || !email || !phone) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("¡Reserva realizada con éxito!", {
        description: `Te esperamos el ${format(date, "dd/MM/yyyy", { locale: es })} a las ${time}`
      });
      
      // Reset form
      setDate(undefined);
      setTime("");
      setGuests("2");
      setName("");
      setEmail("");
      setPhone("");
      setSpecialRequests("");
      setIsSubmitting(false);
    }, 1500);
  };

  const amenityIcons: { [key: string]: any } = {
    "WiFi": Wifi,
    "Terraza": UtensilsCrossed,
    "Estacionamiento": Car,
    "Accesible": Accessibility,
    "Parking": Car,
    "Valet Parking": Car,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Volver a la búsqueda
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Restaurant Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-600 text-lg px-4 py-2">{restaurant.cuisine}</Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h1 className="text-white text-4xl font-bold mb-2">{restaurant.name}</h1>
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{restaurant.rating}</span>
                    <span className="text-gray-200">({restaurant.reviewCount} reseñas)</span>
                  </div>
                  <Badge variant="secondary" className="text-lg">{restaurant.priceRange}</Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold">Sobre el Restaurante</h2>
                <p className="text-gray-600 leading-relaxed">{restaurant.description}</p>
              </CardContent>
            </Card>

            {/* Information */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Información</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Ubicación</p>
                      <p className="text-gray-600">{restaurant.address}</p>
                      <p className="text-gray-600">{restaurant.location}, {restaurant.city}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Horario</p>
                      <p className="text-gray-600">{restaurant.hours.open} - {restaurant.hours.close}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Teléfono</p>
                      <p className="text-gray-600">{restaurant.phoneNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600 break-all">{restaurant.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Capacidad</p>
                      <p className="text-gray-600">Hasta {restaurant.capacity} personas</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Servicios</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {restaurant.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || Check;
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Icon className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-2 border-blue-200 shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Reservar Mesa</h2>
                
                <form onSubmit={handleSubmitReservation} className="space-y-4">
                  {/* Date */}
                  <div>
                    <Label htmlFor="date">Fecha *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time */}
                  <div>
                    <Label htmlFor="time">Hora *</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar hora" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Guests */}
                  <div>
                    <Label htmlFor="guests">Número de Personas *</Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "persona" : "personas"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Name */}
                  <div>
                    <Label htmlFor="name">Nombre Completo *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 123 456 789"
                      required
                    />
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="requests">Peticiones Especiales</Label>
                    <Textarea
                      id="requests"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Alergias, celebraciones, ubicación preferida..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Procesando..." : "Confirmar Reserva"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Al reservar aceptas recibir confirmación por email y SMS
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
