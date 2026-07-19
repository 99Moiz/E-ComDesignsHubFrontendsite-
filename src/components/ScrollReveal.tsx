import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
  once?: boolean;
  distance?: number;
}

const directionMap = {
  up: (d: number) => ({ y: d, x: 0 }),
  down: (d: number) => ({ y: -d, x: 0 }),
  left: (d: number) => ({ y: 0, x: -d }),
  right: (d: number) => ({ y: 0, x: d }),
};

/**
 * Reveals content as it scrolls into view — translate + blur + slight scale,
 * on a refined ease. Honours reduced-motion by rendering statically.
 */
const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
  once = true,
  distance = 44,
}: ScrollRevealProps) => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-70px" });
  const offset = directionMap[direction](distance);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset.x, y: offset.y, filter: "blur(8px)", scale: 0.98 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
