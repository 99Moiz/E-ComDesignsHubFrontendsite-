import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Magnetic from "./motion/Magnetic";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 12);
    // hide when scrolling down past the header, reveal on scroll up
    if (latest > prev && latest > 220 && !isOpen) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -110 }}
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,box-shadow] duration-300 ${
        scrolled ? "glass shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]" : "bg-transparent"
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between px-4 transition-all duration-300 ${
          scrolled ? "h-16 md:h-[68px]" : "h-[76px] md:h-24"
        }`}
      >
        <Link to="/" className="group flex items-center gap-2.5 shrink-0">
          <div className="relative">
            <img
              src="/images/logo.jpeg"
              alt="E-ComDesignsHub"
              className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background animate-pulse-glow" />
          </div>
          <span className="font-heading font-bold text-base md:text-lg text-foreground tracking-tight">
            e&#8209;com<span className="text-primary">designs</span>hub
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 rounded-full border border-line bg-secondary/30 p-1">
          {navLinks.map((link, i) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`group relative px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-primary glow-green-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="font-mono text-[9px] opacity-50 group-hover:opacity-90 transition-opacity">
                    0{i + 1}
                  </span>
                  <span className="nav-swipe">
                    <span className="nav-swipe-inner">
                      <span>{link.name}</span>
                      <span>{link.name}</span>
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center">
          <Magnetic strength={16}>
            <Link to="/contact" className="btn-pill">
              Get Started
              <span className="btn-pill-arrow">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-10 text-foreground p-2 rounded-lg hover:bg-secondary/60 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="block">
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="block">
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden glass border-t border-line overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1.5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-colors ${
                      location.pathname === link.path
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-50">0{i + 1}</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" className="btn-pill justify-center mt-2">
                Get Started
                <span className="btn-pill-arrow">
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
