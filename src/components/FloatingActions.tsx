import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

/** WhatsApp shortcut, fixed bottom-right. Appears once the visitor scrolls past the hero. */
const FloatingActions = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-5 right-5 z-40 flex h-14 items-center overflow-hidden rounded-full bg-[#25D366] px-4 text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-[background-color,opacity,transform] duration-300 hover:bg-[#1EBE5A] md:bottom-8 md:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <MessageCircle size={24} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.95rem] font-semibold transition-[max-width,margin] duration-300 group-hover:ml-2 group-hover:max-w-[160px] group-focus-visible:ml-2 group-focus-visible:max-w-[160px]">
        Chat on WhatsApp
      </span>
    </a>
  );
};

export default FloatingActions;
