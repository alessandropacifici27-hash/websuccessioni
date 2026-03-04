import Navbar from "@/components/Navbar";
import PracticeAreas from "@/components/PracticeAreas";
import GuidesSection from "@/components/GuidesSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const ServiziOfferti = () => (
  <main className="min-h-screen">
    <Navbar />
    <div className="pt-20">
      <PracticeAreas />
      <GuidesSection />
      <HowItWorks />
    </div>
    <Footer />
  </main>
);

export default ServiziOfferti;
