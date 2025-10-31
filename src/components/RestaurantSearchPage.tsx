import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Search,
  SlidersHorizontal,
  ArrowLeft,
  DollarSign,
  Utensils
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  mockRestaurants, 
  cuisineTypes, 
  priceRanges, 
  locations,
  cities,
  Restaurant 
} from "../utils/mockRestaurants";
import { Badge } from "./ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface RestaurantSearchPageProps {
  onBack: () => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export default function RestaurantSearchPage({ onBack, onSelectRestaurant }: RestaurantSearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("Todas");
  const [selectedPrice, setSelectedPrice] = useState("Todos");
  const [selectedLocation, setSelectedLocation] = useState("Todas");
  const [selectedCity, setSelectedCity] = useState("Todas");
  const [minRating, setMinRating] = useState("0");

  const filteredRestaurants = mockRestaurants.filter((restaurant) => {
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCuisine = selectedCuisine === "Todas" || restaurant.cuisine === selectedCuisine;
    const matchesPrice = selectedPrice === "Todos" || restaurant.priceRange === selectedPrice;
    const matchesLocation = selectedLocation === "Todas" || restaurant.location === selectedLocation;
    const matchesCity = selectedCity === "Todas" || restaurant.city === selectedCity;
    const matchesRating = restaurant.rating >= parseFloat(minRating);

    return matchesSearch && matchesCuisine && matchesPrice && matchesLocation && matchesCity && matchesRating;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCuisine("Todas");
    setSelectedPrice("Todos");
    setSelectedLocation("Todas");
    setSelectedCity("Todas");
    setMinRating("0");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onBack}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  RestaurantePro
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar restaurantes, cocina, ubicación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden h-12">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtros de Búsqueda</SheetTitle>
                  <SheetDescription>
                    Refina tu búsqueda de restaurantes
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 mt-6">
                  <div>
                    <Label>Tipo de Cocina</Label>
                    <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cuisineTypes.map((cuisine) => (
                          <SelectItem key={cuisine} value={cuisine}>
                            {cuisine}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Ciudad</Label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Zona</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Rango de Precio</Label>
                    <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((price) => (
                          <SelectItem key={price} value={price}>
                            {price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Calificación Mínima</Label>
                    <Select value={minRating} onValueChange={setMinRating}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Todas</SelectItem>
                        <SelectItem value="3">3+ estrellas</SelectItem>
                        <SelectItem value="4">4+ estrellas</SelectItem>
                        <SelectItem value="4.5">4.5+ estrellas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={resetFilters} variant="outline" className="w-full">
                    Limpiar Filtros
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-4">
            <div>
              <Label>Tipo de Cocina</Label>
              <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cuisineTypes.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Ciudad</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Zona</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Precio</Label>
              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((price) => (
                    <SelectItem key={price} value={price}>
                      {price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Calificación</Label>
              <Select value={minRating} onValueChange={setMinRating}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Todas</SelectItem>
                  <SelectItem value="3">3+ ⭐</SelectItem>
                  <SelectItem value="4">4+ ⭐</SelectItem>
                  <SelectItem value="4.5">4.5+ ⭐</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {(selectedCuisine !== "Todas" || selectedPrice !== "Todos" || 
              selectedLocation !== "Todas" || selectedCity !== "Todas" || 
              minRating !== "0") && (
              <>
                <span className="text-sm text-gray-600">Filtros activos:</span>
                {selectedCuisine !== "Todas" && (
                  <Badge variant="secondary">{selectedCuisine}</Badge>
                )}
                {selectedCity !== "Todas" && (
                  <Badge variant="secondary">{selectedCity}</Badge>
                )}
                {selectedLocation !== "Todas" && (
                  <Badge variant="secondary">{selectedLocation}</Badge>
                )}
                {selectedPrice !== "Todos" && (
                  <Badge variant="secondary">{selectedPrice}</Badge>
                )}
                {minRating !== "0" && (
                  <Badge variant="secondary">{minRating}+ ⭐</Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Limpiar todo
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Se encontraron <span className="font-semibold text-gray-900">{filteredRestaurants.length}</span> restaurantes
          </p>
        </div>

        {/* Restaurant Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Card 
                key={restaurant.id} 
                className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-blue-200"
                onClick={() => onSelectRestaurant(restaurant)}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{restaurant.rating}</span>
                      <span className="text-gray-600 text-sm">({restaurant.reviewCount})</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-600">{restaurant.cuisine}</Badge>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{restaurant.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{restaurant.location}, {restaurant.city}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{restaurant.hours.open} - {restaurant.hours.close}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{restaurant.priceRange}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Hasta {restaurant.capacity} personas</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRestaurant(restaurant);
                    }}
                  >
                    Ver Detalles y Reservar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron restaurantes
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta ajustar tus filtros de búsqueda
            </p>
            <Button onClick={resetFilters} variant="outline">
              Limpiar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
