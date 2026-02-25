import Navbar from "@/components/Navbar";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const FaqPage = () => (
  <main className="min-h-screen">
    <Navbar />
    <div className="pt-20">
      <FAQSection />
    </div>
    <Footer />
  </main>
);

export default FaqPage;
