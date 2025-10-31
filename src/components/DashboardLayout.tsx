import { useState } from "react";
import {
  Home,
  Calendar,
  UtensilsCrossed,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import Dashboard from "./Dashboard";
import ReservationsPage from "./ReservationsPage";
import TablesPage from "./TablesPage";
import ClientsPage from "./ClientsPage";
import SettingsPage from "./SettingsPage";

interface DashboardLayoutProps {
  onLogout: () => void;
}

type PageType = "dashboard" | "reservations" | "tables" | "clients" | "settings";

export default function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "dashboard" as PageType, label: "Inicio", icon: Home },
    { id: "reservations" as PageType, label: "Reservas", icon: Calendar },
    { id: "tables" as PageType, label: "Mesas", icon: UtensilsCrossed },
    { id: "clients" as PageType, label: "Clientes", icon: Users },
    { id: "settings" as PageType, label: "Configuración", icon: Settings },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "reservations":
        return <ReservationsPage />;
      case "tables":
        return <TablesPage />;
      case "clients":
        return <ClientsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-border">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="bg-gradient-to-br from-blue-500 to-green-500 p-2 rounded-lg mr-3">
            <UtensilsCrossed className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold">Reservas Pro</span>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center">
            <button
              className="lg:hidden mr-4"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <h2>Restaurante La Bella Vista</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm">Administrador</p>
              <p className="text-xs text-muted-foreground">
                admin@restaurante.com
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white">
              A
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-border">
            <nav className="px-4 py-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                onClick={onLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Cerrar Sesión</span>
              </button>
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
