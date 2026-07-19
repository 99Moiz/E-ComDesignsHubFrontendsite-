import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Premium loading sequence: brand mark and wordmark rise into view behind a
 * mask while a monospace counter climbs 0 → 100, then the whole screen lifts
 * away as two panels. Total ~2s.
 */
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 450);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* exit curtains */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-background"
        initial={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
        initial={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="relative flex flex-col items-center">
        <motion.img
          src="/images/logo.jpeg"
          alt="E-ComDesignsHub"
          className="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/10 shadow-2xl"
          initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="mt-6 overflow-hidden">
          <motion.p
            className="font-heading font-bold text-2xl tracking-tight text-foreground"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            e&#8209;com<span className="text-primary">designs</span>hub
          </motion.p>
        </div>

        <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 flex w-56 items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Loading</span>
          <span className="tabular-nums text-foreground">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
