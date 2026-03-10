import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SuccessioneFratelliSorelle = () => (
  <>
    <Helmet>
      <title>Successione tra Fratelli e Sorelle: Quote e Imposte | WebSuccessioni</title>
      <meta name="description" content="Diritti successori di fratelli e sorelle: quote legittime, differenza tra germanici e unilaterali, aliquota 6% e franchigia 100.000 euro." />
      <link rel="canonical" href="https://www.websuccessioni.it/guide/successione-fratelli-sorelle" />
    </Helmet>
    <Navbar />
    <article className="pt-28 pb-24 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/guide" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Torna alle Guide
        </Link>

        <h1 className="text-4xl md:text-5xl font-display text-gradient-gold mb-6">
          Successione tra Fratelli e Sorelle: Quote e Imposte
        </h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          I fratelli e le sorelle rientrano tra i successori legittimi del defunto, ma sono collocati in una posizione successiva rispetto al coniuge e ai discendenti nella graduatoria degli eredi
          <span className="text-sm text-gray-400 italic ml-1">(art. 565 c.c.)</span>. Essi vengono chiamati all'eredità solo in assenza di coniuge, figli e genitori.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Fratelli germanici e unilaterali</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          In mancanza di testamento, i fratelli germanici (nati dagli stessi genitori) e i fratelli unilaterali (nati da uno solo dei genitori) hanno diritti diversi: i fratelli unilaterali ricevono la metà di quanto spetta ai fratelli germanici
          <span className="text-sm text-gray-400 italic ml-1">(art. 570, comma 2, c.c.)</span>. Se il defunto lascia solo fratelli, l'eredità si divide in parti uguali tra i fratelli germanici, mentre i fratelli unilaterali ricevono la metà di tale quota.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Imposta di successione</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Sul piano fiscale, i trasferimenti in favore di fratelli o sorelle sono soggetti all'imposta di successione con aliquota del 6%, da applicarsi sul valore eccedente la franchigia di €100.000 per ciascun beneficiario
          <span className="text-sm text-gray-400 italic ml-1">(art. 7, comma 1, D.Lgs. 346/1990)</span>. Il fratello che riceve un'eredità del valore di €150.000 pagherà quindi il 6% su €50.000, cioè €3.000.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Testamento e legittima</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Se il defunto ha lasciato testamento, la situazione cambia in modo significativo. Il testatore può disporre liberamente dei propri beni a favore di chiunque, inclusi i fratelli, purché rispetti le quote di riserva (legittima) destinate al coniuge e ai discendenti
          <span className="text-sm text-gray-400 italic ml-1">(artt. 536 e ss. c.c.)</span>. I fratelli non sono legittimari: non hanno diritto a una quota minima garantita per legge.
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

export default SuccessioneFratelliSorelle;
