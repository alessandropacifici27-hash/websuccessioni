import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Section {
  title: string;
  content: string;
}

interface GuideArticleLayoutProps {
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  category: string;
  categoryColor: string;
  title: string;
  highlightWord: string;
  sections: Section[];
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const GuideArticleLayout = ({
  seoTitle,
  seoDescription,
  canonical,
  category,
  categoryColor,
  title,
  highlightWord,
  sections,
}: GuideArticleLayoutProps) => {
  const titleParts = title.split(highlightWord);

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`https://www.websuccessioni.it${canonical}`} />
      </Helmet>

      <Navbar />

      <article className="pt-28 pb-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Link
              to="/guide"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" /> Torna alle Guide
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className={`inline-block font-body text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-5 ${categoryColor}`}>
              {category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {titleParts[0]}
              <span className="italic bg-gradient-to-r from-primary to-[hsl(45,60%,65%)] bg-clip-text text-transparent">
                {highlightWord}
              </span>
              {titleParts[1] || ""}
            </h1>
            <div className="flex items-center gap-4 font-body text-sm text-muted-foreground">
              <span>WebSuccessioni</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>Marzo 2026</span>
            </div>
          </motion.header>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.section
                key={i}
                custom={i}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </motion.section>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/25 rounded-xl p-8 md:p-10 text-center"
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Hai bisogno di assistenza?
            </h3>
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
          </motion.div>
        </div>
      </article>

      <Footer />
    </>
  );
};

export default GuideArticleLayout;
