import GuideArticleLayout from "./GuideArticleLayout";

const sections = [
  {
    title: "Documenti relativi al defunto",
    content: "Per presentare la dichiarazione è necessario raccogliere: carta d'identità o passaporto del defunto, codice fiscale o tessera sanitaria in originale, certificato di morte, certificato di residenza, certificato di stato di famiglia storico. Se il defunto era coniugato serve l'estratto per riassunto dell'atto di matrimonio in carta semplice. Se era separato o divorziato serve la sentenza di separazione o divorzio. Se non era coniugato serve il certificato di stato libero o di vedovanza.",
  },
  {
    title: "Documenti degli eredi",
    content: "Per ciascun erede: carta d'identità o passaporto in corso di validità, codice fiscale o tessera sanitaria, stato di famiglia attuale, dichiarazione sostitutiva di atto notorio. In caso di rinuncia all'eredità da parte di qualche erede serve il relativo atto notarile. Per successioni testamentarie serve il verbale di deposito e pubblicazione del testamento olografo, oppure il verbale di passaggio al repertorio per il testamento pubblico.",
  },
  {
    title: "Documenti per gli immobili",
    content: "Se nell'asse ereditario ci sono immobili occorre il titolo di acquisto (rogito, sentenza o precedente dichiarazione di successione) oppure una visura catastale aggiornata. Per i terreni è necessario anche il certificato di destinazione urbanistica rilasciato dal Comune oppure la visura catastale aggiornata.",
  },
  {
    title: "Documenti bancari e finanziari",
    content: "Per ogni conto corrente bancario o postale serve una certificazione dell'istituto che riporti il saldo alla data del decesso, i titoli in deposito e le eventuali passività. Per partecipazioni societarie: visura camerale, atto costitutivo, situazione patrimoniale alla data del decesso e statuto vigente. Per azioni e obbligazioni servono le relative certificazioni.",
  },
  {
    title: "Spese funerarie e passività deducibili",
    content: "È possibile dedurre dall'asse ereditario le spese funerarie documentate fino a 1.032 euro, i debiti del defunto documentati e le spese mediche sostenute negli ultimi sei mesi di vita. Per dedurre queste passività è necessario conservare tutte le fatture e la relativa documentazione.",
  },
];

const DocumentiDichiarazione = () => (
  <GuideArticleLayout
    seoTitle="Documenti per la dichiarazione di successione 2026: lista completa | WebSuccessioni"
    seoDescription="Lista completa e aggiornata dei documenti necessari per la dichiarazione di successione: defunto, eredi, immobili, conti bancari e partecipazioni societarie."
    canonical="/guide/documenti-dichiarazione-successione"
    category="Documenti"
    categoryColor="bg-emerald-500/15 text-emerald-400"
    title="Documenti necessari per la dichiarazione di successione"
    highlightWord="successione"
    sections={sections}
  />
);

export default DocumentiDichiarazione;
