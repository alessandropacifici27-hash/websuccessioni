import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import PracticeAreas from "@/components/PracticeAreas";
import DateCalculators from "@/components/DateCalculators";
import Testimonials from "@/components/Testimonials";
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
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
