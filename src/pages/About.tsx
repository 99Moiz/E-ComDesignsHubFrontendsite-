import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Eye, Heart, Award, Users, Lightbulb } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import TeamSection from "@/components/TeamSection";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/motion/TextReveal";
import Spotlight from "@/components/motion/Spotlight";
import FloatingShapes from "@/components/motion/FloatingShapes";
import Parallax from "@/components/motion/Parallax";
import TiltCard from "@/components/motion/TiltCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const values = [
  { icon: <Lightbulb size={22} />, title: "Innovation", description: "Pushing boundaries with creative solutions and emerging technologies." },
  { icon: <Users size={22} />, title: "Collaboration", description: "Working closely with clients as true partners in every project." },
  { icon: <Award size={22} />, title: "Excellence", description: "Delivering premium quality in every pixel and line of code." },
  { icon: <Heart size={22} />, title: "Passion", description: "Driven by genuine love for craft and meaningful digital work." },
];

const timeline = [
  { year: "2018", title: "Founded", description: "Started with a vision to create exceptional digital experiences." },
  { year: "2019", title: "First Major Client", description: "Delivered a breakthrough project that set our standard for quality." },
  { year: "2021", title: "Team Expansion", description: "Grew to 20+ talented professionals across design and engineering." },
  { year: "2023", title: "Global Reach", description: "Expanded services to clients across 15+ countries worldwide." },
  { year: "2025", title: "Industry Recognition", description: "Awarded for excellence in digital innovation and design." },
];

const Timeline = () => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 80%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl">
      <div className="absolute bottom-0 left-4 top-2 w-px bg-line md:left-1/2 md:-translate-x-px">
        <motion.div
          className="h-full w-full origin-top bg-gradient-to-b from-primary to-accent"
          style={reduced ? { scaleY: 1 } : { scaleY }}
        />
      </div>
      {timeline.map((item, i) => (
        <ScrollReveal key={item.year} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.05}>
          <div className={`relative pb-14 pl-12 last:pb-0 md:pl-0 ${i % 2 === 0 ? "md:pr-[55%]" : "md:pl-[55%]"}`}>
            <div className="absolute left-2 top-1.5 h-4 w-4 rounded-full border-2 border-background bg-primary glow-green-sm md:left-1/2 md:-translate-x-1/2" />
            <TiltCard max={5} className="group cursor-hover">
              <div className="rounded-xl border border-line bg-card p-5 transition-colors duration-300 hover:border-primary/30">
                <span className="font-mono text-sm font-bold text-primary">{item.year}</span>
                <h4 className="mt-1 font-heading font-semibold">{item.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </TiltCard>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
};

const About = () => {
  return (
    <Layout>
      <SEO
        title="About Us"
        description="Meet the team behind E-ComDesignsHub — a senior, hands-on studio building premium websites and digital experiences that drive real growth."
        path="/about"
      />
      {/* Hero */}
      <section className="relative overflow-hidden section-padding">
        <Spotlight size={560} opacity={0.13} />
        <FloatingShapes variant="mixed" />
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="container relative mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-6"
          >
            About us
          </motion.p>
          <h1 className="max-w-4xl font-heading text-3xl font-normal leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <TextReveal text="We're a team of" as="span" className="block" />
            <TextReveal text="digital craftsmen." as="span" className="block" highlight={["digital", "craftsmen."]} delay={0.12} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            E-ComDesignsHub is a premium digital agency dedicated to transforming brands through
            innovative web solutions, compelling design, and data-driven strategies.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding border-y border-line">
        <div className="container mx-auto grid gap-6 md:grid-cols-2">
          {[
            { Icon: Target, title: "Our Mission", tint: "primary", body: "To empower businesses with premium digital solutions that drive meaningful growth, foster engagement, and create lasting impressions in the digital landscape." },
            { Icon: Eye, title: "Our Vision", tint: "accent", body: "To be the most trusted digital agency globally, known for setting new standards of excellence in design, technology, and client partnership." },
          ].map(({ Icon, title, tint, body }, i) => (
            <ScrollReveal key={title} direction={i === 0 ? "left" : "right"}>
              <TiltCard max={5} className="group h-full cursor-hover">
                <div className="gradient-border h-full rounded-2xl bg-card p-8">
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${tint === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-semibold">{title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <p className="eyebrow mb-4">Our values</p>
              <h2 className="font-heading text-3xl font-normal leading-[1.1] sm:text-4xl md:text-5xl">
                What <span className="text-gradient">drives us</span>
              </h2>
            </div>
          </ScrollReveal>
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val, i) => (
              <StaggerItem key={val.title}>
                <TiltCard max={8} className={`group h-full cursor-hover ${i % 2 === 1 ? "lg:mt-8" : ""}`}>
                  <div className="h-full rounded-2xl border border-line bg-card p-6 transition-colors duration-300 hover:border-primary/30">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-shadow duration-300 group-hover:glow-green-sm">
                      {val.icon}
                    </div>
                    <h4 className="mb-2 font-heading font-semibold">{val.title}</h4>
                    <p className="text-sm text-muted-foreground">{val.description}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Big statement / parallax */}
      <section className="relative overflow-hidden border-y border-line section-padding">
        <div className="container mx-auto">
          <Parallax speed={40}>
            <ScrollReveal>
              <p className="mx-auto max-w-4xl text-center font-heading text-2xl font-bold leading-snug md:text-4xl">
                We treat every brand like our own — obsessing over the details that turn a good product
                into an <span className="text-gradient">unforgettable one.</span>
              </p>
            </ScrollReveal>
          </Parallax>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <p className="eyebrow mb-4">Our journey</p>
              <h2 className="font-heading text-3xl font-normal leading-[1.1] sm:text-4xl md:text-5xl">
                Growing <span className="text-gradient">together</span>
              </h2>
            </div>
          </ScrollReveal>
          <Timeline />
        </div>
      </section>

      {/* <TeamSection /> */}
    </Layout>
  );
};

export default About;
