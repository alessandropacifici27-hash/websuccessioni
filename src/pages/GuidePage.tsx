import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const guides = [
  {
    category: "Costi",
    categoryColor: "bg-primary/15 text-primary",
    title: "Quanto costa la dichiarazione di successione nel 2026",
    description: "Imposte, onorari professionali, bolli e spese vive: tutto quello che dovrai affrontare economicamente.",
    time: "5 min",
    link: "/guide/costo-dichiarazione-successione",
  },
  {
    category: "Documenti",
    categoryColor: "bg-emerald-500/15 text-emerald-400",
    title: "Documenti necessari per la dichiarazione di successione",
    description: "La lista completa di tutto quello che devi raccogliere prima di poter presentare la dichiarazione.",
    time: "6 min",
    link: "/guide/documenti-dichiarazione-successione",
  },
  {
    category: "Scadenze",
    categoryColor: "bg-rose-500/15 text-rose-400",
    title: "Entro quando va presentata la dichiarazione di successione",
    description: "Termini, sanzioni per ritardo e come regolarizzare la posizione con il ravvedimento operoso.",
    time: "4 min",
    link: "/guide/scadenza-dichiarazione-successione",
  },
  {
    category: "Successione",
    categoryColor: "bg-sky-500/15 text-sky-400",
    title: "Successione senza testamento: cosa fare e come funziona",
    description: "Come si dividono i beni quando il defunto non ha lasciato testamento e chi sono gli eredi legittimi.",
    time: "7 min",
    link: "/guide/successione-senza-testamento",
  },
  {
    category: "Immobili",
    categoryColor: "bg-amber-500/15 text-amber-400",
    title: "Voltura catastale dopo la successione: tempi e procedura",
    description: "Come aggiornare la titolarità degli immobili ereditati e quali sono i costi e i tempi dell'operazione.",
    time: "5 min",
    link: "/guide/voltura-catastale-successione",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const GuidePage = () => {
  return (
    <>
      <Helmet>
        <title>Guide sulla Dichiarazione di Successione | WebSuccessioni</title>
        <meta
          name="description"
          content="Guide complete e aggiornate sulla dichiarazione di successione: costi, documenti, scadenze, voltura catastale e successione senza testamento."
        />
        <link rel="canonical" href="https://www.websuccessioni.it/guide" />
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block font-body text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6"
          >
            Risorse Gratuite
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Guide sulla Dichiarazione di{" "}
            <span className="italic bg-gradient-to-r from-primary to-[hsl(45,60%,65%)] bg-clip-text text-transparent">
              Successione
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Tutto quello che devi sapere sulla dichiarazione di successione, spiegato in modo chiaro e aggiornato al 2026.
          </motion.p>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="pb-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {guides.map((guide, i) => (
              <motion.div
                key={guide.link}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <Link
                  to={guide.link}
                  className="group block bg-card border border-border rounded-xl p-7 hover:border-primary/30 transition-colors duration-300 h-full"
                >
                  <span className={`inline-block font-body text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4 ${guide.categoryColor}`}>
                    {guide.category}
                  </span>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {guide.title}
                  </h2>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" /> {guide.time} di lettura
                    </span>
                    <span className="flex items-center gap-1 font-body text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Leggi <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default GuidePage;
