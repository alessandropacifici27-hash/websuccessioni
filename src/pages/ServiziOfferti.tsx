import Navbar from "@/components/Navbar";
import PracticeAreas from "@/components/PracticeAreas";
import GuidesSection from "@/components/GuidesSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const ServiziOfferti = () => (
  <>
    <Helmet>
      <title>Servizi Offerti | WebSuccessioni</title>
      <meta
        name="description"
        content="Dichiarazione di successione, volture catastali e consulenza ereditaria. Tutti i servizi WebSuccessioni per gestire la tua pratica successoria online."
      />
    </Helmet>
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <PracticeAreas />
        <GuidesSection />
        <HowItWorks />
      </div>
      <Footer />
    </main>
  </>
);

export default ServiziOfferti;
