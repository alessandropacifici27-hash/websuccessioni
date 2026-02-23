import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Michael R.", role: "Business Owner", text: "Sterling & Associates saved my company during a complex litigation. Their expertise and dedication were unmatched." },
  { name: "Sarah T.", role: "Medical Professional", text: "After my accident, they fought tirelessly and secured a settlement that covered all my medical expenses and more." },
  { name: "David K.", role: "Real Estate Developer", text: "Their real estate team guided us through a multimillion-dollar deal with precision and professionalism." },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-accent font-body font-semibold text-sm tracking-[0.25em] uppercase mb-3">Testimonials</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">What Our Clients Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card rounded-lg p-8 border border-border relative"
            >
              <Quote className="w-8 h-8 text-accent/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <p className="font-display font-semibold text-foreground">{t.name}</p>
                <p className="font-body text-muted-foreground text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
