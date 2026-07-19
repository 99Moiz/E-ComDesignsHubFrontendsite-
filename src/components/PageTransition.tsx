import { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Per-route enter/exit choreography. New page rises and un-blurs while a thin
 * emerald sweep passes over the top edge. Used with AnimatePresence keyed on
 * the pathname. Static for reduced-motion users.
 */
const PageTransition = ({ children }: { children: ReactNode }) => {
  const reduced = usePrefersReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[65] h-[3px] origin-left bg-gradient-to-r from-primary via-accent to-primary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      />
      {children}
    </motion.div>
  );
};

export default PageTransition;
