import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface FloatingShapesProps {
  className?: string;
  variant?: "emerald" | "gold" | "mixed";
}

/**
 * Soft blurred orbs plus a couple of thin ring outlines that drift on their
 * own and subtly parallax toward the pointer. Decorative only.
 */
const FloatingShapes = ({ className = "", variant = "mixed" }: FloatingShapesProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const tick = () => {
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      el.querySelectorAll<HTMLElement>("[data-depth]").forEach((node) => {
        const depth = parseFloat(node.dataset.depth || "0");
        node.style.transform = `translate3d(${current.x * depth * 26}px, ${current.y * depth * 26}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduced]);

  const primary = variant === "gold" ? "hsl(var(--accent)/0.12)" : "hsl(var(--primary)/0.14)";
  const secondary = variant === "emerald" ? "hsl(var(--primary)/0.10)" : "hsl(var(--accent)/0.10)";

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        data-depth="1"
        className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-[90px] animate-float-slow"
        style={{ background: primary }}
      />
      <div
        data-depth="0.6"
        className="absolute top-1/2 -right-20 h-80 w-80 rounded-full blur-[110px] animate-float"
        style={{ background: secondary }}
      />
      <div
        data-depth="1.4"
        className="absolute bottom-10 left-1/3 h-40 w-40 rounded-full border border-primary/15 animate-float-slow"
      />
      <div
        data-depth="0.9"
        className="absolute top-24 right-1/4 h-24 w-24 rounded-full border border-accent/15 animate-float"
      />
    </div>
  );
};

export default FloatingShapes;
