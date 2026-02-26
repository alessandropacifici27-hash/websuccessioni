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

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <WhyChooseUs />
      <PracticeAreas />
      <HowItWorks />
      <CtaBanner />
      <DateCalculators />
      <Testimonials />
      <FAQSection />
      <GuidesSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
