import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <main className="min-h-screen">
    <Navbar />
    <div className="pt-20">
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Privacy <span className="text-gradient-gold italic">Policy</span>
            </h1>
            <p className="font-body text-muted-foreground text-sm mt-4">Ultimo aggiornamento: Marzo 2026</p>
          </div>

          <div className="font-body text-muted-foreground text-sm leading-relaxed space-y-8">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">1. Titolare del Trattamento</h2>
              <p>Il Titolare del trattamento dei dati personali è WebSuccessioni, con sede operativa in Italia. Per qualsiasi informazione relativa al trattamento dei dati personali è possibile contattarci all'indirizzo email: <a href="mailto:info@websuccessioni.it" className="text-primary hover:underline">info@websuccessioni.it</a>.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">2. Tipologie di Dati Raccolti</h2>
              <p>Tra i dati personali raccolti, in modo autonomo o tramite terze parti, ci sono: nome, cognome, indirizzo email, numero di telefono, dati di navigazione (cookie tecnici e analitici), dati fiscali e patrimoniali forniti volontariamente dall'utente per l'espletamento del servizio richiesto.</p>
              <p className="mt-3">I dati personali possono essere liberamente forniti dall'utente o, nel caso dei dati di navigazione, raccolti automaticamente durante l'uso del sito.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">3. Finalità del Trattamento</h2>
              <p>I dati personali dell'utente sono trattati per le seguenti finalità:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Erogazione del servizio richiesto (dichiarazioni di successione, volture catastali, consulenza ereditaria).</li>
                <li>Risposta a richieste di contatto e preventivo.</li>
                <li>Adempimento di obblighi di legge, regolamenti e normativa comunitaria.</li>
                <li>Analisi statistiche anonime sull'utilizzo del sito (previo consenso).</li>
                <li>Invio di comunicazioni informative relative ai nostri servizi (solo previo consenso esplicito).</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">4. Base Giuridica del Trattamento</h2>
              <p>Il trattamento dei dati personali si fonda sulle seguenti basi giuridiche ai sensi dell'art. 6 del Regolamento UE 2016/679 (GDPR):</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Esecuzione di un contratto</strong>: il trattamento è necessario per l'esecuzione del servizio richiesto dall'utente.</li>
                <li><strong>Consenso</strong>: per l'invio di comunicazioni promozionali e l'utilizzo di cookie analitici e di profilazione.</li>
                <li><strong>Obbligo legale</strong>: per adempiere a obblighi previsti dalla legge.</li>
                <li><strong>Legittimo interesse</strong>: per garantire la sicurezza del sito e migliorare i nostri servizi.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">5. Modalità di Trattamento</h2>
              <p>I dati personali sono trattati con strumenti informatici e/o telematici, con logiche strettamente connesse alle finalità sopra indicate e, comunque, in modo da garantire la sicurezza e la riservatezza dei dati stessi, nel rispetto delle misure organizzative, fisiche e logiche previste dalle disposizioni vigenti.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">6. Conservazione dei Dati</h2>
              <p>I dati personali sono conservati per il tempo strettamente necessario al raggiungimento delle finalità per cui sono stati raccolti, e comunque non oltre i termini previsti dalla normativa vigente. In particolare:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Dati relativi alla pratica di successione: conservati per 10 anni dalla conclusione del servizio.</li>
                <li>Dati di contatto per finalità promozionali: fino a revoca del consenso.</li>
                <li>Dati di navigazione: massimo 26 mesi.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">7. Comunicazione e Diffusione dei Dati</h2>
              <p>I dati personali non saranno oggetto di diffusione. Potranno essere comunicati a soggetti terzi necessari per l'espletamento del servizio (es. Agenzia delle Entrate, Catasto) e a fornitori di servizi tecnici (hosting, manutenzione) che operano in qualità di responsabili del trattamento.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">8. Diritti dell'Interessato</h2>
              <p>Ai sensi degli artt. 15-22 del GDPR, l'utente ha il diritto di:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Accedere ai propri dati personali.</li>
                <li>Ottenere la rettifica o la cancellazione degli stessi.</li>
                <li>Ottenere la limitazione del trattamento.</li>
                <li>Opporsi al trattamento.</li>
                <li>Richiedere la portabilità dei dati.</li>
                <li>Revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento precedente.</li>
                <li>Proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali.</li>
              </ul>
              <p className="mt-3">Per esercitare i propri diritti, l'utente può inviare una richiesta a: <a href="mailto:info@websuccessioni.it" className="text-primary hover:underline">info@websuccessioni.it</a>.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">9. Trasferimento dei Dati</h2>
              <p>I dati personali sono trattati all'interno dell'Unione Europea. Qualora si rendesse necessario il trasferimento verso paesi terzi, questo avverrà nel rispetto delle garanzie previste dal GDPR (es. decisioni di adeguatezza, clausole contrattuali standard).</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">10. Modifiche alla Privacy Policy</h2>
              <p>Il Titolare si riserva il diritto di apportare modifiche alla presente informativa in qualsiasi momento. Si invita l'utente a consultare periodicamente questa pagina per verificare eventuali aggiornamenti.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </main>
);

export default PrivacyPolicy;
