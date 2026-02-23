import { Scale, Briefcase, Shield, Users, Building2, Gavel } from "lucide-react";
import { motion } from "framer-motion";

const areas = [
  { icon: Scale, title: "Corporate Law", desc: "Mergers, acquisitions, and business formation with strategic counsel." },
  { icon: Briefcase, title: "Business Litigation", desc: "Aggressive representation in commercial disputes and contract claims." },
  { icon: Shield, title: "Criminal Defense", desc: "Vigorous defense protecting your freedom and reputation." },
  { icon: Users, title: "Family Law", desc: "Compassionate guidance through divorce, custody, and support matters." },
  { icon: Building2, title: "Real Estate", desc: "Commercial and residential transactions, zoning, and land use." },
  { icon: Gavel, title: "Personal Injury", desc: "Maximum compensation for accident victims and their families." },
];

const PracticeAreas = () => {
  return (
    <section id="practice" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-accent font-body font-semibold text-sm tracking-[0.25em] uppercase mb-3">What We Do</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Practice Areas</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <a.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{a.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
