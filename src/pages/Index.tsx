import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import WhyChooseUs from "@/components/WhyChooseUs";
import PracticeAreas from "@/components/PracticeAreas";
import HowItWorks from "@/components/HowItWorks";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>WebSuccessioni — Dichiarazioni di Successione Online</title>
        <meta
          name="description"
          content="Servizio professionale di dichiarazioni di successione interamente online. Preventivo gratuito, risposta entro 24h. Competenza e qualità a costi accessibili."
        />
      </Helmet>
      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <WhyChooseUs />
        <StatsBar />
        <div className="hidden md:block">
          <PracticeAreas />
        </div>
        <ContactSection />
        <div className="hidden md:block">
          <section className="container mx-auto px-4 py-8">
            <div className="bg-zinc-900/95 border border-yellow-500/20 rounded-2xl p-8">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6">Perché affidarti a noi?</h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <span className="font-body text-zinc-300">Esperienza certificata in diritto successorio italiano</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <span className="font-body text-zinc-300">Pratica completamente gestita da remoto, senza spostamenti</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <span className="font-body text-zinc-300">Assistenza dedicata dalla prima consulenza alla conclusione</span>
                </li>
              </ul>
              <Link to="/chi-siamo" className="font-body text-primary hover:underline transition-colors">Scopri come lavoriamo →</Link>
            </div>
          </section>
        </div>
        <div className="hidden md:block">
          <HowItWorks />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Index;
