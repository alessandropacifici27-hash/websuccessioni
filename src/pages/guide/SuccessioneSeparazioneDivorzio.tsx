import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SuccessioneSeparazioneDivorzio = () => (
  <>
    <Helmet>
      <title>Successione in caso di Separazione o Divorzio | WebSuccessioni</title>
      <meta name="description" content="Diritti successori del coniuge separato con e senza addebito, ex coniuge divorziato, convivente di fatto e unioni civili." />
      <link rel="canonical" href="https://www.websuccessioni.it/guide/successione-separazione-divorzio" />
    </Helmet>
    <Navbar />
    <article className="pt-28 pb-24 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/guide" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Torna alle Guide
        </Link>

        <h1 className="text-4xl md:text-5xl font-display text-gradient-gold mb-6">
          Successione in caso di Separazione o Divorzio
        </h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          La separazione legale e il divorzio producono effetti molto diversi sul piano successorio. Il coniuge separato senza addebito conserva i diritti successori: ha diritto alla quota di legittima
          <span className="text-sm text-gray-400 italic ml-1">(art. 548 c.c.)</span> e, in mancanza di figli, alla stessa quota spettante al coniuge non separato. Al contrario, il coniuge separato con addebito perde tutti i diritti successori, salvo il diritto all'assegno vitalizio se godeva degli alimenti al momento del decesso
          <span className="text-sm text-gray-400 italic ml-1">(art. 548, comma 2, c.c.)</span>.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Divorzio e ex coniuge</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Il divorzio comporta invece la perdita totale dei diritti successori: l'ex coniuge divorziato non è più un erede e non ha diritto ad alcuna quota di legittima
          <span className="text-sm text-gray-400 italic ml-1">(art. 9-bis, Legge 898/1970)</span>. Potrà però ricevere un assegno a carico dell'eredità qualora godesse dell'assegno divorzile e non fosse passato a nuove nozze
          <span className="text-sm text-gray-400 italic ml-1">(art. 9-bis, Legge 898/1970)</span>.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Unioni civili e convivenza</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Anche l'unione civile produce gli stessi effetti successori del matrimonio: lo scioglimento dell'unione equivale al divorzio ai fini ereditari
          <span className="text-sm text-gray-400 italic ml-1">(D.Lgs. 5/2017)</span>. Il convivente di fatto non ha diritti successori legali: non rientra tra gli eredi legittimi e non è legittimario. Può ricevere beni solo se espressamente indicato nel testamento, nei limiti della quota disponibile
          <span className="text-sm text-gray-400 italic ml-1">(artt. 565-586 c.c.)</span>. Ha tuttavia diritto a continuare ad abitare nella casa di comune residenza per un periodo determinato
          <span className="text-sm text-gray-400 italic ml-1">(art. 1, comma 42, Legge 76/2016)</span>.
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

export default SuccessioneSeparazioneDivorzio;
