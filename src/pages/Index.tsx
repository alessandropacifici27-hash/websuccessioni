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
      <div className="hidden md:block">
        <PracticeAreas />
      </div>
      <div className="hidden md:block">
        <HowItWorks />
      </div>
      <CtaBanner />
      <div className="hidden md:block">
        <DateCalculators />
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
  );
};

export default Index;
