import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Successione from "./pages/Successione";
import ChiSiamo from "./pages/ChiSiamo";
import ComeFunziona from "./pages/ComeFunziona";
import FaqPage from "./pages/FaqPage";
import NotFound from "./pages/NotFound";
import CookieBanner from "./components/CookieBanner";
import WhatsAppFab from "./components/WhatsAppFab";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/successione" element={<Successione />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/come-funziona" element={<ComeFunziona />} />
          <Route path="/faq" element={<FaqPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppFab />
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
