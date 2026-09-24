import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/** Resets scroll on route change, or scrolls to #hash targets once they render. */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (hash) {
      let tries = 0;
      const find = () => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else if (tries++ < 20) setTimeout(find, 50);
      };
      find();
      return;
    }
    if (navType !== "POP") window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, navType]);

  return null;
};
