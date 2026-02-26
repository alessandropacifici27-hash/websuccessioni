import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import PracticeAreas from "@/components/PracticeAreas";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCalculators from "@/components/FloatingCalculators";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <PracticeAreas />
      <Testimonials />
      <FAQSection />
      <ContactSection />
      <Footer />
      <FloatingCalculators />
    </main>
  );
};

export default Index;
