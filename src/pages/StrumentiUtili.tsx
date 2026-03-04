import Navbar from "@/components/Navbar";
import DateCalculators from "@/components/DateCalculators";
import Footer from "@/components/Footer";

const StrumentiUtili = () => (
  <main className="min-h-screen">
    <Navbar />
    <div className="pt-20">
      <DateCalculators />
    </div>
    <Footer />
  </main>
);

export default StrumentiUtili;
