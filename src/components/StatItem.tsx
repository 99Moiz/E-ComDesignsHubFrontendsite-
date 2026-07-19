import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Counter from "./motion/Counter";

interface StatItemProps {
  value: string;
  label: string;
  index: number;
}

const StatItem = ({ value, label, index }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative text-center"
    >
      <Counter
        value={value}
        className="block font-heading text-4xl md:text-6xl font-extrabold text-gradient mb-2 tabular-nums"
      />
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mx-auto mt-4 h-px w-8 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-primary/60" />
    </motion.div>
  );
};

export default StatItem;
