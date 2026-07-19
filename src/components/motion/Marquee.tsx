import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  /** seconds for one full loop */
  speed?: number;
}

/**
 * Infinitely scrolling horizontal strip. Duplicates its children once and
 * translates -50% so the loop is seamless. Pauses on hover; static under
 * reduced motion via the global CSS override.
 */
const Marquee = ({ children, className = "", reverse = false, speed = 30 }: MarqueeProps) => {
  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div
        className="flex shrink-0 items-center gap-10 pr-10 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDirection: reverse ? "reverse" : "normal", animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 items-center gap-10 pr-10 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDirection: reverse ? "reverse" : "normal", animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
};

export default Marquee;
