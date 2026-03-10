import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const QuoteLegittima = () => (
  <>
    <Helmet>
      <title>Quote di Legittima: Cosa Spetta agli Eredi per Legge | WebSuccessioni</title>
      <meta name="description" content="Legittimari, quote di riserva, coniuge e figli: come funziona la legittima e l'azione di riduzione dopo la riforma Legge 182/2025." />
      <link rel="canonical" href="https://www.websuccessioni.it/guide/quote-legittima" />
    </Helmet>
    <Navbar />
    <article className="pt-28 pb-24 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/guide" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Torna alle Guide
        </Link>

        <h1 className="text-4xl md:text-5xl font-display text-gradient-gold mb-6">
          Quote di Legittima: Cosa Spetta agli Eredi per Legge
        </h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          La legittima (o quota di riserva) è la porzione del patrimonio che il defunto non può sottrarre per testamento a determinati eredi, chiamati appunto legittimari. I legittimari sono il coniuge, i discendenti (figli, nipoti) e, in loro assenza, gli ascendenti (genitori) del defunto
          <span className="text-sm text-gray-400 italic ml-1">(art. 536 c.c.)</span>.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Quote per figli e coniuge</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Le quote di riserva variano in base alla composizione del nucleo familiare del defunto. Se il defunto lascia solo un figlio, questi ha diritto alla metà del patrimonio
          <span className="text-sm text-gray-400 italic ml-1">(art. 537, comma 1, c.c.)</span>. Con due o più figli, la riserva complessiva è di due terzi del patrimonio, divisa in parti uguali tra loro
          <span className="text-sm text-gray-400 italic ml-1">(art. 537, comma 2, c.c.)</span>. Al coniuge superstite spetta sempre almeno un quarto del patrimonio
          <span className="text-sm text-gray-400 italic ml-1">(art. 540, comma 1, c.c.)</span>, più il diritto di abitazione sulla casa coniugale e d'uso dei mobili che la corredano
          <span className="text-sm text-gray-400 italic ml-1">(art. 540, comma 2, c.c.)</span>. In presenza sia di coniuge che di figli, le quote si riducono proporzionalmente per far posto a entrambi.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Azione di riduzione</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Quando il testamento viola le quote di legittima, i legittimari lesi possono agire con l'azione di riduzione
          <span className="text-sm text-gray-400 italic ml-1">(art. 554 c.c.)</span> per far dichiarare inefficaci le disposizioni testamentarie eccedenti la quota disponibile.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Riforma Legge 182/2025</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          A seguito della Legge 182/2025 (art. 44), che ha modificato gli artt. 561, 562 e 563 c.c., la tutela dei legittimari è stata riformata in senso prevalentemente obbligatorio, riducendo i diritti di seguito sui terzi acquirenti a titolo oneroso e rafforzando la certezza dei traffici giuridici.
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

export default QuoteLegittima;
