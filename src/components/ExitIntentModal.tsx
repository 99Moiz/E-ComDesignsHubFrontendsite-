import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";

const SESSION_KEY = "exitIntentShown";

/**
 * Watches for the mouse leaving the top of the viewport (classic exit-intent
 * signal on desktop) and shows a one-time offer. Skips touch devices and only
 * fires once per browser session.
 */
const ExitIntentModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(SESSION_KEY);
    } catch {
      /* storage unavailable */
    }
    if (seen || window.matchMedia("(pointer: coarse)").matches) return;

    let armed = false;
    const armTimer = setTimeout(() => (armed = true), 8000);

    const onMouseLeave = (e: MouseEvent) => {
      if (!armed || e.clientY > 0) return;
      setOpen(true);
      armed = false;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
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
      <DialogContent className="max-w-md gap-0 overflow-hidden rounded-md border-0 border-t-4 border-t-primary p-0">
        <DialogHeader className="space-y-3 p-8 text-left">
          <DialogTitle className="font-heading text-3xl font-semibold">Get a free 20-minute strategy call</DialogTitle>
          <DialogDescription className="text-[1rem] leading-relaxed text-muted-foreground">
            No pitch and no pressure. We'll look at your site or idea and give you a few concrete suggestions you can
            use either way.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 border-t border-line bg-mist p-6 sm:flex-row">
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-dark flex-1">
            Book my free call <ArrowRight size={16} />
          </Link>
          <button onClick={() => setOpen(false)} className="btn-outline">
            No thanks
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
