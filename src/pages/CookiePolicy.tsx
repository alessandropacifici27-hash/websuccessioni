import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const CookiePolicy = () => (
  <>
    <Helmet>
      <title>Cookie Policy | WebSuccessioni</title>
      <meta
        name="description"
        content="Cookie Policy di WebSuccessioni. Informazioni sui cookie utilizzati dal sito e su come gestire le tue preferenze."
      />
    </Helmet>
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Cookie <span className="text-gradient-gold italic">Policy</span>
              </h1>
              <p className="font-body text-muted-foreground text-sm mt-4">Ultimo aggiornamento: Marzo 2026</p>
            </div>

            <div className="font-body text-muted-foreground text-sm leading-relaxed space-y-8">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">1. Cosa sono i Cookie</h2>
                <p>
                  I cookie sono piccoli file di testo che i siti visitati inviano al browser dell'utente, dove vengono
                  memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. I cookie vengono
                  utilizzati per diverse finalità, hanno caratteristiche diverse e possono essere utilizzati sia dal
                  titolare del sito che si sta visitando, sia da terze parti.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  2. Tipologie di Cookie Utilizzati
                </h2>

                <h3 className="font-display text-lg font-semibold text-foreground mb-3 mt-5">
                  2.1 Cookie Tecnici (necessari)
                </h3>
                <p>
                  Sono cookie indispensabili per il corretto funzionamento del sito. Includono cookie di navigazione,
                  cookie di sessione e cookie di funzionalità. Non richiedono il consenso dell'utente ai sensi dell'art.
                  122, comma 1, del Codice Privacy.
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong>Cookie di sessione</strong>: consentono la navigazione e l'utilizzo del sito. Scadono alla
                    chiusura del browser.
                  </li>
                  <li>
                    <strong>Cookie di preferenza</strong>: memorizzano le scelte dell'utente (es. consenso cookie).
                    Durata: 12 mesi.
                  </li>
                </ul>

                <h3 className="font-display text-lg font-semibold text-foreground mb-3 mt-5">2.2 Cookie Analitici</h3>
                <p>
                  Utilizziamo Google Analytics per raccogliere informazioni statistiche aggregate sull'utilizzo del sito.
                  Gli indirizzi IP vengono anonimizzati. Questi cookie sono installati solo previo consenso dell'utente.
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong>_ga</strong>: utilizzato per distinguere gli utenti. Durata: 2 anni.
                  </li>
                  <li>
                    <strong>_ga_*</strong>: utilizzato per mantenere lo stato della sessione. Durata: 2 anni.
                  </li>
                </ul>

                <h3 className="font-display text-lg font-semibold text-foreground mb-3 mt-5">
                  2.3 Cookie di Terze Parti
                </h3>
                <p>
                  Il sito può contenere collegamenti a servizi di terze parti (WhatsApp, Telegram, social media) che
                  potrebbero installare i propri cookie. WebSuccessioni non ha alcun controllo sui cookie installati da
                  terze parti.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">3. Gestione del Consenso</h2>
                <p>Al primo accesso al sito, l'utente visualizza un banner informativo che permette di:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong>Accettare</strong> tutti i cookie.
                  </li>
                  <li>
                    <strong>Rifiutare</strong> i cookie non necessari (verranno installati solo i cookie tecnici).
                  </li>
                </ul>
                <p className="mt-3">
                  Il consenso può essere revocato in qualsiasi momento cancellando i cookie dal proprio browser.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">4. Come Disabilitare i Cookie</h2>
                <p>
                  L'utente può gestire le preferenze relative ai cookie anche attraverso le impostazioni del proprio
                  browser. Di seguito i link alle istruzioni dei principali browser:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Apple Safari
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
                <p className="mt-3">
                  La disabilitazione dei cookie tecnici potrebbe compromettere il corretto funzionamento del sito.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">5. Riferimenti Normativi</h2>
                <p>La presente Cookie Policy è redatta in conformità a:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Regolamento UE 2016/679 (GDPR).</li>
                  <li>D.Lgs. 196/2003 (Codice Privacy), come modificato dal D.Lgs. 101/2018.</li>
                  <li>
                    Linee Guida del Garante Privacy in materia di cookie e altri strumenti di tracciamento (10 giugno
                    2021).
                  </li>
                  <li>Direttiva 2002/58/CE (Direttiva ePrivacy).</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">6. Contatti</h2>
                <p>
                  Per qualsiasi domanda relativa alla presente Cookie Policy, è possibile contattarci all'indirizzo email:{" "}
                  <a href="mailto:info@websuccessioni.it" className="text-primary hover:underline">
                    info@websuccessioni.it
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  </>
);

export default CookiePolicy;
