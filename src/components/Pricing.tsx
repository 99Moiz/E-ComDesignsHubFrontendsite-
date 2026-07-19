import { Link } from "react-router-dom";
import { Check, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/motion/TiltCard";
import Magnetic from "@/components/motion/Magnetic";

const tiers = [
  {
    name: "Starter",
    price: "$799",
    period: "one-time",
    description: "A focused site for small businesses that need to look credible fast.",
    features: ["Up to 5 pages", "Responsive design", "Basic SEO setup", "2 rounds of revisions", "2 weeks delivery"],
    featured: false,
  },
  {
    name: "Growth",
    price: "$2,199",
    period: "one-time",
    description: "For businesses ready to invest in conversion-focused design and content.",
    features: [
      "Up to 12 pages",
      "Custom UI/UX design",
      "Advanced SEO + analytics",
      "CMS / blog setup",
      "4 rounds of revisions",
      "4–5 weeks delivery",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "quote",
    description: "Full-scale web apps, e-commerce, or multi-market platforms.",
    features: [
      "Unlimited pages",
      "Custom web application",
      "Dedicated project manager",
      "Priority support & SLA",
      "Ongoing maintenance option",
    ],
    featured: false,
  },
];

const Pricing = () => (
  <section className="section-padding border-t border-line">
    <div className="container mx-auto">
      <ScrollReveal>
        <div className="mb-16 text-center">
          <p className="eyebrow mb-4">Pricing</p>
          <h2 className="font-heading text-3xl font-normal leading-[1.1] sm:text-4xl md:text-5xl">
            Simple, <span className="text-gradient">transparent packages</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Every project is a little different — these are starting points. We'll scope an exact quote on a quick call.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {tiers.map((tier, i) => (
          <ScrollReveal key={tier.name} delay={i * 0.1}>
            <TiltCard max={tier.featured ? 0 : 6} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 transition-colors duration-300 ${
                  tier.featured
                    ? "border-primary/50 bg-primary/[0.04] glow-green-sm"
                    : "border-line bg-card hover:border-primary/30"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-primary-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="font-heading text-lg font-semibold">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-normal">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">/ {tier.period}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{tier.description}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Magnetic strength={12}>
                  <Link
                    to="/contact"
                    className={
                      tier.featured
                        ? "btn-pill mt-8 w-full justify-center"
                        : "btn-pill-outline mt-8 w-full justify-center"
                    }
                  >
                    Get started
                    <span className="btn-pill-arrow">
                      <ArrowUpRight size={15} />
                    </span>
                  </Link>
                </Magnetic>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
