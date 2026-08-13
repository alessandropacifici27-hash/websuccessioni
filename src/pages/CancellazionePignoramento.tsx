import { Helmet } from "react-helmet-async";
import { Check, FileText, Scale, Briefcase, Landmark, ClipboardList, Users } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CancellazionePignoramentoForm from "@/components/CancellazionePignoramentoForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
  window.scrollTo({ top, behavior: "smooth" });
};

const CancellazionePignoramento = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>Cancellazione Pignoramenti Immobiliari | WebSuccessioni</title>
        <meta
          name="description"
          content="Cancellazione della trascrizione di pignoramenti immobiliari dai Registri Immobiliari. Assistenza completa per privati e studi legali, competenza notarile specifica in materia di Conservatoria e pubblicità immobiliare."
        />
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6 justify-center">
              <span className="line-gold w-10 inline-block" />
              <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Formalità Pregiudizievoli</p>
              <span className="line-gold w-10 inline-block" />
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-5">
              Cancellazione dei Pignoramenti Immobiliari
            </h1>

            <p className="font-body text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-4">
              Ci occupiamo di ogni formalità necessaria per rimuovere la trascrizione di un pignoramento dai Registri
              Immobiliari, dalla verifica della documentazione al deposito della nota in Conservatoria.
            </p>
            <p className="font-body text-muted-foreground text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              Una competenza specifica, di matrice notarile, che affianca sia i privati che gli studi legali nella
              gestione pratica di una materia spesso poco conosciuta.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-10">
              <button
                className="rounded-full bg-transparent border border-yellow-500/50 text-yellow-500/90 font-medium tracking-wide text-base italic py-4 px-10 min-w-[240px] text-center inline-flex items-center justify-center hover:bg-yellow-900/10 hover:border-yellow-500/70 hover:text-yellow-400/95 transition-all duration-200"
                onClick={() => scrollToSection("form-pignoramento")}
              >
                Richiedi una valutazione
              </button>
              <button
                className="rounded-full bg-transparent border border-yellow-500/50 text-yellow-500/90 font-medium tracking-wide text-base italic py-4 px-10 min-w-[240px] text-center inline-flex items-center justify-center hover:bg-yellow-900/10 hover:border-yellow-500/70 hover:text-yellow-400/95 transition-all duration-200"
                onClick={() => scrollToSection("documenti-necessari")}
              >
                Quali documenti servono
              </button>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap gap-2 items-center justify-center mt-8">
              {[
                { emoji: "⚖️", testo: "Competenza notarile" },
                { emoji: "🔒", testo: "Massima riservatezza" },
                { emoji: "📩", testo: "Risposta entro 24h" },
                { emoji: "✅", testo: "Costi trasparenti" },
              ].map((item) => (
                <div
                  key={item.testo}
                  className="flex items-center gap-2 rounded-full sm:py-1 sm:px-3 sm:border sm:border-white/10 sm:bg-white/5"
                >
                  <span className="text-lg leading-none flex-shrink-0">{item.emoji}</span>
                  <span className="font-body text-xs text-gray-400 font-medium whitespace-nowrap">{item.testo}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="bg-card/50 border border-border/50 rounded-2xl p-8 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Perché serve un intervento specifico
            </h2>
            <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              Quando un pignoramento immobiliare si estingue — perché il debito è stato saldato, perché è stato
              raggiunto un accordo con il creditore, o perché la procedura esecutiva si è conclusa in altro modo —
              la sua cancellazione dai Registri Immobiliari <strong className="text-foreground">non è automatica</strong>.
              Il solo pagamento del debito, o l'atto di rinuncia del creditore, non fanno venir meno la trascrizione:
              serve sempre un provvedimento del giudice dell'esecuzione che ne ordini espressamente la cancellazione,
              da presentare poi in Conservatoria con un'apposita nota.
            </p>
            <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed">
              Finché questa formalità resta iscritta, l'immobile risulta gravato agli occhi di chiunque consulti i
              registri — una banca in fase di erogazione di un mutuo, un notaio prima di un rogito, un acquirente
              interessato. Ce ne occupiamo noi, dalla verifica dei documenti al deposito della nota di cancellazione.
            </p>
          </div>
        </section>

        <section id="form-pignoramento" className="container mx-auto px-4 max-w-3xl mb-16 scroll-mt-24">
          <div className="text-center mb-10">
            <Scale className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Richiedi una valutazione gratuita</h2>
            <p className="font-body text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
              Descrivici la tua situazione — privato o studio legale — e ti diciamo entro 24 ore come procedere.
            </p>
          </div>
          <CancellazionePignoramentoForm />
        </section>

        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">A chi ci rivolgiamo</h2>
            <p className="font-body text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Lo stesso servizio, con un accompagnamento pensato per esigenze diverse.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card/50 border border-border/50 rounded-2xl p-8">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">Per i privati</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                Hai saldato un debito, o la procedura esecutiva a carico del tuo immobile si è conclusa, e vuoi
                essere sicuro che non resti traccia del pignoramento nei registri — magari perché stai per vendere
                casa o chiedere un mutuo. Ti seguiamo dal reperimento del provvedimento del giudice fino alla
                cancellazione effettiva, senza che tu debba destreggiarti tra cancelleria e Conservatoria.
              </p>
            </div>

            <div className="bg-card/50 border border-border/50 rounded-2xl p-8">
              <Briefcase className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">Per studi legali e professionisti</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                La cancellazione delle formalità pregiudizievoli in Conservatoria è una materia di matrice
                prevalentemente notarile, con cui molti studi legali hanno poca dimestichezza operativa pur
                occupandosi della procedura esecutiva nel merito. Affianchiamo il vostro studio nella parte pratica —
                predisposizione della nota, verifica dei riferimenti di trascrizione, deposito — lasciandovi la
                gestione della pratica con il cliente.
              </p>
            </div>
          </div>
        </section>

        <section id="documenti-necessari" className="container mx-auto px-4 max-w-5xl mb-16 scroll-mt-24">
          <div className="text-center mb-10">
            <FileText className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Quali documenti servono</h2>
            <p className="font-body text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              La documentazione richiesta dalla Conservatoria è precisa: un errore o un documento incompleto porta
              al rigetto della nota.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex gap-4 bg-card/50 border border-border/50 rounded-2xl p-6">
              <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-base font-semibold text-foreground mb-1">
                  Ordinanza di cancellazione del pignoramento
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  Il provvedimento con cui il giudice dell'esecuzione ordina espressamente la cancellazione della
                  trascrizione. Deve indicare con precisione gli estremi della trascrizione del pignoramento (data,
                  numero generale e particolare) e va richiesto in{" "}
                  <strong className="text-foreground">copia conforme all'originale</strong> alla cancelleria delle
                  Esecuzioni Immobiliari del Tribunale che ha trattato la procedura — una copia semplice non è
                  sufficiente e la nota verrebbe respinta.
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-card/50 border border-border/50 rounded-2xl p-6">
              <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-base font-semibold text-foreground mb-1">
                  Attestazione di definitività del provvedimento
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  L'ordinanza deve essere definitiva, cioè non più impugnabile. Serve quindi anche il timbro o la
                  certificazione della cancelleria che attesti la mancata proposizione di reclamo nei termini di
                  legge (oppure, se un reclamo è stato presentato e respinto, la relativa sentenza passata in
                  giudicato). Questa attestazione va richiesta con apposita istanza alla stessa cancelleria che ha
                  emesso il provvedimento.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <div className="text-center mb-8">
            <Landmark className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Costi, in modo trasparente</h2>
          </div>

          <div className="bg-card/50 border border-border/50 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border/50">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-primary mb-4">Imposte fisse dovute allo Stato</p>
              <div className="space-y-2 font-body text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Imposta di bollo</span>
                  <span className="text-foreground">59,00 €</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Imposta ipotecaria</span>
                  <span className="text-foreground">200,00 €</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tassa ipotecaria</span>
                  <span className="text-foreground">35,00 €</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-border/30 mt-2">
                  <span className="text-foreground">Totale imposte (Mod. F24 ELIDE)</span>
                  <span className="text-primary">294,00 €</span>
                </div>
              </div>
            </div>
            <div className="p-6 border-b border-border/50">
              <div className="flex justify-between items-center gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-primary mb-1">Compenso professionale</p>
                  <p className="font-body text-xs text-muted-foreground">Predisposizione della nota, verifica documenti, deposito</p>
                </div>
                <span className="font-display text-xl font-semibold text-foreground whitespace-nowrap shrink-0">150,00 €</span>
              </div>
            </div>
            <div className="p-6 bg-primary/5">
              <div className="flex justify-between items-center gap-4">
                <span className="font-display text-lg font-semibold text-foreground">Totale complessivo</span>
                <span className="font-display text-2xl font-bold text-primary whitespace-nowrap shrink-0">444,00 €</span>
              </div>
            </div>
          </div>
          <p className="font-body text-xs text-muted-foreground/70 text-center mt-4 max-w-2xl mx-auto leading-relaxed">
            Le imposte sono dovute per legge indipendentemente da chi cura la pratica; il nostro compenso riguarda
            esclusivamente il lavoro di verifica e gestione della formalità. Importi verificati su fonti ufficiali,
            possono essere soggetti ad aggiornamento normativo.
          </p>
        </section>

        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="text-center mb-10">
            <ClipboardList className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Come funziona</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "📨",
                t: "Ci invii la tua situazione",
                d: "Compili il form con i dati del pignoramento e, se già in tuo possesso, il provvedimento del giudice.",
              },
              {
                emoji: "🔍",
                t: "Verifichiamo la documentazione",
                d: "Controlliamo che l'ordinanza sia completa e definitiva, o ti indichiamo esattamente cosa richiedere in cancelleria.",
              },
              {
                emoji: "🏛️",
                t: "Depositiamo la nota",
                d: "Predisponiamo e presentiamo la nota di cancellazione in Conservatoria, seguendo la pratica fino alla formalità cancellata.",
              },
            ].map((s) => (
              <div key={s.t} className="bg-card/50 border border-border/50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="text-3xl leading-none">{s.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground mb-2">{s.t}</h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">{s.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Domande frequenti</h2>
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="q1" className="bg-card/50 border border-border/50 rounded-xl px-5">
              <AccordionTrigger className="font-body text-sm font-medium text-left">
                Ho già pagato il debito, perché il pignoramento risulta ancora?
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">
                Perché il pagamento da solo non cancella la trascrizione: serve comunque un provvedimento del
                giudice dell'esecuzione che ne ordini la cancellazione, da presentare poi in Conservatoria.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="bg-card/50 border border-border/50 rounded-xl px-5">
              <AccordionTrigger className="font-body text-sm font-medium text-left">
                Non ho ancora l'ordinanza del giudice, potete aiutarmi comunque?
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">
                Sì, ti indichiamo esattamente a quale cancelleria rivolgerti e cosa richiedere, incluso il
                certificato di mancato reclamo, prima di procedere con la cancellazione vera e propria.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="bg-card/50 border border-border/50 rounded-xl px-5">
              <AccordionTrigger className="font-body text-sm font-medium text-left">
                Lavorate anche con studi legali su incarico dei loro clienti?
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">
                Sì, è uno dei casi d'uso più frequenti di questo servizio: ci occupiamo della parte pratica presso
                la Conservatoria mentre lo studio segue la pratica nel merito con il proprio cliente.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CancellazionePignoramento;
