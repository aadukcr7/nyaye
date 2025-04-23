import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewPetition from "./pages/NewPetition";
import CaseDetail from "./pages/CaseDetail";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Petitions from "./pages/Petitions";
import Calendar from "./pages/Calendar";
import People from "./pages/People";
import Reports from "./pages/Reports";
import Search from "./pages/Search";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/new-petition" element={<NewPetition />} />
          <Route path="/petitions" element={<Petitions />} />
          <Route path="/case/:id" element={<CaseDetail />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/people" element={<People />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/index" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
