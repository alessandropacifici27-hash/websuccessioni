import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export type GradoSuccessione =
  | "coniuge"
  | "discendente"
  | "ascendente"
  | "fratello_sorella"
  | "parente_4"
  | "affine_3"
  | "altro";

type CalcoloResult = {
  impostaSuccessione: number;
  impostaIpotecaria: number;
  impostaCatastale: number;
  totale: number;
  franchigia: number;
  aliquota: number;
  eccedenza: number;
  totalePatrimonio: number;
  valoreCatastralePrimaCasa: number;
  valoreCatastaleAltriImmobili: number;
};

const GRADO_OPTIONS: { value: GradoSuccessione; label: string }[] = [
  { value: "coniuge", label: "Coniuge" },
  { value: "discendente", label: "Discendente in linea retta (figlio, nipote...)" },
  { value: "ascendente", label: "Ascendente in linea retta (genitore, nonno...)" },
  { value: "fratello_sorella", label: "Fratello o sorella" },
  { value: "parente_4", label: "Parente fino al 4° grado" },
  { value: "affine_3", label: "Affine fino al 3° grado" },
  { value: "altro", label: "Altro soggetto" },
];

const calcolaImposte = (
  grado: GradoSuccessione,
  handicap: boolean,
  renditaPrimaCasa: number,
  renditaAltriImmobili: number,
  beniMobili: number,
): CalcoloResult => {
  const valoreCatastralePrimaCasa = renditaPrimaCasa * 115.5;
  const valoreCatastaleAltriImmobili = renditaAltriImmobili * 126;

  let franchigia = 0;
  let aliquota = 0;

  if (handicap) {
    franchigia = 1_500_000;
  }

  switch (grado) {
    case "coniuge":
    case "discendente":
    case "ascendente":
      aliquota = 0.04;
      if (!handicap) franchigia = 1_000_000;
      break;
    case "fratello_sorella":
      aliquota = 0.06;
      if (!handicap) franchigia = 100_000;
      break;
    case "parente_4":
    case "affine_3":
      aliquota = 0.06;
      break;
    case "altro":
      aliquota = 0.08;
      break;
  }

  const totalePatrimonio =
    valoreCatastralePrimaCasa + valoreCatastaleAltriImmobili + beniMobili;
  const eccedenza = Math.max(0, totalePatrimonio - franchigia);
  const impostaSuccessione = eccedenza * aliquota;

  let impostaIpotecaria = 0;
  if (renditaPrimaCasa > 0) impostaIpotecaria += 200;
  if (renditaAltriImmobili > 0) {
    impostaIpotecaria += Math.max(200, valoreCatastaleAltriImmobili * 0.02);
  }

  let impostaCatastale = 0;
  if (renditaPrimaCasa > 0) impostaCatastale += 200;
  if (renditaAltriImmobili > 0) {
    impostaCatastale += Math.max(200, valoreCatastaleAltriImmobili * 0.01);
  }

  const totale = impostaSuccessione + impostaIpotecaria + impostaCatastale;

  return {
    impostaSuccessione,
    impostaIpotecaria,
    impostaCatastale,
    totale,
    franchigia,
    aliquota,
    eccedenza,
    totalePatrimonio,
    valoreCatastralePrimaCasa,
    valoreCatastaleAltriImmobili,
  };
};

