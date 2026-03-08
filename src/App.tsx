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
import ServiziOfferti from "./pages/ServiziOfferti";
import StrumentiUtili from "./pages/StrumentiUtili";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import TerminiServizio from "./pages/TerminiServizio";
import IniziaPratica from "./pages/IniziaPratica";
import NotFound from "./pages/NotFound";
import CookieBanner from "./components/CookieBanner";
import WhatsAppFab from "./components/WhatsAppFab";
import ChatbotWidget from "./components/ChatbotWidget";

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
          <Route path="/servizi-proposti" element={<ServiziOfferti />} />
          <Route path="/strumenti-utili" element={<StrumentiUtili />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/termini-servizio" element={<TerminiServizio />} />
          <Route path="/inizia-pratica" element={<IniziaPratica />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <ChatbotWidget />
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
