import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TerminiServizio = () => (
  <main className="min-h-screen">
    <Navbar />
    <div className="pt-20">
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Termini e <span className="text-gradient-gold italic">Condizioni</span>
            </h1>
            <p className="font-body text-muted-foreground text-sm mt-4">Ultimo aggiornamento: Marzo 2026</p>
          </div>

          <div className="font-body text-muted-foreground text-sm leading-relaxed space-y-8">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">1. Premessa</h2>
              <p>I presenti Termini e Condizioni regolano l'utilizzo del sito web websuccessioni.it e dei servizi offerti da WebSuccessioni. L'utilizzo del sito e dei servizi implica l'accettazione integrale dei presenti termini. Si invita l'utente a leggere attentamente il contenuto di questa pagina prima di procedere.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">2. Descrizione dei Servizi</h2>
              <p>WebSuccessioni offre servizi professionali di:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Compilazione e presentazione telematica di dichiarazioni di successione.</li>
                <li>Volture catastali degli immobili ereditati.</li>
                <li>Consulenza ereditaria su quote, testamenti, donazioni e pianificazione successoria.</li>
              </ul>
              <p className="mt-3">I servizi vengono erogati da un team di professionisti, tecnici del catasto ed avvocati.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">3. Modalità di Erogazione</h2>
              <p>L'utente può richiedere un preventivo gratuito tramite i canali di contatto indicati sul sito (telefono, email, WhatsApp, Telegram). L'avvio del servizio avverrà solo previa accettazione del preventivo e conferma formale dell'incarico da parte dell'utente.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">4. Obblighi dell'Utente</h2>
              <p>L'utente si impegna a:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Fornire dati e documenti veritieri, completi e aggiornati.</li>
                <li>Comunicare tempestivamente eventuali variazioni o integrazioni documentali.</li>
                <li>Corrispondere il compenso pattuito nei termini concordati.</li>
                <li>Collaborare attivamente per il buon esito della pratica.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">5. Compensi e Pagamenti</h2>
              <p>I compensi per i servizi sono indicati nel preventivo personalizzato. Il pagamento avviene secondo le modalità concordate (bonifico bancario, PayPal o altri strumenti). WebSuccessioni si riserva il diritto di sospendere l'erogazione del servizio in caso di mancato pagamento.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">6. Responsabilità</h2>
              <p>WebSuccessioni si impegna ad eseguire le prestazioni con la diligenza professionale richiesta. Non risponde per danni derivanti da informazioni o documenti errati, incompleti o tardivamente forniti dall'utente, né per ritardi imputabili a terzi (es. Agenzia delle Entrate, uffici catastali).</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">7. Diritto di Recesso</h2>
              <p>Ai sensi del D.Lgs. 206/2005 (Codice del Consumo), l'utente consumatore ha diritto di recedere dal contratto entro 14 giorni dalla data di conferma dell'incarico, senza alcuna penalità e senza specificarne il motivo. Il recesso può essere comunicato via email a <a href="mailto:info@websuccessioni.it" className="text-primary hover:underline">info@websuccessioni.it</a>.</p>
              <p className="mt-3">Il diritto di recesso è escluso qualora l'esecuzione del servizio sia già stata completata con il consenso espresso dell'utente.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">8. Proprietà Intellettuale</h2>
              <p>Tutti i contenuti del sito (testi, grafica, logo, immagini, layout) sono di proprietà di WebSuccessioni o dei rispettivi titolari dei diritti e sono protetti dalla normativa vigente in materia di proprietà intellettuale. È vietata la riproduzione, anche parziale, senza autorizzazione scritta.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">9. Legge Applicabile e Foro Competente</h2>
              <p>I presenti Termini e Condizioni sono regolati dalla legge italiana. Per qualsiasi controversia derivante dall'interpretazione o dall'esecuzione dei presenti termini, sarà competente il Foro del luogo di residenza o domicilio del consumatore, ai sensi dell'art. 66-bis del Codice del Consumo.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">10. Risoluzione Alternativa delle Controversie (ADR/ODR)</h2>
              <p>Ai sensi dell'art. 14 del Regolamento UE 524/2013, si informa l'utente che, in caso di controversia, è possibile ricorrere alla piattaforma ODR (Online Dispute Resolution) messa a disposizione dalla Commissione Europea, accessibile al seguente indirizzo: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://ec.europa.eu/consumers/odr</a>.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">11. Contatti</h2>
              <p>Per qualsiasi domanda relativa ai presenti Termini e Condizioni, è possibile contattarci all'indirizzo email: <a href="mailto:info@websuccessioni.it" className="text-primary hover:underline">info@websuccessioni.it</a>, oppure telefonicamente al numero +39 347 747 1921.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </main>
);

export default TerminiServizio;
