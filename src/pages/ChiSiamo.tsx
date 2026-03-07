import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const ChiSiamo = () => (
  <>
    <Helmet>
      <title>Chi Siamo | WebSuccessioni</title>
      <meta
        name="description"
        content="Il team di WebSuccessioni: avvocati, tecnici del catasto e professionisti del diritto successorio al tuo servizio. Qualità e riservatezza garantite."
      />
    </Helmet>
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <AboutSection />
      </div>
      <Footer />
    </main>
  </>
);

export default ChiSiamo;
