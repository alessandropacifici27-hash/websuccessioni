import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RinunciaEreditaGuida = () => (
  <>
    <Helmet>
      <title>Rinuncia all'Eredità: Termini, Procedura e Conseguenze Fiscali | WebSuccessioni</title>
      <meta name="description" content="Come rinunciare all'eredità: forma notarile o cancelliere, termine 10 anni, revoca, accrescimento della quota e obblighi fiscali." />
      <link rel="canonical" href="https://www.websuccessioni.it/guide/rinuncia-eredita-guida" />
    </Helmet>
    <Navbar />
    <article className="pt-28 pb-24 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/guide" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Torna alle Guide
        </Link>

        <h1 className="text-4xl md:text-5xl font-display text-gradient-gold mb-6">
          Rinuncia all'Eredità: Termini, Procedura e Conseguenze Fiscali
        </h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          La rinuncia all'eredità è l'atto con cui il chiamato all'eredità dichiara formalmente di non voler accettare l'eredità
          <span className="text-sm text-gray-400 italic ml-1">(art. 519 c.c.)</span>. Chi rinuncia è considerato come se non fosse mai stato chiamato all'eredità: non acquisisce alcun bene e, soprattutto, non risponde dei debiti del defunto
          <span className="text-sm text-gray-400 italic ml-1">(art. 521 c.c.)</span>. Questo la rende uno strumento fondamentale quando i debiti superano i beni ereditati.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Forma e sede</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          La rinuncia deve essere fatta con dichiarazione ricevuta da un notaio o dal cancelliere del Tribunale del circondario in cui si è aperta la successione
          <span className="text-sm text-gray-400 italic ml-1">(art. 519 c.c.)</span>. Non può essere fatta a condizioni o a termine: deve essere pura e semplice.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Termini</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Il termine per rinunciare è di 10 anni dall'apertura della successione
          <span className="text-sm text-gray-400 italic ml-1">(art. 480 c.c.)</span>, ma se l'erede è nel possesso dei beni ereditari deve fare l'inventario entro 3 mesi e poi decidere entro 40 giorni se rinunciare o accettare
          <span className="text-sm text-gray-400 italic ml-1">(art. 485 c.c.)</span>.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Revoca e accrescimento</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          La rinuncia può essere revocata solo se l'eredità non è stata ancora accettata da altri eredi e prima che sia trascorso il termine per accettare
          <span className="text-sm text-gray-400 italic ml-1">(art. 525 c.c.)</span>. Dopo la rinuncia, la quota del rinunciante si accresce agli altri eredi chiamati; in mancanza, si devolve agli eredi successivi in ordine
          <span className="text-sm text-gray-400 italic ml-1">(art. 522 c.c.)</span>.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Profilo fiscale</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Sul piano fiscale, chi rinuncia all'eredità non è tenuto a presentare la dichiarazione di successione né a pagare l'imposta di successione. Tuttavia, la rinuncia stessa deve essere registrata e comporta il pagamento dell'imposta di registro in misura fissa.
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

export default RinunciaEreditaGuida;
