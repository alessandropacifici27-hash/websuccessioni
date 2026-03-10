import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SuccessioneContoCorrente = () => (
  <>
    <Helmet>
      <title>Successione del Conto Corrente Bancario: Guida Completa | WebSuccessioni</title>
      <meta name="description" content="Come sbloccare e liquidare il conto corrente dopo il decesso: documenti, atto notorio, blocco cautelativo e dichiarazione di successione." />
      <link rel="canonical" href="https://www.websuccessioni.it/guide/successione-conto-corrente" />
    </Helmet>
    <Navbar />
    <article className="pt-28 pb-24 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/guide" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Torna alle Guide
        </Link>

        <h1 className="text-4xl md:text-5xl font-display text-gradient-gold mb-6">
          Successione del Conto Corrente Bancario: Guida Completa
        </h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          Alla morte del titolare, il conto corrente bancario entra a pieno titolo nell'asse ereditario ed è soggetto alle regole della successione
          <span className="text-sm text-gray-400 italic ml-1">(artt. 456 e ss. c.c.)</span>. Il deposito bancario è disciplinato dall'art. 1834 c.c., che ne definisce la natura giuridica: la banca acquista la proprietà delle somme depositate e si obbliga a restituirne l'equivalente.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Blocco cautelativo e deleghe</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Alla comunicazione del decesso, la banca procede al blocco cautelativo del conto
          <span className="text-sm text-gray-400 italic ml-1">(art. 48, D.Lgs. 346/1990)</span>. Ogni delega a terzi cessa automaticamente di avere validità con la morte del delegante: qualsiasi operazione successiva effettuata da un delegato configura il reato di appropriazione indebita
          <span className="text-sm text-gray-400 italic ml-1">(art. 646 c.p.)</span>.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Documenti per sblocco e liquidazione</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Per ottenere lo sblocco e la liquidazione degli importi, gli eredi devono presentare alla banca: certificato di morte, dichiarazione sostitutiva dell'atto notorio o atto notorio con indicazione degli eredi, copia del testamento se presente, dichiarazione di successione registrata e documenti d'identità. Per somme superiori a €100.000 è generalmente richiesto l'atto notorio anziché la semplice dichiarazione sostitutiva.
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Conto cointestato</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Nel caso di conto cointestato, entra nell'asse ereditario solo la quota del defunto. Anche in caso di firma disgiunta, la banca procede al blocco dell'intera operatività del conto (Cass. civ., Sez. I, n. 15231/2002).
        </p>

        <h2 className="text-2xl font-display text-yellow-400 mt-10 mb-4">Scadenze e tempi</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          La dichiarazione di successione deve essere presentata entro 12 mesi dalla morte
          <span className="text-sm text-gray-400 italic ml-1">(art. 31, D.Lgs. 346/1990)</span>. Le banche si riservano normalmente alcuni mesi per procedere alla liquidazione dopo aver ricevuto tutta la documentazione completa.
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

export default SuccessioneContoCorrente;
