import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import LandingGoogle from "./pages/LandingGoogle";
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
const ConsulenzaGiuridica = lazy(() => import("./pages/ConsulenzaGiuridica"));
const GuidePage = lazy(() => import("./pages/GuidePage"));
const CostoDichiarazione = lazy(() => import("./pages/guide/CostoDichiarazione"));
const DocumentiDichiarazione = lazy(() => import("./pages/guide/DocumentiDichiarazione"));
const ScadenzaDichiarazione = lazy(() => import("./pages/guide/ScadenzaDichiarazione"));
const SuccessioneSenzaTestamento = lazy(() => import("./pages/guide/SuccessioneSenzaTestamento"));
const VolturaSuccessione = lazy(() => import("./pages/guide/VolturaSuccessione"));
const RinunciaEredita = lazy(() => import("./pages/guide/RinunciaEredita"));
const SuccessioneConDebiti = lazy(() => import("./pages/guide/SuccessioneConDebiti"));
const EredeVsLegatario = lazy(() => import("./pages/guide/EredeVsLegatario"));
const SuccessioneAzienda = lazy(() => import("./pages/guide/SuccessioneAzienda"));
const DirittiConiuge = lazy(() => import("./pages/guide/DirittiConiuge"));
const ImpostaSuccessione = lazy(() => import("./pages/guide/ImpostaSuccessione"));
const SuccessioneContoCorrente = lazy(() => import("./pages/guide/SuccessioneContoCorrente"));
const SuccessioneFratelliSorelle = lazy(() => import("./pages/guide/SuccessioneFratelliSorelle"));
const QuoteLegittima = lazy(() => import("./pages/guide/QuoteLegittima"));
const SuccessioneAutoVeicoli = lazy(() => import("./pages/guide/SuccessioneAutoVeicoli"));
const EreditaDebiti = lazy(() => import("./pages/guide/EreditaDebiti"));
const SuccessioneSeparazioneDivorzio = lazy(() => import("./pages/guide/SuccessioneSeparazioneDivorzio"));
const SuccessioneNonniNipoti = lazy(() => import("./pages/guide/SuccessioneNonniNipoti"));
const RinunciaEreditaGuida = lazy(() => import("./pages/guide/RinunciaEreditaGuida"));
const PolizzeVitaSuccessione = lazy(() => import("./pages/guide/PolizzeVitaSuccessione"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/richiedi-consulenza" element={<LandingGoogle />} />
            <Route path="/successione" element={<Successione />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/calcola-le-tue-scadenze" element={<StrumentiUtili />} />
            <Route path="/strumenti-utili" element={<Navigate to="/calcola-le-tue-scadenze" replace />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/termini-servizio" element={<TerminiServizio />} />
            <Route path="/inizia-pratica-online" element={<IniziaPratica />} />
            <Route path="/consulenza-giuridica" element={<ConsulenzaGiuridica />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/guide/costo-dichiarazione-successione" element={<CostoDichiarazione />} />
            <Route path="/guide/documenti-dichiarazione-successione" element={<DocumentiDichiarazione />} />
            <Route path="/guide/scadenza-dichiarazione-successione" element={<ScadenzaDichiarazione />} />
            <Route path="/guide/successione-senza-testamento" element={<SuccessioneSenzaTestamento />} />
            <Route path="/guide/voltura-catastale-successione" element={<VolturaSuccessione />} />
            <Route path="/guide/rinuncia-eredita" element={<RinunciaEredita />} />
            <Route path="/guide/successione-con-debiti" element={<SuccessioneConDebiti />} />
            <Route path="/guide/erede-vs-legatario" element={<EredeVsLegatario />} />
            <Route path="/guide/successione-azienda-ditta" element={<SuccessioneAzienda />} />
            <Route path="/guide/diritti-coniuge-superstite" element={<DirittiConiuge />} />
            <Route path="/guide/imposta-successione" element={<ImpostaSuccessione />} />
            <Route path="/guide/successione-conto-corrente" element={<SuccessioneContoCorrente />} />
            <Route path="/guide/successione-fratelli-sorelle" element={<SuccessioneFratelliSorelle />} />
            <Route path="/guide/quote-legittima" element={<QuoteLegittima />} />
            <Route path="/guide/successione-auto-veicoli" element={<SuccessioneAutoVeicoli />} />
            <Route path="/guide/eredita-debiti" element={<EreditaDebiti />} />
            <Route path="/guide/successione-separazione-divorzio" element={<SuccessioneSeparazioneDivorzio />} />
            <Route path="/guide/successione-nonni-nipoti" element={<SuccessioneNonniNipoti />} />
            <Route path="/guide/rinuncia-eredita-guida" element={<RinunciaEreditaGuida />} />
            <Route path="/guide/polizze-vita-successione" element={<PolizzeVitaSuccessione />} />
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