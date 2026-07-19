import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Instagram, Facebook, ArrowUpRight } from "lucide-react";
import emailjs from "@emailjs/browser";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Spotlight from "@/components/motion/Spotlight";
import FloatingShapes from "@/components/motion/FloatingShapes";
import TextReveal from "@/components/motion/TextReveal";
import Magnetic from "@/components/motion/Magnetic";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/** Field with an animated focus underline + floating label micro-interaction */
const Field = ({
  label,
  index,
  children,
}: {
  label: string;
  index: string;
  children: React.ReactNode;
}) => (
  <label className="group block">
    <span className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors group-focus-within:text-primary">
      <span className="text-primary/60">{index}</span> {label}
    </span>
    <div className="relative">
      {children}
      <span
        style={{ transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-primary group-focus-within:scale-x-100 glow-green-sm"
      />
    </div>
  </label>
);

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Owner mail
      await emailjs.send(
        // "service_p2aompf",
        "service_gu6hcdr",
        "template_668fmzq",
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "BCE3DhDXp2I-6C0Pe"
      );

      // Client auto reply
      await emailjs.send(
        // "service_p2aompf",
        "service_gu6hcdr",
        "template_2ifb2e8",
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
        },
        "BCE3DhDXp2I-6C0Pe"
      );

      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      alert("Failed to send message. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="Contact Us"
        description="Get in touch with E-ComDesignsHub. Tell us about your project and we'll get back to you within one business day."
        path="/contact"
      />
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 md:pt-28 pb-8 px-5 md:px-8">
        <Spotlight color="var(--primary)" size={620} opacity={0.12} />
        <FloatingShapes variant="emerald" />
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.35]" />

        <div className="container relative mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-6"
          >
            <span className="text-accent">/ 06</span> — Contact
          </motion.p>

          <TextReveal
            as="h1"
            text="Let's make something worth remembering."
            highlight={["remembering."]}
            className="max-w-4xl font-heading text-3xl font-normal leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Have a project in mind? Tell us about it — we read every message and
            reply personally.
          </motion.p>
        </div>
      </section>

      {/* ── Form + Info ────────────────────────────────────────── */}
      <section className="relative px-5 md:px-8 pb-28 pt-8">
        <div className="container mx-auto grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-line bg-card p-6 sm:p-9"
            >
              <div className="mb-6 grid gap-6 sm:grid-cols-2">
                <Field label="Name" index="01">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls}
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email" index="02">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputCls}
                    placeholder="your@email.com"
                  />
                </Field>
              </div>

              <div className="mb-6">
                <Field label="Subject" index="03">
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={inputCls}
                    placeholder="Project inquiry"
                  />
                </Field>
              </div>

              <div className="mb-8">
                <Field label="Message" index="04">
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us about your project…"
                  />
                </Field>
              </div>

              <Magnetic strength={14}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-pill w-full justify-center disabled:opacity-50 sm:w-auto"
                >
                  {isSubmitting ? (
                    "Sending…"
                  ) : submitted ? (
                    "Message sent ✓"
                  ) : (
                    <>
                      Send message
                      <span className="btn-pill-arrow">
                        <Send size={15} />
                      </span>
                    </>
                  )}
                </button>
              </Magnetic>
            </form>
          </motion.div>

          {/* Contact info */}
          <Stagger className="flex flex-col gap-6 lg:col-span-2">
            <StaggerItem>
              <div className="rounded-3xl border border-line bg-card p-6 sm:p-7">
                <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-primary">
                  Get in touch
                </h3>
                <div className="flex flex-col gap-5">
                  <a
                    href="mailto:ecommercedesignshub@gmail.com"
                    className="group flex min-w-0 items-start gap-3 transition-colors hover:text-primary"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-primary transition-colors group-hover:border-primary/40">
                      <Mail size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">Email</span>
                      <span className="block break-all text-sm text-muted-foreground">
                        support@ecomdesignshub.com
                      </span>
                    </span>
                  </a>
                  <div className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-primary">
                      <MapPin size={18} />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">Location</span>
                      <span className="block text-sm text-muted-foreground">
                        98 E Branch RD, Allentown, New Jersey 08501, USA
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-3xl border border-line bg-card p-6 sm:p-7">
                <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-primary">
                  Follow us
                </h3>
                <div className="flex gap-3">
                  <Magnetic strength={12}>
                    <a
                      href="https://www.instagram.com/ecom_design_hub?igsh=MXI0Y3NwbnM0NzFzbw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      aria-label="Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                  </Magnetic>
                  <Magnetic strength={12}>
                    <a
                      href="https://www.facebook.com/share/1DVHQF1u71/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      aria-label="Facebook"
                    >
                      <Facebook size={18} />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-7">
                <Spotlight color="var(--accent)" size={360} opacity={0.1} />
                <p className="font-heading text-lg font-bold leading-snug">
                  Prefer email?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Drop us a line directly and we'll get back within one business day.
                </p>
                <a
                  href="mailto:ecommercedesignshub@gmail.com"
                  className="link-underline mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  Say hello <ArrowUpRight size={15} />
                </a>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
