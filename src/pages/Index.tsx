import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, Palette, Search, Megaphone, Code, Zap, CheckCircle, Star, Users, Briefcase, MessageSquare, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import LogoMarquee from "@/components/LogoMarquee";
import ReviewBadge from "@/components/ReviewBadge";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceCard from "@/components/ServiceCard";
import StatItem from "@/components/StatItem";
import TextReveal from "@/components/motion/TextReveal";
import Magnetic from "@/components/motion/Magnetic";
import Spotlight from "@/components/motion/Spotlight";
import FloatingShapes from "@/components/motion/FloatingShapes";
import Marquee from "@/components/motion/Marquee";
import TiltCard from "@/components/motion/TiltCard";
import Counter from "@/components/motion/Counter";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import heroBanner from "@/assets/hero-banner.jpg";

const services = [
  { icon: <Globe size={22} />, title: "Web Development", description: "Custom websites and web applications built with cutting-edge technologies for optimal performance." },
  { icon: <Palette size={22} />, title: "UI/UX Design", description: "User-centered designs that blend aesthetics with functionality for memorable digital experiences." },
  { icon: <Search size={22} />, title: "SEO Optimization", description: "Data-driven strategies to boost your online visibility and drive organic traffic to your site." },
  { icon: <Megaphone size={22} />, title: "Digital Marketing", description: "Comprehensive campaigns that amplify your brand and connect you with your target audience." },
  { icon: <Code size={22} />, title: "Custom Solutions", description: "Tailored digital products engineered to solve your unique business challenges and goals." },
  { icon: <Zap size={22} />, title: "Performance", description: "Speed up your digital presence with expert optimization for faster load times and better UX." },
];

const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "8+", label: "Years Experience" },
  { value: "99%", label: "Client Satisfaction" },
];

const processSteps = [
  { step: "01", title: "Discovery", description: "We dive deep into your business goals, audience, and market to craft a tailored strategy." },
  { step: "02", title: "Design", description: "Our designers create stunning mockups and prototypes that bring your vision to life." },
  { step: "03", title: "Develop", description: "We build your project using modern tech stacks ensuring performance and scalability." },
  { step: "04", title: "Deliver", description: "We launch your project and provide ongoing support to ensure continued success." },
];

const testimonials = [
  { name: "Sarah M.", role: "E-commerce Owner", quote: "E-ComDesignsHub transformed our online store completely. Sales increased by 150% within the first quarter!", rating: 5 },
  { name: "James K.", role: "Startup Founder", quote: "Professional, creative, and incredibly responsive. They delivered beyond our expectations on every milestone.", rating: 5 },
  { name: "Priya D.", role: "Marketing Director", quote: "Their SEO and digital marketing strategies gave us the competitive edge we needed. Highly recommended!", rating: 5 },
];

const whyChooseUs = [
  "Dedicated project manager for every client",
  "100% custom designs — no templates",
  "SEO-optimized from day one",
  "Fast turnaround without compromising quality",
  "Transparent pricing with no hidden fees",
  "Post-launch support & maintenance",
];

const marqueeItems = ["Web Development", "UI / UX Design", "Branding", "SEO", "Motion", "E-Commerce", "Strategy", "3D & Animation"];

const Hero = () => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[92vh] items-center overflow-hidden">
      <Spotlight size={620} opacity={0.16} />
      <FloatingShapes />
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      <motion.img
        src={heroBanner}
        alt=""
        aria-hidden
        style={reduced ? undefined : { y: imgY, scale: imgScale }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container relative z-10 mx-auto"
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.06] px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Artistry &amp; Strategy in Every Design
            </span>
          </motion.div>

          <h1 className="font-heading text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.5rem]">
            <TextReveal text="We build" as="span" className="block" />
            <TextReveal text="digital experiences" as="span" className="block" highlight={["digital", "experiences"]} delay={0.12} />
            <TextReveal text="that matter." as="span" className="block" delay={0.24} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Transform your business with premium web solutions, stunning design, and strategies that
            deliver measurable results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={22}>
              <Link
                to="/contact"
                className="btn-pill"
              >
                Start a project
                <span className="btn-pill-arrow">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </Magnetic>
            <Magnetic strength={16}>
              <Link
                to="/portfolio"
                className="link-underline inline-flex items-center gap-2 px-2 py-4 font-medium text-foreground"
              >
                View our work
                <ArrowUpRight size={16} className="text-primary" />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <div className="h-10 w-px overflow-hidden bg-line">
          <motion.div
            className="h-4 w-full bg-primary"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

