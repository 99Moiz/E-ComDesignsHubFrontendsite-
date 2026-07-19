import { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TextRevealProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** wrap specific words in the accent treatment */
  highlight?: string[];
}

/**
 * Reveals a headline word-by-word behind a clipping mask, each word rising
 * into place. Reduced-motion users get the text immediately with no mask.
 */
const TextReveal = ({
  text,
  as = "span",
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.045,
  once = true,
  highlight = [],
}: TextRevealProps) => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-12% 0px" });
  const words = text.split(" ");
  const Tag = motion[as as "span"] as typeof motion.span;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  if (reduced) {
    return (
      <Tag ref={ref} className={className}>
        {words.map((w, i) => {
          const hot = highlight.includes(w.replace(/[.,!?]/g, ""));
          return (
            <span key={i} className={hot ? "text-gradient" : wordClassName}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className}>
      <motion.span variants={container} initial="hidden" animate={inView ? "show" : "hidden"} style={{ display: "inline" }}>
        {words.map((w, i) => {
          const hot = highlight.includes(w.replace(/[.,!?]/g, ""));
          return (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom"
              style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
            >
              <motion.span
                variants={word}
                className={`inline-block ${hot ? "text-gradient" : wordClassName}`}
              >
                {w}
                {i < words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
};

export default TextReveal;
