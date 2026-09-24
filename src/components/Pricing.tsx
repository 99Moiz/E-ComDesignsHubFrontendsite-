import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/Reveal";

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
  <section className="section bg-mist">
    <div className="container">
      <SectionHeading
        align="center"
        title="Packages and pricing"
        intro="Every project is a little different, so treat these as starting points. We'll confirm an exact quote after a short call."
      />

      <RevealGroup stagger={0.12} className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <RevealItem
            key={tier.name}
            className={`flex flex-col rounded-md border bg-white p-8 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_-26px_rgba(27,31,36,0.4)] ${
              tier.featured ? "border-foreground border-t-4 border-t-primary" : "border-line hover:border-foreground/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl font-semibold">{tier.name}</h3>
              {tier.featured && (
                <span className="rounded bg-primary px-2.5 py-1 text-xs font-semibold text-foreground">Most popular</span>
              )}
            </div>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-heading text-5xl font-semibold">{tier.price}</span>
              <span className="text-sm text-muted-foreground">{tier.period}</span>
            </p>
            <p className="mt-3 text-muted-foreground">{tier.description}</p>

            <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check size={17} strokeWidth={2.5} className="mt-0.5 shrink-0 text-moss" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link to="/contact" className={`mt-8 w-full ${tier.featured ? "btn-primary" : "btn-outline"}`}>
              {tier.price === "Custom" ? "Request a quote" : `Choose ${tier.name}`}
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  </section>
);

export default Pricing;
