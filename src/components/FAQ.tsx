import { Reveal } from "@/components/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    a: "Yes. We offer monthly maintenance retainers that cover updates, backups, security monitoring, and small content changes, plus priority turnaround if something breaks.",
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
  <section className="section">
    <div className="container grid gap-10 lg:grid-cols-12">
      <Reveal className="lg:col-span-4">
        <h2 className="heading-bar font-heading text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-muted-foreground">Can't find what you're looking for? Send us a message and we'll answer it directly.</p>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-8">
      <Accordion type="single" collapsible>
        {faqs.map((item, i) => (
          <AccordionItem key={item.q} value={`item-${i}`} className="border-line">
            <AccordionTrigger className="py-5 text-left font-body text-[1.05rem] font-semibold hover:text-moss hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-[1rem] leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </Reveal>
    </div>
  </section>
);

export default FAQ;
