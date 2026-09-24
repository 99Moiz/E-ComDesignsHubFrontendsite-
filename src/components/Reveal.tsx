import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, animate, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px the element travels upward while fading in */
  y?: number;
  as?: "div" | "section" | "li" | "article";
  id?: string;
}

/** Fades and lifts content in once, when it scrolls into view. */
export const Reveal = ({ children, className, delay = 0, y = 24, as = "div", id }: RevealProps) => {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    const Tag = as;
    return <Tag id={id} className={className}>{children}</Tag>;
  }
  const M = motion[as];
  return (
    <M
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </M>
  );
};

const groupVariants = (stagger: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

interface GroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol" | "dl";
}

/** Container whose RevealItem children animate in one after another. */
export const RevealGroup = ({ children, className, stagger = 0.08, as = "div" }: GroupProps) => {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  const M = motion[as];
  return (
    <M
      className={className}
      variants={groupVariants(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </M>
  );
};

interface ItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}

export const RevealItem = ({ children, className, as = "div" }: ItemProps) => {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  const M = motion[as];
  return (
    <M className={className} variants={itemVariants}>
      {children}
    </M>
  );
};

/** Counts a figure like "200+" or "99%" up from zero when it scrolls into view. */
export const CountUp = ({ value, className }: { value: string; className?: string }) => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const match = value.match(/^(\D*)([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;
  const [display, setDisplay] = useState(reduced || !match ? value : `${match[1]}0${match[3]}`);

  useEffect(() => {
    if (!inView || reduced || !match) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setDisplay(`${match[1]}${v.toFixed(decimals)}${match[3]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {display}
    </span>
  );
};
