import Navbar from "@/components/Navbar";
import DateCalculators from "@/components/DateCalculators";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const StrumentiUtili = () => (
  <>
    <Helmet>
      <title>Strumenti Utili | WebSuccessioni</title>
      <meta
        name="description"
        content="Calcola scadenze e imposte di successione gratuitamente. Strumenti online per calcolare la dichiarazione di successione, le imposte e i gradi di parentela."
      />
    </Helmet>
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <DateCalculators />
      </div>
      <Footer />
    </main>
  </>
);

export default StrumentiUtili;