const ProcessTimeline = () => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mt-16">
      {/* connecting rail */}
      <div className="absolute left-0 right-0 top-8 hidden h-px bg-line lg:block">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-primary to-accent"
          style={reduced ? { scaleX: 1 } : { scaleX: lineScale }}
        />
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((item, i) => (
          <ScrollReveal key={item.step} delay={i * 0.1}>
            <div className="group relative">
              <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-card font-heading text-xl font-bold text-primary transition-all duration-300 group-hover:border-primary/40 group-hover:glow-green-sm">
                {item.step}
              </div>
              <h4 className="mb-2 font-heading text-lg font-semibold">{item.title}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <Layout>
      <SEO
        title="Premium Web Design & Digital Growth Agency"
        description="E-ComDesignsHub builds custom websites, e-commerce stores, and digital strategies that turn visitors into customers. Web development, UI/UX design, SEO, and digital marketing."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "E-ComDesignsHub",
          url: "https://ecomdesignshub.com",
          description: "Premium web design, development, and digital marketing agency.",
        }}
      />
      <Hero />
      <LogoMarquee />

      {/* Marquee divider */}
      <div className="border-y border-line bg-card/30 py-6">
        <Marquee speed={26}>
          {marqueeItems.map((item, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="font-heading text-2xl font-bold text-foreground/80 md:text-3xl">{item}</span>
              <Star size={16} className="fill-primary/40 text-primary/40" />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Stats */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats.map((stat, i) => (
              <StatItem key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding border-t border-line">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-4">What we do</p>
                <h2 className="max-w-xl font-heading text-3xl font-normal leading-[1.1] sm:text-4xl md:text-5xl">
                  Services that <span className="text-gradient">drive growth</span>
                </h2>
              </div>
              <p className="max-w-sm text-muted-foreground">
                End-to-end digital solutions crafted to elevate your brand and accelerate your business.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding border-t border-line">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="max-w-xl">
              <p className="eyebrow mb-4">How we work</p>
              <h2 className="font-heading text-3xl font-normal leading-[1.1] sm:text-4xl md:text-5xl">
                A process built for <span className="text-gradient">results</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                A proven workflow that turns your ideas into high-performing digital products.
              </p>
            </div>
          </ScrollReveal>
          <ProcessTimeline />
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-padding border-t border-line">
        <div className="container mx-auto grid items-center gap-14 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div>
              <p className="eyebrow mb-4">Why us</p>
              <h2 className="mb-6 font-heading text-3xl font-normal leading-[1.1] sm:text-4xl md:text-5xl">
                Why clients <span className="text-gradient">choose us</span>
              </h2>
              <p className="mb-9 max-w-md leading-relaxed text-muted-foreground">
                We don&rsquo;t just build websites — we build growth engines. Here&rsquo;s what sets us apart.
              </p>
              <Stagger className="grid gap-3.5" gap={0.07}>
                {whyChooseUs.map((item) => (
                  <StaggerItem key={item}>
                    <div className="group flex items-center gap-3">
                      <CheckCircle size={18} className="shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              {[
                { Icon: Users, value: "50+", label: "Global Clients" },
                { Icon: Briefcase, value: "200+", label: "Projects Done" },
                { Icon: Star, value: "5.0", label: "Avg. Rating" },
                { Icon: MessageSquare, value: "24/7", label: "Support" },
              ].map(({ Icon, value, label }, i) => (
                <TiltCard key={label} max={10} className={`group cursor-hover ${i % 2 === 1 ? "mt-6" : ""}`}>
                  <div className="rounded-2xl border border-line bg-card p-6 text-center transition-colors duration-300 hover:border-primary/30">
                    <Icon size={26} className="mx-auto mb-3 text-primary" />
                    <Counter value={value} className="block font-heading text-2xl font-bold tabular-nums" />
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding border-t border-line">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="mb-16 flex flex-col items-center gap-5 text-center">
              <p className="eyebrow mb-0">Testimonials</p>
              <h2 className="font-heading text-3xl font-normal leading-[1.1] sm:text-4xl md:text-5xl">
                What our <span className="text-gradient">clients say</span>
              </h2>
              <ReviewBadge />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.12}>
                <TiltCard max={5} className="group h-full cursor-hover">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-card p-7 transition-colors duration-300 hover:border-primary/30">
                    <span className="absolute right-5 top-3 font-heading text-6xl leading-none text-primary/10">&rdquo;</span>
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} size={15} className="fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="mb-6 text-sm italic leading-relaxed text-muted-foreground">{t.quote}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-heading font-bold text-primary">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-heading text-sm font-semibold">{t.name}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-t border-line">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-card p-10 md:p-16">
              <Spotlight size={520} opacity={0.18} />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
              <div className="relative z-10 max-w-xl">
                <h2 className="mb-4 font-heading text-2xl font-normal leading-[1.1] sm:text-3xl md:text-4xl">
                  Ready to transform your <span className="text-gradient">digital presence?</span>
                </h2>
                <p className="mb-8 text-muted-foreground">
                  Let&rsquo;s discuss how we can help you achieve your goals with a tailored digital strategy.
                </p>
                <Magnetic strength={22}>
                  <Link
                    to="/contact"
                    className="btn-pill"
                  >
                    Let&rsquo;s talk
                    <span className="btn-pill-arrow">
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
