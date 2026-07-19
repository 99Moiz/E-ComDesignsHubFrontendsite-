import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight, Sparkles } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";

const SESSION_KEY = "exitIntentShown";

/**
 * Watches for the mouse leaving the top of the viewport (classic exit-intent
 * signal on desktop) and shows a one-time offer. Skips mobile, where there's
 * no reliable equivalent gesture, and only fires once per browser session.
 */
const ExitIntentModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip touch devices

    let armed = false;
    const armTimer = setTimeout(() => (armed = true), 4000); // don't fire immediately on load

    const onMouseLeave = (e: MouseEvent) => {
      if (armed && e.clientY <= 0 && !sessionStorage.getItem(SESSION_KEY)) {
        setOpen(true);
        sessionStorage.setItem(SESSION_KEY, "1");
      }
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md overflow-hidden border-line bg-card">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-[80px]" />
        <DialogHeader className="relative">
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
            <Sparkles size={12} /> Before you go
          </span>
          <DialogTitle className="font-heading text-2xl font-normal">
            Get a free 20-minute strategy call
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            No pitch, no pressure — just a quick look at your site or idea and a few concrete suggestions you can use either way.
          </DialogDescription>
        </DialogHeader>
        <Magnetic strength={12}>
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-pill w-full justify-center">
            Claim my free call
            <span className="btn-pill-arrow">
              <ArrowRight size={15} />
            </span>
          </Link>
        </Magnetic>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
