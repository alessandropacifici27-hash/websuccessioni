import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SuccessioneNonniNipoti = () => (
  <>
    <Helmet>
      <title>Successione tra Nonni e Nipoti: Rappresentazione e Quote | WebSuccessioni</title>
      <meta name="description" content="Rappresentazione ereditaria: quando i nipoti subentrano al posto del genitore premorto, quote e aliquote fiscali per nipoti in linea retta e collaterale." />
      <link rel="canonical" href="https://www.websuccessioni.it/guide/successione-nonni-nipoti" />
    </Helmet>
    <Navbar />
    <article className="pt-28 pb-24 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/guide" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Torna alle Guide
        </Link>

        <h1 className="text-4xl md:text-5xl font-display text-gradient-gold mb-6">
          Successione tra Nonni e Nipoti: Rappresentazione e Quote
        </h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          I nipoti (figli dei figli del defunto) entrano nell'eredità attraverso il meccanismo della rappresentazione ereditaria
          <span className="text-sm text-gray-400 italic ml-1">(art. 467 c.c.)</span>. Se un figlio del defunto è premorto (morto prima del defunto), rinuncia all'eredità o è indegno, i suoi figli (cioè i nipoti del defunto) subentrano al loro posto nella stessa quota che sarebbe spettata al genitore. La rappresentazione opera per stirpi: i nipoti si dividono tra loro la quota che sarebbe toccata al loro genitore, non la stessa quota dei fratelli di quest'ultimo.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Nipoti in linea retta: franchigia e aliquota</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          I nipoti in linea retta (figli dei figli) sono parenti in linea retta di secondo grado rispetto al nonno defunto. Pertanto beneficiano della stessa franchigia di €1.000.000 e della stessa aliquota del 4% prevista per i parenti in linea retta
          <span className="text-sm text-gray-400 italic ml-1">(art. 7, comma 1, D.Lgs. 346/1990)</span>.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Nipoti in linea collaterale</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Diversa è la situazione dei nipoti in linea collaterale (figli dei fratelli del defunto). Questi sono parenti di quarto grado e si applicano l'aliquota del 6% senza franchigia
          <span className="text-sm text-gray-400 italic ml-1">(art. 7, comma 1, D.Lgs. 346/1990)</span>. Anche per loro opera la rappresentazione: se il fratello del defunto è premorto, i suoi figli subentrano nella sua quota
          <span className="text-sm text-gray-400 italic ml-1">(art. 468 c.c.)</span>.
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

export default SuccessioneNonniNipoti;
