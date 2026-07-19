import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CounterProps {
  value: string; // e.g. "200+", "99%", "5.0", "24/7"
  className?: string;
  duration?: number;
}

/**
 * Parses a stat string into a numeric target plus prefix/suffix and counts up
 * to it once in view. Non-numeric strings (e.g. "24/7") render as-is.
 */
const Counter = ({ value, className = "", duration = 1600 }: CounterProps) => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(value);

  // Used only to decide what to render before the effect kicks in —
  // NOT passed to useEffect's deps (that was the bug: a new array
  // reference every render kept re-triggering and restarting the RAF loop).
  const isNumeric = /^\D*\d+(?:\.\d+)?.*$/.test(value);

  useEffect(() => {
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    if (reduced) {
      setDisplay(value);
      return;
    }

    if (!inView) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = (target * eased).toFixed(decimals);
      setDisplay(`${prefix}${current}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {isNumeric ? display : value}
    </span>
  );
};

export default Counter;