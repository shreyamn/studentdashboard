
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Map from "./pages/Map";
import Events from "./pages/Events";
import Clubs from "./pages/Clubs";
import Notifications from "./pages/Notifications";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to restrict Courses page to students only
const ProtectedCourseRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If user is faculty or staff, redirect to dashboard
  if (user?.role === 'faculty' || user?.role === 'staff') {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Restrict Courses page to students only */}
              <Route path="/courses" element={
                <ProtectedCourseRoute>
                  <Courses />
                </ProtectedCourseRoute>
              } />
              
              <Route path="/map" element={<Map />} />
              <Route path="/events" element={<Events />} />
              <Route path="/clubs" element={<Clubs />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/support" element={<Support />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
