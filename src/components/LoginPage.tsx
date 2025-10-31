import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { UtensilsCrossed } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-border">
          {/* Logo y título */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-green-500 p-4 rounded-2xl mb-4">
              <UtensilsCrossed className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-center">Sistema de Reservas</h1>
            <p className="text-muted-foreground text-center mt-2">
              Gestiona tu restaurante de forma eficiente
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@restaurante.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button type="submit" className="w-full h-11">
              Iniciar Sesión
            </Button>
          </form>

          {/* Registro */}
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">¿No tienes cuenta? </span>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Registrarse como administrador
            </a>
          </div>
        </div>

        {/* Info adicional */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Plataforma segura de gestión restaurantera
        </p>
      </div>
    </div>
  );
}
