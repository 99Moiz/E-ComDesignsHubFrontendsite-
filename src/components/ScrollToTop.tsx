import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { scrollTo } from "./motion/SmoothScroll";

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== "POP") {
      // Reset through Lenis when active, else native. Delay one frame so the
      // incoming page has mounted before we jump to the top.
      requestAnimationFrame(() => {
        scrollTo(0, { immediate: true });
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    }
  }, [pathname, navType]);

  return null;
};
