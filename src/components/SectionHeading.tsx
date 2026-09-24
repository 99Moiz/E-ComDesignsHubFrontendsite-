import { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  title: ReactNode;
  intro?: ReactNode;
  /** Places the intro to the right of the title on wide screens */
  split?: boolean;
  align?: "left" | "center";
  className?: string;
  tone?: "dark" | "light";
}

const SectionHeading = ({ title, intro, split, align = "left", className = "", tone = "dark" }: SectionHeadingProps) => {
  const titleCls = `font-heading text-3xl font-semibold sm:text-4xl md:text-[2.75rem] ${
    tone === "light" ? "text-white" : "text-foreground"
  }`;
  const introCls = `text-[1.05rem] leading-relaxed ${tone === "light" ? "text-white/70" : "text-muted-foreground"}`;

  if (split) {
    return (
      <Reveal className={`mb-12 grid gap-6 md:mb-14 md:grid-cols-2 md:items-end md:gap-12 ${className}`}>
        <h2 className={`heading-bar max-w-xl ${titleCls}`}>{title}</h2>
        {intro && <p className={`max-w-lg ${introCls}`}>{intro}</p>}
      </Reveal>
    );
  }

  return (
    <Reveal className={`mb-12 md:mb-14 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      <h2 className={`${align === "center" ? "" : "heading-bar"} ${titleCls}`}>{title}</h2>
      {intro && <p className={`mt-4 ${introCls}`}>{intro}</p>}
    </Reveal>
  );
};

export default SectionHeading;
