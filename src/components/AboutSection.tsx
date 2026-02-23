import { Award, Clock, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Award, value: "35+", label: "Years Experience" },
  { icon: Users, value: "5,000+", label: "Clients Served" },
  { icon: CheckCircle, value: "97%", label: "Success Rate" },
  { icon: Clock, value: "24/7", label: "Availability" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-accent font-body font-semibold text-sm tracking-[0.25em] uppercase mb-3">Why Choose Us</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              A Legacy of Legal <span className="text-gradient-gold italic">Excellence</span>
            </h2>
            <p className="font-body text-primary-foreground/70 leading-relaxed mb-6">
              At Sterling & Associates, we believe every client deserves counsel that is both strategic and deeply personal. Our attorneys bring Ivy League training and real-world tenacity to every case.
            </p>
            <ul className="space-y-3">
              {["Board-certified specialists in 6 practice areas", "Recognized by Super Lawyers® and Best Lawyers®", "No fees unless we win your case"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-primary-foreground/80 font-body text-sm">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-6 text-center">
                <s.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                <p className="font-display text-3xl font-bold text-primary-foreground">{s.value}</p>
                <p className="font-body text-primary-foreground/60 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
