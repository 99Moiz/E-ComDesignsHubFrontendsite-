import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A two-part cursor: a crisp dot that tracks the pointer 1:1 and a softer
 * ring that trails with spring physics. The ring expands and the dot fades
 * when hovering interactive elements. Disabled on touch devices and when the
 * user prefers reduced motion.
 */
const CustomCursor = () => {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [hidden, setHidden] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 320, damping: 28, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 320, damping: 28, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !finePointer) {
      setEnabled(false);
      document.body.classList.remove("has-custom-cursor");
      return;
    }
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      const el = e.target as HTMLElement;
      const interactive = el.closest(
        "a, button, [role='button'], input, textarea, select, label, .cursor-hover"
      );
      setHovering(!!interactive);
    };
    const enter = () => setHidden(false);
    const leave = () => setHidden(true);
    const mdown = () => setDown(true);
    const mup = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", mdown);
    window.addEventListener("mouseup", mup);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", mdown);
      window.removeEventListener("mouseup", mup);
    };
  }, [reduced, dotX, dotY]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9998]" style={{ opacity: hidden ? 0 : 1 }}>
      {/* trailing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/70"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          opacity: hovering ? 0.9 : 0.5,
          backgroundColor: hovering ? "hsl(var(--primary) / 0.08)" : "hsl(var(--primary) / 0)",
          scale: down ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      {/* precise dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 6 : 7,
          height: hovering ? 6 : 7,
          opacity: hovering ? 0.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </div>
  );
};

export default CustomCursor;
