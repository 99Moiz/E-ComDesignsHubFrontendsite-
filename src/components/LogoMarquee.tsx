// Placeholder wordmarks. Swap these for real client/partner logos
// (SVG or PNG, about 120x32px) before launch.
const logos = ["Nova Retail", "Brightline", "Kestrel & Co", "Northfield", "Pulse Labs", "Vantage Group"];

const LogoMarquee = () => (
  <section aria-label="Clients" className="border-b border-line bg-white">
    <div className="container flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:gap-12">
      <p className="shrink-0 text-[0.95rem] font-medium text-muted-foreground">Trusted by growing brands</p>
      <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {/* The list is rendered twice so translating by -50% loops seamlessly */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {logos.map((name) => (
                <li
                  key={name}
                  className="whitespace-nowrap px-10 font-heading text-xl font-semibold text-foreground/40 transition-colors duration-200 hover:text-foreground"
                >
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default LogoMarquee;
