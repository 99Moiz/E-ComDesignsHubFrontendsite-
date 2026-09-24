// Placeholder wordmarks. Swap these for real client/partner logos
// (SVG or PNG, about 120x32px) before launch.
const logos = ["Nova Retail", "Brightline", "Kestrel & Co", "Northfield", "Pulse Labs", "Vantage Group"];

const LogoMarquee = () => (
  <section aria-label="Clients" className="border-b border-line bg-white">
    <div className="container flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:gap-12">
      <p className="shrink-0 text-[0.95rem] font-medium text-muted-foreground">Trusted by growing brands</p>
      <ul className="grid flex-1 grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
        {logos.map((name) => (
          <li
            key={name}
            className="font-heading text-xl font-semibold text-foreground/40 transition-colors duration-200 hover:text-foreground"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default LogoMarquee;
