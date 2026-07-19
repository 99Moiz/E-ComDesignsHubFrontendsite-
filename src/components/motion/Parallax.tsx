import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** positive moves slower/up, negative moves down; px of travel across viewport */
  speed?: number;
}

/**
 * Translates its children vertically as it passes through the viewport,
 * driven by document scroll for a depth effect. Static under reduced motion.
 */
const Parallax = ({ children, className = "", speed = 60 }: ParallaxProps) => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
};

export default Parallax;
