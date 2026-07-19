import { Link } from "react-router-dom";
import { Mail, MapPin, Instagram, Facebook, ArrowUp, ArrowUpRight } from "lucide-react";
import Magnetic from "./motion/Magnetic";
import ScrollReveal from "./ScrollReveal";
import { scrollTo } from "./motion/SmoothScroll";

const Footer = () => {
  const scrollTop = () => scrollTo(0);

  return (
    <footer className="relative border-t border-line bg-card/40 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[40rem] h-80 bg-primary/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Big CTA band */}
      <div className="container mx-auto pt-20 md:pt-28 relative">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-16 border-b border-line">
            <div>
              <p className="eyebrow mb-4">Let&rsquo;s collaborate</p>
              <h2 className="font-heading font-normal leading-[1.05] text-3xl sm:text-4xl md:text-5xl tracking-tight">
                Have an idea?
                <br />
                <span className="text-gradient">Let&rsquo;s make it real.</span>
              </h2>
            </div>
            <Magnetic strength={20}>
              <Link
                to="/contact"
                className="btn-pill"
              >
                Start a project
                <span className="btn-pill-arrow">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </Magnetic>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo.jpeg" alt="E-ComDesignsHub" className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/10" />
              <span className="font-heading font-bold text-lg text-foreground">
                E&#8209;com<span className="text-primary">designs</span>hub
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Artistry and strategy in every design. Crafting premium digital experiences that drive results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">Navigate</h4>
            <div className="flex flex-col gap-2.5">
              {["Home", "About", "Services", "Portfolio", "Careers", "Contact"].map((link) => (
                <Link
                  key={link}
                  to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className="link-underline w-fit text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">Services</h4>
            <div className="flex flex-col gap-2.5">
              {["Web Development", "UI/UX Design", "SEO Optimization", "Digital Marketing", "Brand Strategy"].map((s) => (
                <span key={s} className="text-sm text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:support@ecomdesignshub.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail size={14} className="text-primary" />
                support@ecomdesignshub.com
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
                <span>98 E Branch RD, Allentown, New Jersey 08501, USA</span>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/ecom_design_hub?igsh=MXI0Y3NwbnM0NzFzbw==", label: "Instagram" },
                { Icon: Facebook, href: "https://www.facebook.com/share/1DVHQF1u71/", label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <Magnetic key={label} strength={12}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        <div className="pb-10 pt-2 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 E-ComDesignsHub. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <span key={item} className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                {item}
              </span>
            ))}
            <Magnetic strength={12}>
              <button
                onClick={scrollTop}
                aria-label="Back to top"
                className="w-10 h-10 rounded-xl border border-line flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <ArrowUp size={15} />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
