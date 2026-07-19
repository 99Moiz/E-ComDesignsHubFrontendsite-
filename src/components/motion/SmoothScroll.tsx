import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

let lenisInstance: Lenis | null = null;

/** Programmatic scroll that routes through Lenis when available. */
export function scrollTo(target: number | string | HTMLElement, opts?: { offset?: number; immediate?: boolean }) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target as never, { offset: opts?.offset ?? 0, immediate: opts?.immediate });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: opts?.immediate ? "auto" : "smooth" });
  }
}

export function stopLenis() {
  lenisInstance?.stop();
}
export function startLenis() {
  lenisInstance?.start();
}

/**
 * Wraps the app in Lenis-driven inertial scrolling. Falls back to native
 * scrolling when the user prefers reduced motion.
 */
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });
    lenisInstance = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reduced]);

  return <>{children}</>;
};

export default SmoothScroll;
