import { useState } from "react";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import DashboardLayout from "./components/DashboardLayout";
import RestaurantSearchPage from "./components/RestaurantSearchPage";
import RestaurantDetailPage from "./components/RestaurantDetailPage";
import { Restaurant } from "./utils/mockRestaurants";
import { Toaster } from "./components/ui/sonner";

type AppView = "landing" | "search" | "detail" | "login" | "dashboard";

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("landing");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView("detail");
  };

  if (currentView === "landing") {
    return (
      <>
        <LandingPage 
          onGetStarted={() => setCurrentView("login")}
          onReserveTable={() => setCurrentView("search")}
        />
        <Toaster />
      </>
    );
  }

  if (currentView === "search") {
    return (
      <>
        <RestaurantSearchPage 
          onBack={() => setCurrentView("landing")}
          onSelectRestaurant={handleSelectRestaurant}
        />
        <Toaster />
      </>
    );
  }

  if (currentView === "detail" && selectedRestaurant) {
    return (
      <>
        <RestaurantDetailPage 
          restaurant={selectedRestaurant}
          onBack={() => setCurrentView("search")}
        />
        <Toaster />
      </>
    );
  }

  if (currentView === "login") {
    return (
      <>
        <LoginPage onLogin={() => setCurrentView("dashboard")} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <DashboardLayout onLogout={() => setCurrentView("landing")} />
      <Toaster />
    </>
  );
}
