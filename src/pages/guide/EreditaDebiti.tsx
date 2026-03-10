import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EreditaDebiti = () => (
  <>
    <Helmet>
      <title>Eredità con Debiti: Cosa Rischia l'Erede | WebSuccessioni</title>
      <meta name="description" content="Responsabilità per i debiti del defunto: accettazione con beneficio di inventario, rinuncia e tutela del patrimonio personale." />
      <link rel="canonical" href="https://www.websuccessioni.it/guide/eredita-debiti" />
    </Helmet>
    <Navbar />
    <article className="pt-28 pb-24 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/guide" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Torna alle Guide
        </Link>

        <h1 className="text-4xl md:text-5xl font-display text-gradient-gold mb-6">
          Eredità con Debiti: Cosa Rischia l'Erede
        </h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          Quando si accetta un'eredità, si acquisiscono non solo i beni ma anche i debiti del defunto. Gli eredi rispondono dei debiti in proporzione alle rispettive quote ereditarie
          <span className="text-sm text-gray-400 italic ml-1">(art. 752 c.c.)</span>. Questo significa che accettare un'eredità senza conoscere l'entità dei debiti può essere pericoloso.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Accettazione con beneficio di inventario</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Lo strumento di tutela più importante è l'accettazione con beneficio di inventario
          <span className="text-sm text-gray-400 italic ml-1">(art. 490 c.c.)</span>: grazie ad essa, l'erede risponde dei debiti del defunto solo nei limiti del valore dei beni ereditati, senza rischiare il proprio patrimonio personale. Per esercitare questo diritto, è necessario fare l'inventario dei beni entro 3 mesi dall'apertura della successione
          <span className="text-sm text-gray-400 italic ml-1">(art. 485 c.c.)</span> e accettare l'eredità entro i successivi 40 giorni dalla scadenza del termine per l'inventario
          <span className="text-sm text-gray-400 italic ml-1">(art. 487 c.c.)</span>.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Rinuncia all'eredità</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          In alternativa, l'erede può rinunciare all'eredità entro 10 anni dall'apertura della successione
          <span className="text-sm text-gray-400 italic ml-1">(art. 480 c.c.)</span>, con atto ricevuto da notaio o dal cancelliere del Tribunale
          <span className="text-sm text-gray-400 italic ml-1">(art. 519 c.c.)</span>. Chi rinuncia è considerato come se non fosse mai stato erede: non acquisisce alcun bene ma non risponde di nessun debito
          <span className="text-sm text-gray-400 italic ml-1">(art. 521 c.c.)</span>.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Minori e incapaci</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          I minori e gli incapaci accettano sempre l'eredità con beneficio di inventario
          <span className="text-sm text-gray-400 italic ml-1">(art. 471 c.c.)</span> per tutela della legge.
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

export default EreditaDebiti;
