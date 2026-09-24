import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface PageHeaderProps {
  title: string;
  intro?: ReactNode;
  crumb: string;
  children?: ReactNode;
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** Dark banner used at the top of every inner page, with a breadcrumb trail. */
const PageHeader = ({ title, intro, crumb, children }: PageHeaderProps) => {
  const reduced = usePrefersReducedMotion();
  const rise = (delay: number) =>
    reduced ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: EASE } };

  return (
    <section className="relative overflow-hidden bg-graphite text-white">
      <div className="container relative py-14 md:py-20">
        <motion.nav {...rise(0)} aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-white/60">
          <Link to="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-white/90">{crumb}</span>
        </motion.nav>
        <motion.h1
          {...rise(0.08)}
          className="max-w-3xl font-heading text-4xl font-semibold text-white sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p {...rise(0.16)} className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            {intro}
          </motion.p>
        )}
        {children}
      </div>
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-0 block h-1 origin-left bg-primary"
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
      />
    </section>
  );
};

export default PageHeader;
