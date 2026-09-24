import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import { StoreMockup, DesignMockup, GrowthMockup } from "./HeroMockups";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const DURATION = 7000; // ms per slide
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const slides = [
  {
    tab: "Web & e-commerce",
    title: "Websites and online stores built to sell.",
    body: "Custom websites, web apps and e-commerce stores that load fast, rank well and turn visitors into customers.",
    cta: { label: "Start a project", to: "/contact" },
    Visual: StoreMockup,
  },
  {
    tab: "Design & branding",
    title: "Brands and interfaces people remember.",
    body: "UI/UX design, brand identity and 2D/3D animation that make your business look as good as it works.",
    cta: { label: "Explore design services", to: "/services#ui-ux-design" },
    Visual: DesignMockup,
  },
  {
    tab: "Growth marketing",
    title: "Marketing that turns traffic into revenue.",
    body: "SEO, paid campaigns and analytics that bring qualified customers to your site and show you what's working.",
    cta: { label: "See how we grow brands", to: "/services#seo" },
    Visual: GrowthMockup,
  },
];

/**
 * Full-screen home hero. Three slides rotate automatically; the tabs along the bottom
 * show progress, can be clicked, and the rotation pauses on hover or with the pause button.
 */
const HeroSlider = () => {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const progress = useMotionValue(0);
  const elapsed = useRef(0);

  const paused = hovered || stopped || reduced;

  const goTo = useCallback(
    (i: number) => {
      elapsed.current = 0;
      progress.set(0);
      setIndex((i + slides.length) % slides.length);
    },
    [progress]
  );

  useEffect(() => {
    if (paused) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      const p = Math.min(1, elapsed.current / DURATION);
      progress.set(p);
      if (p >= 1) goTo(index + 1);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, index, goTo, progress]);

  const slide = slides[index];
  const Visual = slide.Visual;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[hsl(210_16%_9%)] text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Brand stroke from the logo, running down the left edge */}
      <span aria-hidden className="absolute bottom-0 left-0 top-0 hidden w-1.5 bg-primary lg:block" />

      <div className="container relative flex flex-1 items-center pb-10 pt-[120px] lg:pt-[96px]">
        <div className="grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -18 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <p className="flex items-center gap-3 text-[0.95rem] font-semibold text-primary">
                  <span className="h-0.5 w-8 bg-primary" />
                  {slide.tab}
                </p>
                <h1 className="mt-6 font-heading text-[2.8rem] font-semibold leading-[1.02] text-white sm:text-6xl xl:text-[4.75rem]">
                  {slide.title}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{slide.body}</p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link to={slide.cta.to} className="btn-primary group">
                    {slide.cta.label}
                    <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link to="/portfolio" className="btn-outline-light">
                    View our work
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden lg:col-span-6 lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={reduced ? false : { opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -30 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="mx-auto max-w-[600px] pl-6"
              >
                <Visual />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide tabs with progress */}
      <div className="relative border-t border-white/10">
        <div className="container flex items-stretch">
          <button
            onClick={() => setStopped((v) => !v)}
            aria-label={stopped ? "Play slideshow" : "Pause slideshow"}
            className="-ml-3 mr-4 hidden w-10 items-center justify-center text-white/50 transition-colors hover:text-white sm:flex"
          >
            {stopped ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <div role="tablist" aria-label="Choose a slide" className="grid flex-1 grid-cols-3">
            {slides.map((s, i) => (
              <button
                key={s.tab}
                role="tab"
                aria-selected={i === index}
                onClick={() => goTo(i)}
                className={`group relative py-5 pr-4 text-left transition-colors ${
                  i === index ? "text-white" : "text-white/45 hover:text-white/80"
                }`}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 bg-white/10" />
                {i === index && (
                  <motion.span
                    className="absolute left-0 top-0 h-0.5 w-full origin-left bg-primary"
                    style={{ scaleX: reduced ? 1 : progress }}
                  />
                )}
                <span className="block text-xs text-white/40">{`0${i + 1}`}</span>
                <span className="mt-1 block text-sm font-semibold sm:text-[0.95rem]">{s.tab}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