const formatEuro = (n: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

const formatEuroInteri = (n: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

const cardClass =
  "bg-background border border-border rounded-lg p-6 md:p-8 hover:border-primary/20 transition-colors duration-300";

const SuccessionTaxCalculator = () => {
  const [grado, setGrado] = useState<GradoSuccessione>("coniuge");
  const [handicap, setHandicap] = useState(false);
  const [renditaPrimaCasa, setRenditaPrimaCasa] = useState("");
  const [renditaAltriImmobili, setRenditaAltriImmobili] = useState("");
  const [beniMobili, setBeniMobili] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<CalcoloResult | null>(null);

  const handleCalcola = () => {
    const v1 = parseFloat(renditaPrimaCasa.replace(",", ".")) || 0;
    const v2 = parseFloat(renditaAltriImmobili.replace(",", ".")) || 0;
    const v3 = parseFloat(beniMobili.replace(",", ".")) || 0;
    const r = calcolaImposte(grado, handicap, v1, v2, v3);
    setResult(r);
    setShowResults(true);
  };

  const haImmobili =
    (parseFloat(renditaPrimaCasa.replace(",", ".")) || 0) > 0 ||
    (parseFloat(renditaAltriImmobili.replace(",", ".")) || 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.12, delay: 0.04 }}
      className={`w-full overflow-hidden ${cardClass}`}
    >
      <div className="mb-6">
        <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
          Calcola le imposte di successione
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          Stima gratuita — i valori definitivi sono quelli dell&apos;Agenzia delle Entrate
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="font-body text-xs font-medium text-primary mb-2 block uppercase tracking-wider">
            Grado di parentela / affinità
          </label>
          <select
            value={grado}
            onChange={(e) => setGrado(e.target.value as GradoSuccessione)}
            className="w-full h-11 rounded-md border border-primary/20 bg-secondary px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {GRADO_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={handicap}
            onChange={(e) => setHandicap(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 mt-0.5 cursor-pointer ${
              handicap
                ? "bg-yellow-500 border-yellow-500"
                : "bg-secondary border-border group-hover:border-yellow-500/50"
            }`}
          >
            {handicap && (
              <span className="text-black text-[10px] font-bold leading-none">✓</span>
            )}
          </div>
          <span className="font-body text-sm text-foreground/80 leading-snug">
            L&apos;erede è portatore di handicap grave (L.104/1992)?
          </span>
        </label>

        <div>
          <label className="font-body text-xs font-medium text-primary mb-2 block uppercase tracking-wider">
            Rendita catastale immobile prima casa (€)
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={renditaPrimaCasa}
            onChange={(e) => setRenditaPrimaCasa(e.target.value)}
            placeholder="0"
            className="w-full h-11 rounded-md border border-primary/20 bg-secondary px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="font-body text-xs text-muted-foreground mt-1.5 leading-relaxed">
            Trovi la rendita catastale nella visura catastale dell&apos;immobile
          </p>
        </div>

        <div>
          <label className="font-body text-xs font-medium text-primary mb-2 block uppercase tracking-wider">
            Rendita catastale altri immobili (€)
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={renditaAltriImmobili}
            onChange={(e) => setRenditaAltriImmobili(e.target.value)}
            placeholder="0"
            className="w-full h-11 rounded-md border border-primary/20 bg-secondary px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="font-body text-xs text-muted-foreground mt-1.5 leading-relaxed">
            Per immobili diversi dalla prima casa (seconda casa, terreni, ecc.)
          </p>
        </div>

        <div>
          <label className="font-body text-xs font-medium text-primary mb-2 block uppercase tracking-wider">
            Valore beni mobili (denaro, conti correnti, ecc.) (€)
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={beniMobili}
            onChange={(e) => setBeniMobili(e.target.value)}
            placeholder="0"
            className="w-full h-11 rounded-md border border-primary/20 bg-secondary px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="font-body text-xs text-muted-foreground mt-1.5 leading-relaxed">
            I Titoli di Stato sono esenti e non vanno indicati
          </p>
        </div>

        <Button
          type="button"
          variant="gold"
          size="lg"
          className="w-full sm:w-auto font-body"
          onClick={handleCalcola}
        >
          Calcola imposte
        </Button>
      </div>

      {showResults && result && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-5 md:p-6 space-y-4"
        >
          {result.valoreCatastralePrimaCasa > 0 && (
            <p className="font-body text-xs text-muted-foreground">
              Valore catastale prima casa calcolato:{" "}
              <span className="text-foreground/70">
                {formatEuro(result.valoreCatastralePrimaCasa)}
              </span>
            </p>
          )}
          {result.valoreCatastaleAltriImmobili > 0 && (
            <p className="font-body text-xs text-muted-foreground">
              Valore catastale altri immobili calcolato:{" "}
              <span className="text-foreground/70">
                {formatEuro(result.valoreCatastaleAltriImmobili)}
              </span>
            </p>
          )}

          <div className="font-body text-sm text-foreground space-y-1">
            <p>
              <span className="text-muted-foreground">Imposta di successione: </span>
              <span className="font-semibold text-foreground">
                {formatEuro(result.impostaSuccessione)}
              </span>
            </p>
            {result.impostaSuccessione === 0 &&
              result.eccedenza === 0 &&
              result.totalePatrimonio > 0 &&
              result.franchigia > 0 && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Non dovuta — il patrimonio è inferiore alla franchigia di{" "}
                  {formatEuroInteri(result.franchigia)}
                </p>
              )}
          </div>

          <div className="font-body text-sm">
            <span className="text-muted-foreground">Imposta ipotecaria: </span>
            {!haImmobili ? (
              <span className="text-foreground">Non dovuta — nessun immobile indicato</span>
            ) : (
              <span className="font-semibold text-foreground">
                {formatEuro(result.impostaIpotecaria)}
              </span>
            )}
          </div>

          <div className="font-body text-sm">
            <span className="text-muted-foreground">Imposta catastale: </span>
            {!haImmobili ? (
              <span className="text-foreground">Non dovuta — nessun immobile indicato</span>
            ) : (
              <span className="font-semibold text-foreground">
                {formatEuro(result.impostaCatastale)}
              </span>
            )}
          </div>

          <div className="border-t border-border/60 pt-4">
            <p className="font-display text-2xl md:text-3xl font-bold text-primary">
              Totale stimato: {formatEuro(result.totale)}
            </p>
          </div>
        </motion.div>
      )}

      {showResults && (
        <div className="mt-8 rounded-xl border border-primary/25 bg-gradient-to-b from-card to-background p-6 md:p-7 shadow-[0_0_40px_-15px_rgba(184,142,67,0.12)]">
          <p className="font-body text-sm text-foreground/90 leading-relaxed mb-5">
            Hai bisogno di assistenza per la tua dichiarazione di successione? Scopri il nostro
            servizio — completamente online, senza andare dal notaio.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button variant="gold" size="lg" className="font-body w-full sm:w-auto" asChild>
              <Link to="/inizia-pratica-online">Inizia pratica online</Link>
            </Button>
            <div className="flex items-center gap-3">
              <span className="font-body text-sm text-muted-foreground">
                Hai dei dubbi? Contattaci:
              </span>
              <div className="flex items-center gap-2">
                
                  href="tel:+390292892296"
                  aria-label="Chiamaci"
                  className="w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 5.55 5.55l.62-.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </a>
                
                  href="https://wa.me/393793511586"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Scrivici su WhatsApp"
                  className="w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </a>
                
                  href="mailto:info@websuccessioni.it"
                  aria-label="Scrivici per email"
                  className="w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="font-body text-[11px] text-muted-foreground leading-relaxed mt-8">
        Questa simulazione è indicativa. I valori definitivi sono determinati dall&apos;Agenzia
        delle Entrate nell&apos;avviso di liquidazione. WebSuccessioni non è responsabile di
        eventuali differenze.
      </p>
    </motion.div>
  );
};

export default SuccessionTaxCalculator;