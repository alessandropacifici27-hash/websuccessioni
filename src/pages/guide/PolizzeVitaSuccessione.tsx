import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PolizzeVitaSuccessione = () => (
  <>
    <Helmet>
      <title>Polizze Vita e Successione: Cosa Sapere | WebSuccessioni</title>
      <meta name="description" content="Polizze vita: esenzione dall'imposta di successione, rapporto con la legittima e obblighi dichiarativi per il beneficiario." />
      <link rel="canonical" href="https://www.websuccessioni.it/guide/polizze-vita-successione" />
    </Helmet>
    <Navbar />
    <article className="pt-28 pb-24 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/guide" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Torna alle Guide
        </Link>

        <h1 className="text-4xl md:text-5xl font-display text-gradient-gold mb-6">
          Polizze Vita e Successione: Cosa Sapere
        </h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          Le polizze vita hanno un regime successorio del tutto speciale: il capitale liquidato dalla compagnia assicurativa al beneficiario non entra nell'asse ereditario e non è soggetto all'imposta di successione
          <span className="text-sm text-gray-400 italic ml-1">(art. 12, D.Lgs. 346/1990)</span>. Questo le rende uno strumento molto efficace per trasferire ricchezza in modo fiscalmente vantaggioso.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Il beneficiario e la liquidazione</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Il beneficiario della polizza vita riceve direttamente dalla compagnia assicurativa il capitale assicurato, indipendentemente da chi siano gli eredi e da come venga diviso il resto del patrimonio. Non deve nemmeno attendere i tempi della dichiarazione di successione.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Polizze vita e legittima</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Tuttavia, le somme percepite dai beneficiari di polizze vita non entrano nell'asse ereditario solo ai fini fiscali: devono comunque essere considerate ai fini del calcolo delle quote di legittima. Se le somme pagate dalla compagnia di assicurazione superano la quota disponibile del patrimonio, i legittimari possono agire per la riduzione
          <span className="text-sm text-gray-400 italic ml-1">(art. 554 c.c. e Cass. SS.UU. n. 11421/2021, che ha chiarito il trattamento delle polizze vita nei confronti dei legittimari)</span>.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Imposta sul reddito e dichiarazioni</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Le polizze vita sono esenti anche dall'imposta sul reddito per la componente caso morte. Devono invece essere dichiarate al fisco se il beneficiario è una persona giuridica o se si tratta di polizze a carattere finanziario con rendimento garantito.
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

export default PolizzeVitaSuccessione;
