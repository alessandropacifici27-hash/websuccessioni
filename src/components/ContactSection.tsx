import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

const info = [
  { icon: MapPin, label: "123 Justice Ave, Suite 800, New York, NY 10001" },
  { icon: Phone, label: "(212) 555-0147" },
  { icon: Mail, label: "contact@sterlinglaw.com" },
  { icon: Clock, label: "Mon – Fri: 8:00 AM – 6:00 PM" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-accent font-body font-semibold text-sm tracking-[0.25em] uppercase mb-3">Get In Touch</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Free Case Evaluation</h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Tell us about your situation and one of our attorneys will reach out within 24 hours to discuss your options — completely confidential and at no cost.
            </p>
            <div className="space-y-5">
              {info.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <p className="font-body text-sm text-foreground pt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-card border border-border rounded-lg p-8 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <Input placeholder="John Doe" className="font-body" />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                <Input placeholder="(555) 000-0000" className="font-body" />
              </div>
            </div>
            <div>
              <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <Input type="email" placeholder="john@example.com" className="font-body" />
            </div>
            <div>
              <label className="font-body text-sm font-medium text-foreground mb-1.5 block">How Can We Help?</label>
              <Textarea placeholder="Briefly describe your legal situation..." rows={4} className="font-body resize-none" />
            </div>
            <Button variant="gold" size="lg" className="w-full">Request Free Consultation</Button>
            <p className="font-body text-xs text-muted-foreground text-center">Your information is 100% confidential and protected by attorney-client privilege.</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
