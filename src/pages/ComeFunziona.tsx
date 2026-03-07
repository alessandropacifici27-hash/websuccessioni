import Navbar from "@/components/Navbar";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const ComeFunziona = () => (
  <>
    <Helmet>
      <title>Come Funziona | WebSuccessioni</title>
      <meta
        name="description"
        content="Scopri come funziona il nostro servizio: contattaci, raccogli i documenti, pensiamo a tutto noi. Dichiarazione di successione completata in una settimana."
      />
    </Helmet>
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ProcessSection />
      </div>
      <Footer />
    </main>
  </>
);

export default ComeFunziona;
