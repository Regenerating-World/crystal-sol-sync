import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { AppShell } from "./components/AppShell";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Social from "./pages/Social";
import Transparency from "./pages/Transparency";
import Lakes from "./pages/Lakes";
import LakeDetail from "./pages/LakeDetail";
import Campaigns from "./pages/Campaigns";
import Notifications from "./pages/Notifications";
import Admin from "./pages/Admin";
import Manifesto from "./pages/Manifesto";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/app/home/franco" replace />} />
            <Route path="/app" element={<AppShell />}>
              <Route path="home/franco" element={<Home />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="social" element={<Social />} />
              <Route path="transparency" element={<Transparency />} />
              <Route path="lakes" element={<Lakes />} />
              <Route path="lakes/:lakeId" element={<LakeDetail />} />
              <Route path="campaigns" element={<Campaigns />} />
              <Route path="manifesto" element={<Manifesto />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
