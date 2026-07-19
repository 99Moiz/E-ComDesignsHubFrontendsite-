import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface SpotlightProps {
  className?: string;
  /** hsl triplet reference, e.g. "var(--primary)" */
  color?: string;
  size?: number;
  opacity?: number;
}

/**
 * A soft radial light that follows the cursor within its parent. The parent
 * must be `position: relative; overflow: hidden`. Purely decorative; it fades
 * out when the pointer leaves and is skipped for reduced-motion users.
 */
const Spotlight = ({
  className = "",
  color = "var(--primary)",
  size = 520,
  opacity = 0.14,
}: SpotlightProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    let raf = 0;
    const target = { x: 0.5, y: 0.3 };
    const current = { x: 0.5, y: 0.3 };

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = (e.clientY - rect.top) / rect.height;
    };
    const onEnter = () => (el.style.opacity = "1");
    const onLeave = () => (el.style.opacity = "0");

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      el.style.background = `radial-gradient(${size}px circle at ${current.x * 100}% ${current.y * 100}%, hsl(${color} / ${opacity}), transparent 60%)`;
      raf = requestAnimationFrame(tick);
    };

    parent.addEventListener("mousemove", onMove, { passive: true });
    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, color, size, opacity]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${className}`}
      style={{ opacity: 0 }}
    />
  );
};

export default Spotlight;
