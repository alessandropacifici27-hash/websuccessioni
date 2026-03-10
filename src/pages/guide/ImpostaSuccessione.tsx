import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ImpostaSuccessione = () => (
  <>
    <Helmet>
      <title>Imposta di Successione: Aliquote, Franchigie e Calcolo | WebSuccessioni</title>
      <meta name="description" content="Guida all'imposta di successione: aliquote per grado di parentela, franchigie, esenzioni e obblighi dal 2025 con D.Lgs. 139/2024." />
      <link rel="canonical" href="https://www.websuccessioni.it/guide/imposta-successione" />
    </Helmet>
    <Navbar />
    <article className="pt-28 pb-24 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/guide" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Torna alle Guide
        </Link>

        <h1 className="text-4xl md:text-5xl font-display text-gradient-gold mb-6">
          Imposta di Successione: Aliquote, Franchigie e Calcolo
        </h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          L'imposta di successione è disciplinata dal D.Lgs. 346/1990 (Testo Unico delle disposizioni concernenti l'imposta sulle successioni e donazioni). Si applica al trasferimento di beni e diritti per causa di morte. Le aliquote e le franchigie sono stabilite dall'art. 7, comma 1, D.Lgs. 346/1990 e variano in base al grado di parentela tra defunto ed erede.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Coniuge e parenti in linea retta</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Per coniuge e parenti in linea retta (figli, genitori) si applica un'aliquota del 4% sul valore che eccede €1.000.000 per ciascun beneficiario
          <span className="text-sm text-gray-400 italic ml-1">(art. 7, comma 1, D.Lgs. 346/1990)</span>. Fratelli e sorelle sono soggetti all'aliquota del 6% sul valore che eccede €100.000 per ciascun beneficiario. Altri parenti fino al 4° grado e affini in linea collaterale fino al 3° grado hanno aliquota del 6% senza franchigia. Tutti gli altri soggetti sono tassati con aliquota dell'8% senza franchigia.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Persone con disabilità grave</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Le persone con disabilità grave ai sensi dell'art. 3, comma 3, Legge 104/1992 beneficiano di una franchigia di €1.500.000
          <span className="text-sm text-gray-400 italic ml-1">(art. 7, comma 2, D.Lgs. 346/1990)</span>.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Autoliquidazione e pagamento dal 2025</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Dal 1° gennaio 2025, con l'entrata in vigore del D.Lgs. 139/2024, l'imposta di successione è autoliquidata direttamente dal contribuente nella dichiarazione di successione. Il pagamento deve avvenire entro 90 giorni dalla scadenza del termine di presentazione della dichiarazione.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Esenzione per patrimoni modesti</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Non è dovuta l'imposta quando l'eredità è devoluta al coniuge o a parenti in linea retta, il patrimonio non supera €100.000 e non comprende beni immobili
          <span className="text-sm text-gray-400 italic ml-1">(D.Lgs. 175/2014, che ha elevato la soglia da €25.000 a €100.000)</span>.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Esenzioni per aziende e polizze</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Sono esenti dall'imposta i trasferimenti di aziende, rami d'azienda, quote sociali e azioni a favore del coniuge o degli eredi in linea retta, a condizione che il controllo sia mantenuto per almeno 5 anni
          <span className="text-sm text-gray-400 italic ml-1">(art. 3, comma 4-ter, D.Lgs. 346/1990)</span>. Sono altresì esenti le polizze vita e le assicurazioni previdenziali
          <span className="text-sm text-gray-400 italic ml-1">(art. 12, D.Lgs. 346/1990)</span>.
        </p>

        <div className="mt-12 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/25 rounded-xl p-8 md:p-10 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Hai bisogno di assistenza?</h3>
          <p className="font-body text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto">
            WebSuccessioni gestisce la tua pratica di successione completamente online. Affidati a noi.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="gold" size="lg" asChild>
              <Link to="/inizia-pratica-online">Inizia la tua Pratica</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/#contatti">Contattaci</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
    <Footer />
  </>
);

export default ImpostaSuccessione;
