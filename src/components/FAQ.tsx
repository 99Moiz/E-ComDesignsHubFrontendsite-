import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most marketing sites take 2–5 weeks from kickoff to launch depending on scope. Custom web apps or e-commerce builds usually run 6–10 weeks. We'll give you a firm timeline after a short discovery call.",
  },
  {
    q: "What's included in the price?",
    a: "Design, development, responsive testing across devices, basic SEO setup, and a set number of revision rounds (varies by package). Hosting, domain, and premium plugins/licenses are billed separately at cost.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes — we offer monthly maintenance retainers that cover updates, backups, security monitoring, and small content changes, plus priority turnaround if something breaks.",
  },
  {
    q: "Can you work with our existing brand guidelines?",
    a: "Absolutely. If you already have a brand system (colors, type, logo usage), we design within it. If not, we can put together a lightweight brand kit as part of the project.",
  },
  {
    q: "What if I need changes after the project is delivered?",
    a: "Every package includes a defined number of revision rounds during the build. After delivery, small tweaks are covered under a support retainer, or billed hourly for one-off requests.",
  },
];

const FAQ = () => (
  <section className="section-padding border-t border-line">
    <div className="container mx-auto max-w-3xl">
      <ScrollReveal>
        <div className="mb-12 text-center">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="font-heading text-3xl font-normal leading-[1.1] sm:text-4xl md:text-5xl">
            Questions, <span className="text-gradient">answered</span>
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`} className="border-line">
              <AccordionTrigger className="text-left font-heading text-base font-medium hover:text-primary hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </div>
  </section>
);

export default FAQ;
