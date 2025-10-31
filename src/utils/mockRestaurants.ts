export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  location: string;
  address: string;
  city: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  rating: number;
  reviewCount: number;
  imageUrl: string;
  hours: {
    open: string;
    close: string;
  };
  capacity: number;
  amenities: string[];
  phoneNumber: string;
  email: string;
}

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "La Bella Italia",
    description: "Auténtica cocina italiana con recetas tradicionales y un ambiente acogedor. Pasta fresca hecha a mano todos los días.",
    cuisine: "Italiana",
    location: "Centro",
    address: "Calle Principal 123",
    city: "Madrid",
    priceRange: "$$",
    rating: 4.7,
    reviewCount: 234,
    imageUrl: "https://images.unsplash.com/photo-1532117472055-4d0734b51f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjE4NDU2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hours: {
      open: "12:00",
      close: "23:00"
    },
    capacity: 60,
    amenities: ["WiFi", "Terraza", "Estacionamiento", "Accesible"],
    phoneNumber: "+34 123 456 789",
    email: "info@labellaitaliza.com"
  },
  {
    id: "2",
    name: "Sakura Sushi Bar",
    description: "Experiencia culinaria japonesa única con sushi de la más alta calidad y chefs expertos de Japón.",
    cuisine: "Japonesa",
    location: "Norte",
    address: "Avenida Japón 45",
    city: "Barcelona",
    priceRange: "$$$",
    rating: 4.9,
    reviewCount: 567,
    imageUrl: "https://images.unsplash.com/photo-1725122194872-ace87e5a1a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHN1c2hpJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjE4Mzk2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hours: {
      open: "13:00",
      close: "23:30"
    },
    capacity: 40,
    amenities: ["WiFi", "Barra de Sushi", "Sake Premium", "Reserva Online"],
    phoneNumber: "+34 234 567 890",
    email: "reservas@sakurasushi.com"
  },
  {
    id: "3",
    name: "Taquería El Azteca",
    description: "Sabores auténticos de México con tacos, burritos y margaritas preparadas al momento.",
    cuisine: "Mexicana",
    location: "Sur",
    address: "Plaza México 78",
    city: "Valencia",
    priceRange: "$",
    rating: 4.5,
    reviewCount: 423,
    imageUrl: "https://images.unsplash.com/photo-1665541719551-655b587161e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwcmVzdGF1cmFudCUyMHRhY29zfGVufDF8fHx8MTc2MTg0MjEzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hours: {
      open: "11:00",
      close: "00:00"
    },
    capacity: 80,
    amenities: ["WiFi", "Música en Vivo", "Terraza", "Delivery"],
    phoneNumber: "+34 345 678 901",
    email: "contacto@elaztexa.com"
  },
  {
    id: "4",
    name: "Prime Steakhouse",
    description: "Carnes premium a la parrilla, selección de vinos exclusivos y ambiente elegante para ocasiones especiales.",
    cuisine: "Asador",
    location: "Centro",
    address: "Calle del Gourmet 12",
    city: "Madrid",
    priceRange: "$$$$",
    rating: 4.8,
    reviewCount: 789,
    imageUrl: "https://images.unsplash.com/photo-1600251284086-6417eff9f5fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVha2hvdXNlJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjE4Nzc2MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hours: {
      open: "19:00",
      close: "23:30"
    },
    capacity: 50,
    amenities: ["WiFi", "Cava de Vinos", "Valet Parking", "Eventos Privados"],
    phoneNumber: "+34 456 789 012",
    email: "reservations@primesteakhouse.com"
  },
  {
    id: "5",
    name: "Mediterráneo Bistró",
    description: "Cocina mediterránea fresca con productos locales y vistas al mar. Ideal para comidas de negocios.",
    cuisine: "Mediterránea",
    location: "Costa",
    address: "Paseo Marítimo 234",
    city: "Málaga",
    priceRange: "$$",
    rating: 4.6,
    reviewCount: 312,
    imageUrl: "https://images.unsplash.com/photo-1759419038843-29749ac4cd2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc2MTgzMjE3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hours: {
      open: "12:00",
      close: "23:00"
    },
    capacity: 70,
    amenities: ["WiFi", "Vista al Mar", "Terraza", "Parking"],
    phoneNumber: "+34 567 890 123",
    email: "info@mediterraneobistro.com"
  },
  {
    id: "6",
    name: "Fusión Asian Kitchen",
    description: "Mezcla única de sabores asiáticos con toques modernos. Cocina tailandesa, china y vietnamita.",
    cuisine: "Asiática",
    location: "Este",
    address: "Calle Asia 56",
    city: "Sevilla",
    priceRange: "$$",
    rating: 4.4,
    reviewCount: 201,
    imageUrl: "https://images.unsplash.com/photo-1685270066116-e8a877927d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwdGFibGV8ZW58MXx8fHwxNzYxNzYwOTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hours: {
      open: "13:00",
      close: "23:00"
    },
    capacity: 55,
    amenities: ["WiFi", "Delivery", "Menú Vegano", "Takeaway"],
    phoneNumber: "+34 678 901 234",
    email: "reservas@fusionasian.com"
  }
];

export const cuisineTypes = ["Todas", "Italiana", "Japonesa", "Mexicana", "Asador", "Mediterránea", "Asiática"];
export const priceRanges = ["Todos", "$", "$$", "$$$", "$$$$"];
export const locations = ["Todas", "Centro", "Norte", "Sur", "Este", "Costa"];
export const cities = ["Todas", "Madrid", "Barcelona", "Valencia", "Málaga", "Sevilla"];
