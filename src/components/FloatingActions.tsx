import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// TODO: replace with your real WhatsApp number (with country code, no + or spaces)
// and your real booking link (Calendly, Cal.com, etc.)
const WHATSAPP_NUMBER = "03020230467";
const BOOKING_URL = "https://calendly.com/your-team/intro-call";

const FloatingActions = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-end gap-3 max-w-[240px]"
          >
            {/* <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex items-center gap-3 rounded-full border border-line bg-card/80 px-4 py-3 text-sm font-medium shadow-lg shadow-black/10 transition duration-300 hover:border-primary/40"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <Phone size={16} />
              </span>
              <span>Book a free call</span>
            </a> */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex items-center gap-3 rounded-full border border-line bg-card/80 px-4 py-3 text-sm font-medium shadow-lg shadow-black/10 transition duration-300 hover:border-primary/40"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25D366]/15 text-[#25D366] transition-colors group-hover:bg-[#25D366]/20">
                <MessageCircle size={16} />
              </span>
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact options" : "Open contact options"}
        aria-expanded={open}
        className="glass grid h-14 w-14 place-items-center rounded-full border border-line bg-card/90 shadow-lg shadow-black/10 transition duration-300 hover:border-primary/40 hover:glow-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={20} className="text-foreground" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={20} className="text-primary" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default FloatingActions;
