import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Apply from "./pages/Apply";
import Status from "./pages/Status";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/status" element={<Status />} />
          <Route path="/services" element={<Placeholder page="Layanan" />} />
          <Route path="/help" element={<Placeholder page="Bantuan & FAQ" />} />
          <Route path="/about" element={<Placeholder page="Tentang Kami" />} />
          <Route
            path="/stats"
            element={<Placeholder page="Statistik Layanan" />}
          />
          <Route
            path="/services/:type"
            element={<Placeholder page="Detail Layanan" />}
          />
          <Route path="/news" element={<Placeholder page="Berita" />} />
          <Route
            path="/regulations"
            element={<Placeholder page="Peraturan" />}
          />
          <Route path="/faq" element={<Placeholder page="FAQ" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
