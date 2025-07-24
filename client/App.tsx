import "./global.css";

import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Apply from "./pages/Apply";
import Status from "./pages/Status";
import Services from "./pages/Services";
import Complaints from "./pages/Complaints";
import Help from "./pages/Help";
import About from "./pages/About";
import Statistics from "./pages/Statistics";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster position="top-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/status" element={<Status />} />
            <Route path="/services" element={<Services />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/stats" element={<Statistics />} />
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
    </ThemeProvider>
  </QueryClientProvider>
);

// Ensure createRoot is only called once
const container = document.getElementById("root")!;
let root = (window as any).__reactRoot;
if (!root) {
  root = createRoot(container);
  (window as any).__reactRoot = root;
}
root.render(<App />);
