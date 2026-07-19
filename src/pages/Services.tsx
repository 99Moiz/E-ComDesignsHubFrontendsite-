import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Palette, Search, Megaphone, Code, Zap, Shield, BarChart3, Film, Plus, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/motion/TextReveal";
import Spotlight from "@/components/motion/Spotlight";
import FloatingShapes from "@/components/motion/FloatingShapes";
import Magnetic from "@/components/motion/Magnetic";

const services = [
  { icon: <Globe size={22} />, title: "Web Development", description: "Custom-built responsive websites and web applications using modern frameworks. From corporate sites to complex platforms, we deliver scalable, performant solutions.", features: ["React & Next.js", "Custom CMS", "E-Commerce", "Progressive Web Apps"] },
  { icon: <Palette size={22} />, title: "UI/UX Design", description: "Human-centered design that balances beauty with usability. We craft intuitive interfaces that delight users and drive conversions.", features: ["User Research", "Wireframing", "Prototyping", "Design Systems"] },
  { icon: <Palette size={22} />, title: "Graphic Design", description: "Creative visual solutions that strengthen brand identity and communication. From logos to full-scale marketing materials, we craft designs that are strategic, consistent, and visually impactful.", features: ["Logo Design", "Brand Identity", "Banners & Social Creatives", "Print & Marketing"] },
  { icon: <Film size={22} />, title: "2D & 3D Animation", description: "High-quality motion visuals that bring ideas to life. We create engaging 2D and 3D animations for marketing, explainer videos, product showcases, and digital campaigns.", features: ["2D Explainer Videos", "3D Modeling & Rendering", "Product Animation", "Motion Graphics"] },
  { icon: <Search size={22} />, title: "SEO Optimization", description: "Data-driven SEO strategies that improve your search rankings and drive qualified organic traffic to grow your business.", features: ["Technical SEO", "Content Strategy", "Link Building", "Analytics"] },
  { icon: <Megaphone size={22} />, title: "Digital Marketing", description: "Comprehensive digital marketing campaigns across multiple channels to increase brand awareness and generate leads.", features: ["Social Media", "PPC Campaigns", "Email Marketing", "Content Marketing"] },
  { icon: <Code size={22} />, title: "Custom Software", description: "Bespoke software solutions tailored to your unique workflows, integrations, and business requirements.", features: ["API Development", "Automation", "Integrations", "Cloud Solutions"] },
  { icon: <Zap size={22} />, title: "Performance", description: "Optimize your digital assets for speed, reliability, and scalability to deliver the best possible user experience.", features: ["Speed Optimization", "CDN Setup", "Caching", "Monitoring"] },
  { icon: <Shield size={22} />, title: "Cyber Security", description: "Protect your digital assets with robust security measures, audits, and best practices implementation.", features: ["Security Audits", "SSL/TLS", "Penetration Testing", "Compliance"] },
  { icon: <BarChart3 size={22} />, title: "Analytics & Insights", description: "Turn data into actionable insights with comprehensive analytics setup, dashboards, and reporting.", features: ["Google Analytics", "Custom Dashboards", "A/B Testing", "ROI Tracking"] },
];

const ServiceRow = ({ service, index, open, onToggle }: { service: typeof services[number]; index: number; open: boolean; onToggle: () => void }) => {
  return (
    <div className={`group border-b border-line transition-colors ${open ? "bg-card/40" : "hover:bg-card/20"}`}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 py-7 text-left md:gap-8"
      >
        <span className="font-mono text-xs text-muted-foreground/60 md:text-sm">{String(index + 1).padStart(2, "0")}</span>
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${open ? "bg-primary/15 text-primary glow-green-sm" : "bg-secondary text-muted-foreground group-hover:text-primary"}`}>
          {service.icon}
        </span>
        <h3 className={`flex-1 font-heading text-2xl font-bold tracking-tight transition-transform duration-300 md:text-3xl ${open ? "text-foreground md:translate-x-2" : "text-foreground/85 group-hover:md:translate-x-2"}`}>
          {service.title}
        </h3>
        <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 text-muted-foreground group-hover:text-primary">
          <Plus size={22} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-8 pl-0 md:grid-cols-2 md:pl-[4.75rem]">
              <p className="leading-relaxed text-muted-foreground">{service.description}</p>
              <div className="flex flex-wrap content-start gap-2">
                {service.features.map((f) => (
                  <span key={f} className="rounded-full border border-line bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Services = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <Layout>
      <SEO
        title="Services"
        description="Web development, UI/UX design, branding, SEO, digital marketing, and custom software — explore E-ComDesignsHub's full range of digital services."
        path="/services"
      />
      <section className="relative overflow-hidden section-padding">
        <Spotlight size={560} opacity={0.13} />
        <FloatingShapes variant="emerald" />
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="container relative mx-auto">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow mb-6">
            Our services
          </motion.p>
          <h1 className="max-w-4xl font-heading text-3xl font-normal leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <TextReveal text="Solutions that" as="span" className="block" />
            <TextReveal text="deliver results." as="span" className="block" highlight={["deliver", "results."]} delay={0.12} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            From concept to execution, we provide comprehensive digital services designed to help your
            business thrive. Tap any service to explore what&rsquo;s inside.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 md:pb-36 px-5 md:px-8">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="border-t border-line">
              {services.map((service, i) => (
                <ServiceRow
                  key={service.title}
                  service={service}
                  index={i}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-16 flex flex-col items-center gap-6 rounded-[2rem] border border-line bg-card p-10 text-center md:p-14">
              <h2 className="max-w-2xl font-heading text-2xl font-normal leading-[1.15] sm:text-3xl md:text-4xl">
                Not sure which service fits? <span className="text-gradient">Let&rsquo;s figure it out together.</span>
              </h2>
              <Magnetic strength={20}>
                <Link to="/contact" className="btn-pill">
                  Book a free consultation
                  <span className="btn-pill-arrow">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </Magnetic>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Pricing />
      <FAQ />
    </Layout>
  );
};

export default Services;
