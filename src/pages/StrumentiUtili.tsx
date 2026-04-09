import Navbar from "@/components/Navbar";
import DateCalculators from "@/components/DateCalculators";
import SuccessionTaxCalculator from "@/components/SuccessionTaxCalculator";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const StrumentiUtili = () => (
  <>
    <Helmet>
      <title>Calcola Scadenze e Imposte di Successione | WebSuccessioni</title>
      <meta
        name="description"
        content="Calcola gratis le scadenze della dichiarazione di successione e le imposte dovute (successione, ipotecaria, catastale) in pochi secondi."
      />
      <link rel="canonical" href="https://websuccessioni.it/calcola-scadenze-e-imposte" />
    </Helmet>
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 w-full overflow-hidden">
        <section className="container mx-auto px-4 max-w-5xl pt-8 pb-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4 justify-center">
              <span className="line-gold w-8 inline-block" />
              <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Strumenti Utili</p>
              <span className="line-gold w-8 inline-block" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Calcola scadenze e imposte di successione
            </h1>
          </div>
        </section>
        <DateCalculators suppressIntroHeading insertAfterDeadlines={<SuccessionTaxCalculator />} />
      </div>
      <Footer />
    </main>
  </>
);

export default StrumentiUtili;
