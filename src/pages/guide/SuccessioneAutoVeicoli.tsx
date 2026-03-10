import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SuccessioneAutoVeicoli = () => (
  <>
    <Helmet>
      <title>Successione di Auto e Veicoli: Procedura e Documenti | WebSuccessioni</title>
      <meta name="description" content="Voltura al PRA dopo il decesso: documenti, valore da dichiarare, imposte e tempi per intestare i veicoli agli eredi." />
      <link rel="canonical" href="https://www.websuccessioni.it/guide/successione-auto-veicoli" />
    </Helmet>
    <Navbar />
    <article className="pt-28 pb-24 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/guide" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Torna alle Guide
        </Link>

        <h1 className="text-4xl md:text-5xl font-display text-gradient-gold mb-6">
          Successione di Auto e Veicoli: Procedura e Documenti
        </h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          I veicoli intestati al defunto entrano nell'asse ereditario e devono essere intestati agli eredi. A differenza degli immobili, per i veicoli non è necessario attendere la completa definizione della successione: gli eredi possono procedere alla voltura del veicolo al PRA (Pubblico Registro Automobilistico) già subito dopo il decesso.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Documenti per la voltura al PRA</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Per effettuare la voltura, l'erede deve presentare allo sportello ACI-PRA: certificato di morte in originale, atto notorio o dichiarazione sostitutiva con l'indicazione degli eredi e delle relative quote, documento d'identità e codice fiscale dell'erede, carta di circolazione e certificato di proprietà del veicolo. Se vi sono più eredi, tutti devono essere d'accordo sull'intestazione o procedere alla divisione.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Dichiarazione di successione e valore</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          I veicoli entrano nell'asse ereditario e devono essere indicati nella dichiarazione di successione presentata all'Agenzia delle Entrate entro 12 mesi dal decesso
          <span className="text-sm text-gray-400 italic ml-1">(art. 31, D.Lgs. 346/1990)</span>. Il valore da dichiarare per le autovetture è il valore di mercato al momento del decesso. Fino all'espletamento della pratica di successione e della voltura, il veicolo non può essere venduto.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Spese e imposte</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Dal punto di vista delle spese, la voltura al PRA comporta il pagamento dell'imposta di trascrizione, dell'imposta di bollo e dell'imposta provinciale di trascrizione. Non è invece dovuta l'imposta di successione se il valore complessivo dell'eredità (incluso il veicolo) non supera €100.000, in assenza di immobili, e l'eredità va al coniuge o a parenti in linea retta.
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

export default SuccessioneAutoVeicoli;
