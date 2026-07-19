import Marquee from "@/components/motion/Marquee";

// Placeholder wordmarks — swap these for real client/partner logos
// (SVG or PNG, ~120x32px) before launch.
const logos = [
  "Nova Retail",
  "Brightline",
  "Kestrel & Co",
  "Northfield",
  "Pulse Labs",
  "Vantage Group",
  "Aster Digital",
  "Meridian",
];

const LogoMarquee = () => (
  <div className="border-y border-line py-8">
    <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
      Trusted by teams at
    </p>
    <Marquee speed={22}>
      {logos.map((name) => (
        <span
          key={name}
          className="mx-8 shrink-0 font-heading text-xl text-muted-foreground/50 transition-colors duration-300 hover:text-foreground/80"
        >
          {name}
        </span>
      ))}
    </Marquee>
  </div>
);

export default LogoMarquee;
