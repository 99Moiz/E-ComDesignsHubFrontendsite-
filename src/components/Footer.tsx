import { Link } from "react-router-dom";
import { Mail, MapPin, Instagram, Facebook, ArrowUp, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { FURSONA, SITE, services } from "@/lib/site";

const company = [
  { name: "About us", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];

const FooterHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-5 font-heading text-lg font-semibold text-white">{children}</h2>
);

const Footer = ({ hideCta = false }: { hideCta?: boolean }) => {
  return (
    <footer>
      {/* Call to action strip */}
      {!hideCta && (
      <div className="bg-primary">
        <div className="container flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mt-2 text-foreground/80">
              Tell us what you're building. We reply to every enquiry within one business day.
            </p>
          </div>
          <Link to="/contact" className="btn-dark shrink-0">
            Start a project <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      )}

      <div className={`bg-graphite text-white/70 ${hideCta ? "border-t border-graphite-line" : ""}`}>
        <div className="container grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed">
              Artistry and strategy in every design. We design, build and grow websites and digital products for
              businesses worldwide.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { Icon: Instagram, href: SITE.instagram, label: "Instagram" },
                { Icon: Facebook, href: SITE.facebook, label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-md border border-graphite-line text-white/80 transition-colors hover:border-primary hover:bg-primary hover:text-foreground"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-3 text-[0.95rem]">
              {company.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="transition-colors hover:text-primary">
                    {l.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={FURSONA.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  {FURSONA.name} <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <FooterHeading>Services</FooterHeading>
            <ul className="space-y-3 text-[0.95rem]">
              {services.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services#${s.slug}`} className="transition-colors hover:text-primary">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Get in touch</FooterHeading>
            <ul className="space-y-4 text-[0.95rem]">
              <li>
                <a href={`mailto:${SITE.inbox}`} className="flex items-start gap-3 transition-colors hover:text-primary">
                  <Mail size={17} className="mt-1 shrink-0 text-primary" />
                  <span className="break-all">{SITE.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={17} className="mt-1 shrink-0 text-primary" />
                <span>{SITE.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-graphite-line">
          <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm md:flex-row">
            <p>© {new Date().getFullYear()} E-ComDesignsHub. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                className="grid h-9 w-9 place-items-center rounded-md border border-graphite-line transition-colors hover:border-primary hover:text-primary"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
