import { useEffect, useState } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` setting and keeps it live.
 * Every non-essential animation in the app checks this so motion can be
 * disabled gracefully.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
