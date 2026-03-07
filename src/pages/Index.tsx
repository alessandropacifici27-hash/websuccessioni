import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import WhyChooseUs from "@/components/WhyChooseUs";
import PracticeAreas from "@/components/PracticeAreas";
import HowItWorks from "@/components/HowItWorks";
import CtaBanner from "@/components/CtaBanner";
import DateCalculators from "@/components/DateCalculators";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import GuidesSection from "@/components/GuidesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

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
        <StatsBar />
        <WhyChooseUs />
        <div className="hidden md:block">
          <PracticeAreas />
        </div>
        <div className="hidden md:block">
          <HowItWorks />
        </div>
        <div className="hidden md:hidden">
          <CtaBanner />
        </div>
        <Testimonials />
        <div className="hidden md:block">
          <FAQSection />
        </div>
        <div className="hidden md:block">
          <GuidesSection />
        </div>
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
