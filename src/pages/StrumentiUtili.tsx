import Navbar from "@/components/Navbar";
import DateCalculators from "@/components/DateCalculators";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const StrumentiUtili = () => (
  <>
    <Helmet>
      <title>Calcola le tue Scadenze di Successione | WebSuccessioni</title>
      <meta
        name="description"
        content="Calcola gratuitamente le scadenze per la dichiarazione di successione, le imposte dovute e i gradi di parentela. Strumenti online gratuiti per gestire la tua successione."
      />
    </Helmet>
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 w-full overflow-hidden">
        <DateCalculators />
      </div>
      <Footer />
    </main>
  </>
);

export default StrumentiUtili;
