import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "./motion/TiltCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon, title, description, index }: ServiceCardProps) => {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 34, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard max={6} className="group h-full cursor-hover">
        <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-card p-7 md:p-8 transition-colors duration-300 hover:border-primary/30">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-shadow duration-300 group-hover:glow-green-sm">
                {icon}
              </div>
              <span className="font-mono text-xs text-muted-foreground/60">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              Learn more <ArrowUpRight size={15} />
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export default ServiceCard;
