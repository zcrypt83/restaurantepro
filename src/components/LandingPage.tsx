import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Utensils, 
  Calendar, 
  Users, 
  Clock, 
  Star, 
  ChefHat, 
  Sparkles,
  ArrowRight 
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onGetStarted: () => void;
  onReserveTable: () => void;
}

export default function LandingPage({ onGetStarted, onReserveTable }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                RestaurantePro
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={onReserveTable}
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hidden sm:inline-flex"
              >
                Reservar Mesa
              </Button>
              <Button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                Administrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-green-100/50" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              
              
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-green-700 bg-clip-text text-transparent">
                  Bienvenido a RestaurantePro
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-xl">
                  El sistema de gestión más completo para tu restaurante. 
                  Controla reservas, mesas y clientes desde una plataforma moderna e intuitiva.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={onReserveTable}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 group"
                >
                  Reservar Mesa Ahora
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={onGetStarted}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Acceso Administrador
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-green-400 border-2 border-white" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">500+</span> restaurantes
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">4.9/5</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-green-200 rounded-3xl blur-3xl opacity-30" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1759419038843-29749ac4cd2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc2MTgzMjE3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Elegant restaurant interior"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Gestiona tu restaurante de manera profesional con herramientas diseñadas para maximizar tu eficiencia
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Calendar,
                title: "Gestión de Reservas",
                description: "Calendario interactivo con validación automática de horarios y disponibilidad",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Users,
                title: "Control de Clientes",
                description: "Base de datos completa con historial de visitas y preferencias",
                color: "from-green-500 to-green-600"
              },
              {
                icon: Utensils,
                title: "Administración de Mesas",
                description: "Visualización en tiempo real del estado de todas las mesas",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: Clock,
                title: "Control de Horarios",
                description: "Define horarios de apertura y cierre personalizados por día",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: ChefHat,
                title: "Panel Administrativo",
                description: "Dashboard completo con métricas y estadísticas en tiempo real",
                color: "from-indigo-500 to-indigo-600"
              },
              {
                icon: Sparkles,
                title: "Actualizaciones en Vivo",
                description: "Sincronización instantánea de datos entre todos los dispositivos",
                color: "from-pink-500 to-pink-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-2 hover:border-blue-200 transition-all hover:shadow-lg group">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1685270066116-e8a877927d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwdGFibGV8ZW58MXx8fHwxNzYxNzYwOTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Fine dining table"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl mt-8">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1709396759401-ac2c8e7a069f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYxODE3MzU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Restaurant food plating"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                <ChefHat className="w-4 h-4" />
                <span className="text-sm">Solución Profesional</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Diseñado para restaurantes modernos
              </h2>
              
              <p className="text-lg text-gray-600">
                RestaurantePro combina tecnología de vanguardia con un diseño intuitivo 
                para ofrecer la mejor experiencia de gestión. Desarrollado por expertos 
                en la industria de la hospitalidad.
              </p>

              <div className="space-y-4">
                {[
                  "Interfaz moderna y fácil de usar",
                  "Sincronización en tiempo real",
                  "Acceso desde cualquier dispositivo",
                  "Soporte técnico dedicado 24/7"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={onReserveTable}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  Reservar Mesa
                </Button>
                <Button 
                  size="lg"
                  onClick={onGetStarted}
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50"
                >
                  Soy Administrador
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Restaurantes" },
              { number: "50K+", label: "Reservas Mensuales" },
              { number: "99.9%", label: "Tiempo Activo" },
              { number: "24/7", label: "Soporte" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              ¿Listo para disfrutar de una experiencia única?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra y reserva en los mejores restaurantes de tu ciudad. 
              Gestión fácil, confirmación instantánea y experiencias gastronómicas inolvidables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={onReserveTable}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 group"
              >
                Reservar Mesa Ahora
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={onGetStarted}
                className="border-2 border-gray-300 hover:bg-gray-50"
              >
                Acceso Restaurantes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-white">RestaurantePro</span>
              </div>
              <p className="text-sm">
                La solución más completa para la gestión de restaurantes modernos.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ayuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 RestaurantePro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
