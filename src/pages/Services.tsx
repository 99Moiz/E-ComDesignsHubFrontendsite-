import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import { services } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

/** Tracks which service section is currently in view, for the side index. */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
};

const ids = services.map((s) => s.slug);

const Services = () => {
  const active = useActiveSection(ids);

  return (
    <Layout>
      <SEO
        title="Services"
        description="Web development, UI/UX design, branding, SEO, digital marketing, and custom software. Explore E-ComDesignsHub's full range of digital services."
        path="/services"
      />
      <PageHeader
        crumb="Services"
        title="Services that deliver results."
        intro="From concept to execution, we provide the design, engineering and marketing your business needs to grow online."
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-12">
          {/* Side index */}
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Services" className="sticky top-28">
              <p className="mb-3 font-heading text-lg font-semibold">Our services</p>
              <ul className="border-l border-line">
                {services.map((s) => (
                  <li key={s.slug}>
                    <a
                      href={`#${s.slug}`}
                      className={`-ml-px block border-l-[3px] py-2 pl-4 text-[0.95rem] transition-colors ${
                        active === s.slug
                          ? "border-primary font-semibold text-foreground"
                          : "border-transparent text-muted-foreground hover:border-line hover:text-foreground"
                      }`}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Service detail */}
          <div className="lg:col-span-9">
            {services.map(({ slug, icon: Icon, title, description, features }) => (
              <Reveal
                as="article"
                key={slug}
                id={slug}
                className="group grid scroll-mt-28 gap-6 border-b border-line py-10 first:pt-0 last:border-b-0 md:grid-cols-[auto_1fr] md:gap-8"
              >
                <span className="grid h-14 w-14 place-items-center rounded-md bg-mist text-moss transition-colors duration-300 group-hover:bg-primary group-hover:text-foreground">
                  <Icon size={26} />
                </span>
                <div>
                  <h2 className="font-heading text-3xl font-semibold">{title}</h2>
                  <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground">{description}</p>
                  <ul className="mt-6 grid max-w-xl gap-x-8 gap-y-3 sm:grid-cols-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-[0.98rem]">
                        <Check size={17} strokeWidth={2.5} className="shrink-0 text-moss" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="link-arrow mt-7">
                    Discuss {title.toLowerCase()} <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Pricing />
      <FAQ />
    </Layout>
  );
};

export default Services;
