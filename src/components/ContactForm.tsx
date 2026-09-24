import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

interface ContactFormProps {
  /** Field ids must be unique if the form appears more than once */
  idPrefix?: string;
  tone?: "light" | "dark";
}

/** Project enquiry form. Sends the owner notification and the client auto-reply through EmailJS. */
const ContactForm = ({ idPrefix = "c", tone = "light" }: ContactFormProps) => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Owner mail
      await emailjs.send(
        "service_gu6hcdr",
        "template_668fmzq",
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
        "BCE3DhDXp2I-6C0Pe"
      );
      // Client auto reply
      await emailjs.send(
        "service_gu6hcdr",
        "template_2ifb2e8",
        { from_name: form.name, from_email: form.email, subject: form.subject },
        "BCE3DhDXp2I-6C0Pe"
      );
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  const dark = tone === "dark";
  const label = `field-label ${dark ? "!text-white" : ""}`;
  const input = `field-input ${dark ? "!border-graphite-line !bg-white/[0.04] !text-white placeholder:!text-white/40 focus:!border-primary focus:!ring-primary/20" : ""}`;
  const id = (k: string) => `${idPrefix}-${k}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={label}>Full name</label>
          <input id={id("name")} type="text" required autoComplete="name" value={form.name} onChange={update("name")} className={input} />
        </div>
        <div>
          <label htmlFor={id("email")} className={label}>Email address</label>
          <input id={id("email")} type="email" required autoComplete="email" value={form.email} onChange={update("email")} className={input} />
        </div>
      </div>
      <div>
        <label htmlFor={id("subject")} className={label}>Subject</label>
        <input
          id={id("subject")}
          type="text"
          required
          value={form.subject}
          onChange={update("subject")}
          className={input}
          placeholder="e.g. New e-commerce website"
        />
      </div>
      <div>
        <label htmlFor={id("message")} className={label}>Project details</label>
        <textarea
          id={id("message")}
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          className={`${input} resize-y`}
          placeholder="Goals, timeline, budget range and any links that help us understand the project."
        />
      </div>

      {status === "sent" && (
        <p role="status" className={`flex items-center gap-2 rounded-md px-4 py-3 text-[0.95rem] ${dark ? "bg-primary/15 text-primary" : "border border-moss/30 bg-mist text-moss"}`}>
          <CheckCircle2 size={18} /> Message sent. We'll reply within one business day.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className={`flex items-center gap-2 rounded-md px-4 py-3 text-[0.95rem] ${dark ? "bg-red-500/15 text-red-300" : "border border-destructive/30 bg-destructive/5 text-destructive"}`}>
          <AlertCircle size={18} /> Message not sent. Check your connection and try again, or email us directly.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className={`${dark ? "btn-primary" : "btn-dark"} w-full sm:w-auto`}>
        {status === "sending" ? "Sending…" : (
          <>
            Send enquiry <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
