import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CookieBanner from "./components/CookieBanner";
import WhatsAppFab from "./components/WhatsAppFab";
import ChatbotWidget from "./components/ChatbotWidget";

// Lazy-loaded pages (code splitting)
const Successione = lazy(() => import("./pages/Successione"));
const ChiSiamo = lazy(() => import("./pages/ChiSiamo"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const StrumentiUtili = lazy(() => import("./pages/StrumentiUtili"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const TerminiServizio = lazy(() => import("./pages/TerminiServizio"));
const IniziaPratica = lazy(() => import("./pages/IniziaPratica"));
const GuidePage = lazy(() => import("./pages/GuidePage"));
const CostoDichiarazione = lazy(() => import("./pages/guide/CostoDichiarazione"));
const DocumentiDichiarazione = lazy(() => import("./pages/guide/DocumentiDichiarazione"));
const ScadenzaDichiarazione = lazy(() => import("./pages/guide/ScadenzaDichiarazione"));
const SuccessioneSenzaTestamento = lazy(() => import("./pages/guide/SuccessioneSenzaTestamento"));
const VolturaSuccessione = lazy(() => import("./pages/guide/VolturaSuccessione"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/successione" element={<Successione />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/strumenti-utili" element={<StrumentiUtili />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/termini-servizio" element={<TerminiServizio />} />
            <Route path="/inizia-pratica-online" element={<IniziaPratica />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        
        <ChatbotWidget />
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;