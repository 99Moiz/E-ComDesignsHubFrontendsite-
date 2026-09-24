import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { FURSONA, SITE, services, serviceGroups } from "@/lib/site";
import { blogPosts } from "@/data/blog";

const links = [
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Insights", path: "/blog" },
  { name: "Careers", path: "/careers" },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface MenuProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  active: boolean;
}

/** Full-width services mega menu: four practice columns plus a featured article. */
const ServicesMenu = ({ open, setOpen, active }: MenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>();
  const featured = blogPosts[0];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, setOpen]);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <div ref={ref} className="flex h-full" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        className="nav-link"
        data-active={active || open}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
      >
        Services
        <ChevronDown size={15} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute inset-x-0 top-full border-t border-line bg-white text-foreground shadow-[0_28px_50px_-24px_rgba(27,31,36,0.3)]"
          >
            <div className="container grid grid-cols-12 gap-8 py-10">
              <div className="col-span-9 grid grid-cols-4 gap-8">
                {serviceGroups.map((g, gi) => (
                  <motion.div
                    key={g.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 * gi, ease: EASE }}
                  >
                    <p className="border-b-2 border-primary pb-3 font-heading text-xl font-semibold">{g.title}</p>
                    <ul className="mt-4 space-y-1">
                      {g.items.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to={`/services#${s.slug}`}
                            className="group -mx-2 flex items-center justify-between rounded px-2 py-2 text-[0.95rem] text-foreground/80 transition-colors hover:bg-mist hover:text-foreground"
                          >
                            {s.title}
                            <ArrowRight
                              size={14}
                              className="-translate-x-1 text-moss opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
                <div className="col-span-4 flex items-center justify-between border-t border-line pt-5">
                  <p className="text-[0.95rem] text-muted-foreground">
                    Not sure where to start? We'll help you scope it in a free 20-minute call.
                  </p>
                  <Link to="/services" className="link-arrow shrink-0 text-[0.95rem]">
                    Explore all services <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {featured && (
                <Link
                  to={`/blog/${featured.slug}`}
                  className="group col-span-3 flex flex-col justify-between rounded-md bg-graphite p-6 text-white transition-colors hover:bg-foreground"
                >
                  <div>
                    <p className="text-sm font-semibold text-primary">{featured.category}</p>
                    <p className="mt-3 font-heading text-2xl font-semibold leading-snug">{featured.title}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-primary">
                    Read the article
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface NavbarProps {
  /** Transparent over a dark hero until the page is scrolled */
  overlay?: boolean;
}

const Navbar = ({ overlay = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMenuOpen(false);
    setMobileServices(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const transparent = overlay && !scrolled && !menuOpen && !isOpen;

  return (
    <header
      className={`${overlay ? "fixed" : "sticky"} inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        transparent
          ? "header-overlay border-b border-white/10 bg-transparent"
          : "border-b border-line bg-white shadow-[0_6px_24px_-14px_rgba(27,31,36,0.25)]"
      }`}
    >
      <div className="container flex h-[76px] items-center justify-between gap-6">
        <Logo tone={transparent ? "light" : "dark"} />

        <nav aria-label="Main" className="hidden h-full items-stretch gap-8 lg:flex">
          <ServicesMenu open={menuOpen} setOpen={setMenuOpen} active={location.pathname.startsWith("/services")} />
          {links.map((l) => (
            <Link key={l.path} to={l.path} className="nav-link" data-active={location.pathname.startsWith(l.path)}>
              {l.name}
            </Link>
          ))}
          <a
            href={FURSONA.url}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            title={`${FURSONA.name} (opens in a new tab)`}
          >
            {FURSONA.short}
            <ArrowUpRight size={14} className={transparent ? "text-primary" : "text-moss"} />
          </a>
        </nav>

        <div className="hidden lg:block">
          <Link to="/contact" className={`${transparent ? "btn-primary" : "btn-dark"} !px-5 !py-2.5`}>
            Get in touch
          </Link>
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className={`-mr-2 rounded-md p-2 transition-colors lg:hidden ${
            transparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-mist"
          }`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-0 bottom-0 top-[77px] overflow-y-auto border-t border-line bg-white lg:hidden"
          >
            <nav aria-label="Mobile" className="container flex flex-col py-4">
              <Link to="/" className="border-b border-line py-4 text-lg font-medium hover:text-moss">
                Home
              </Link>
              <button
                type="button"
                onClick={() => setMobileServices((v) => !v)}
                aria-expanded={mobileServices}
                className="flex items-center justify-between border-b border-line py-4 text-left text-lg font-medium hover:text-moss"
              >
                Services
                <ChevronDown size={20} className={`transition-transform ${mobileServices ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {mobileServices && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden border-b border-line bg-mist"
                  >
                    <div className="grid grid-cols-1 gap-1 px-3 py-3 sm:grid-cols-2">
                      <Link to="/services" className="rounded px-2 py-2 font-semibold text-moss">
                        All services
                      </Link>
                      {services.map((s) => (
                        <Link key={s.slug} to={`/services#${s.slug}`} className="rounded px-2 py-2 text-[0.95rem] hover:bg-white">
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {[...links, { name: "Contact", path: "/contact" }].map((l) => (
                <Link key={l.path} to={l.path} className="border-b border-line py-4 text-lg font-medium hover:text-moss">
                  {l.name}
                </Link>
              ))}

              <a
                href={FURSONA.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-b border-line py-4 text-lg font-medium hover:text-moss"
              >
                {FURSONA.name}
                <ArrowUpRight size={20} className="text-moss" />
              </a>

              <Link to="/contact" className="btn-dark mt-6 w-full">
                Get in touch
              </Link>
              <a href={`mailto:${SITE.inbox}`} className="mt-5 text-center text-sm text-muted-foreground">
                {SITE.email}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
