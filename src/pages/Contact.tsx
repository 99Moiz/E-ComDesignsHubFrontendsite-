import { Mail, MapPin, Instagram, Facebook, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <Layout hideFooterCta>
      <SEO
        title="Contact Us"
        description="Get in touch with E-ComDesignsHub. Tell us about your project and we'll get back to you within one business day."
        path="/contact"
      />
      <PageHeader
        crumb="Contact"
        title="Let's talk about your project."
        intro="Tell us what you need. We read every message and reply personally within one business day."
      />

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <h2 className="heading-bar font-heading text-3xl font-semibold">Send us a message</h2>
            <p className="mt-3 text-muted-foreground">All fields are required.</p>

            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.12} className="lg:col-span-5">
          <aside>
            <div className="rounded-md bg-graphite p-8 text-white md:p-10">
              <h2 className="font-heading text-2xl font-semibold text-white">Contact details</h2>
              <ul className="mt-8 space-y-7">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary text-foreground">
                    <Mail size={19} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-white/60">Email</span>
                    <a href={`mailto:${SITE.inbox}`} className="break-all font-semibold text-white hover:text-primary">
                      {SITE.email}
                    </a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary text-foreground">
                    <MapPin size={19} />
                  </span>
                  <span>
                    <span className="block text-sm text-white/60">Office</span>
                    <span className="font-semibold">{SITE.address}</span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary text-foreground">
                    <Clock size={19} />
                  </span>
                  <span>
                    <span className="block text-sm text-white/60">Response time</span>
                    <span className="font-semibold">Within one business day</span>
                  </span>
                </li>
              </ul>

              <div className="mt-10 border-t border-graphite-line pt-6">
                <p className="text-sm text-white/60">Follow us</p>
                <div className="mt-3 flex gap-2">
                  {[
                    { Icon: Instagram, href: SITE.instagram, label: "Instagram" },
                    { Icon: Facebook, href: SITE.facebook, label: "Facebook" },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-md border border-graphite-line transition-colors hover:border-primary hover:bg-primary hover:text-foreground"
                    >
                      <Icon size={17} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
