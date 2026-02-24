import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import PracticeAreas from "@/components/PracticeAreas";
import DateCalculators from "@/components/DateCalculators";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <PracticeAreas />
      <DateCalculators />
      <AboutSection />
      <ProcessSection />
      <Testimonials />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
