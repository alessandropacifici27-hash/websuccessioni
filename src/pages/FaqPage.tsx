import Navbar from "@/components/Navbar";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const FaqPage = () => (
  <>
    <Helmet>
      <title>FAQ — Domande Frequenti | WebSuccessioni</title>
      <meta
        name="description"
        content="Risposte alle domande più frequenti sulla dichiarazione di successione: costi, documenti necessari, scadenze e come funziona il servizio online."
      />
    </Helmet>
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <FAQSection />
      </div>
      <Footer />
    </main>
  </>
);

export default FaqPage;
