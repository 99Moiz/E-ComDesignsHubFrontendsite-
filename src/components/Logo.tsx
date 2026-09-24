import { Link } from "react-router-dom";

interface LogoProps {
  tone?: "dark" | "light";
  className?: string;
}

/** Brand mark + wordmark. `light` is for dark backgrounds (footer). */
const Logo = ({ tone = "dark", className = "" }: LogoProps) => (
  <Link to="/" className={`flex shrink-0 items-center gap-3 ${className}`} aria-label="E-ComDesignsHub home">
    <img
      src="/images/logo.jpeg"
      alt=""
      width={44}
      height={44}
      className="h-11 w-11 rounded-md object-cover"
    />
    <span
      className={`font-heading text-[1.35rem] font-semibold leading-none ${
        tone === "light" ? "text-white" : "text-foreground"
      }`}
    >
      E&#8209;Com<span className={tone === "light" ? "text-primary" : "text-moss"}>Designs</span>Hub
    </span>
  </Link>
);

export default Logo;
