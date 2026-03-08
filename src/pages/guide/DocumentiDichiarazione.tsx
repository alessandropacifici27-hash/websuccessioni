import GuideArticleLayout from "./GuideArticleLayout";

const sections = [
  {
    title: "Documenti relativi al defunto",
    content: "Per presentare la dichiarazione è necessario raccogliere: carta d'identità o passaporto del defunto, codice fiscale o tessera sanitaria, certificato di morte, certificato di residenza, certificato di stato di famiglia storico. Se il defunto era coniugato serve l'estratto per riassunto dell'atto di matrimonio. Se era separato o divorziato serve la sentenza di separazione o divorzio. Se non era coniugato serve il certificato di stato libero o vedovanza.",
  },
  {
    title: "Documenti degli eredi",
    content: "Per ciascun erede è necessario: carta d'identità o passaporto in corso di validità, codice fiscale o tessera sanitaria, stato di famiglia attuale, dichiarazione sostitutiva di atto notorio. In caso di eventuale rinuncia all'eredità da parte di qualche erede è necessario il relativo atto notarile. Per successioni testamentarie serve il verbale di deposito e pubblicazione del testamento olografo, oppure il verbale di passaggio al repertorio per il testamento pubblico.",
  },
  {
    title: "Documenti per gli immobili",
    content: "Se nell'asse ereditario sono presenti immobili occorre il titolo di acquisto (rogito, sentenza o precedente dichiarazione di successione) oppure una visura catastale aggiornata. Per i terreni è necessario anche il certificato di destinazione urbanistica rilasciato dal Comune, oppure la visura catastale aggiornata.",
  },
  {
    title: "Documenti bancari e finanziari",
    content: "Per ogni conto corrente bancario o postale serve una certificazione dell'istituto che riporti il saldo alla data del decesso, i titoli in deposito e le eventuali passività. Per partecipazioni societarie servono: visura camerale, atto costitutivo, situazione patrimoniale alla data del decesso, statuto vigente. Per azioni e obbligazioni servono le relative certificazioni.",
  },
  {
    title: "Spese funerarie e passività",
    content: "È possibile dedurre dall'asse ereditario le spese funerarie documentate (con limite di 1.032 euro), i debiti del defunto documentati e le spese mediche sostenute negli ultimi sei mesi di vita. Per dedurre queste passività è necessario conservare tutte le fatture e la documentazione relativa.",
  },
];

const DocumentiDichiarazione = () => (
  <GuideArticleLayout
    seoTitle="Documenti necessari per la dichiarazione di successione 2026 | WebSuccessioni"
    seoDescription="Lista completa dei documenti per la dichiarazione di successione: cosa serve per il defunto, gli eredi, gli immobili e i conti bancari."
    canonical="/guide/documenti-dichiarazione-successione"
    category="Documenti"
    categoryColor="bg-emerald-500/15 text-emerald-400"
    title="Documenti necessari per la dichiarazione di successione"
    highlightWord="successione"
    sections={sections}
  />
);

export default DocumentiDichiarazione;
