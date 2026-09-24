import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Star, Quote, Mail, MapPin, Clock, Globe, Palette, TrendingUp, Code } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import SectionHeading from "@/components/SectionHeading";
import ReviewBadge from "@/components/ReviewBadge";
import LogoMarquee from "@/components/LogoMarquee";
import ContactForm from "@/components/ContactForm";
import HeroSlider from "@/components/home/HeroSlider";
import { Reveal, RevealGroup, RevealItem, CountUp } from "@/components/Reveal";
import { SITE, serviceGroups } from "@/lib/site";
import { blogPosts } from "@/data/blog";

const stats = [
  { value: "8+", label: "Years of delivering digital work" },
  { value: "200+", label: "Projects launched for clients" },
  { value: "50+", label: "Businesses we work with worldwide" },
  { value: "99%", label: "Client satisfaction across projects" },
];

const groupIcons = { build: Globe, design: Palette, grow: TrendingUp, software: Code } as const;

const processSteps = [
  { title: "Discovery", description: "We dive deep into your business goals, audience, and market to craft a tailored strategy." },
  { title: "Design", description: "Our designers create mockups and prototypes you can review and refine before anything is built." },
  { title: "Develop", description: "We build your project on modern tech stacks, with performance and scalability in mind." },
  { title: "Deliver", description: "We launch your project and provide ongoing support to keep it running well." },
];

const testimonials = [
  { name: "Sarah M.", role: "E-commerce Owner", quote: "E-ComDesignsHub transformed our online store completely. Sales increased by 150% within the first quarter!" },
  { name: "James K.", role: "Startup Founder", quote: "Professional, creative, and incredibly responsive. They delivered beyond our expectations on every milestone." },
  { name: "Priya D.", role: "Marketing Director", quote: "Their SEO and digital marketing strategies gave us the competitive edge we needed. Highly recommended!" },
];

const API_BASE = "https://ecomdesignshub.runasp.net";

interface Project {
  id: number | string;
  imgUrl: string;
  title: string;
  description: string;
  categoryName: string;
  projectUrl: string;
}

/** Latest three portfolio projects from the API. Hidden if the API fails. */
const FeaturedWork = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`${API_BASE}/api/ProjectApi/get`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Project[]) => alive && setProjects(data.slice(0, 3)))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  if (failed || (projects && projects.length === 0)) return null;

  return (
    <section className="section bg-mist">
      <div className="container">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="heading-bar font-heading text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
              Recent work
            </h2>
            <p className="mt-4 max-w-lg text-[1.05rem] text-muted-foreground">
              A few of the websites and stores we've launched for clients recently.
            </p>
          </div>
          <Link to="/portfolio" className="btn-outline shrink-0">
            View full portfolio <ArrowRight size={17} />
          </Link>
        </Reveal>

        <RevealGroup stagger={0.12} className="grid gap-6 md:grid-cols-3">
          {(projects ?? Array.from({ length: 3 })).map((p, i) =>
            p ? (
              <RevealItem key={(p as Project).id} className="flex">
                <a
                  href={(p as Project).projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full flex-col overflow-hidden rounded-md border border-line bg-white transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:shadow-[0_24px_44px_-26px_rgba(27,31,36,0.4)]"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-mist">
                    <img
                      src={`${API_BASE}${(p as Project).imgUrl}`}
                      alt={(p as Project).title}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm font-semibold text-moss">{(p as Project).categoryName}</p>
                    <h3 className="mt-2 font-heading text-2xl font-semibold transition-colors group-hover:text-moss">{(p as Project).title}</h3>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.95rem] font-semibold text-foreground">
                      Visit project
                      <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              </RevealItem>
            ) : (
              <div key={i} className="overflow-hidden rounded-md border border-line bg-white">
                <div className="aspect-[16/10] animate-pulse bg-mist" />
                <div className="space-y-3 p-6">
                  <div className="h-3 w-20 animate-pulse rounded bg-mist" />
                  <div className="h-5 w-2/3 animate-pulse rounded bg-mist" />
                </div>
              </div>
            )
          )}
        </RevealGroup>
      </div>
    </section>
  );
};


const Index = () => {
  const latest = blogPosts.slice(0, 3);

  return (
    <Layout overlayHeader hideFooterCta>
      <SEO
        title="Web Design, Development & Digital Marketing Agency"
        description="E-ComDesignsHub builds custom websites, e-commerce stores, and digital strategies that turn visitors into customers. Web development, UI/UX design, SEO, and digital marketing."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "E-ComDesignsHub",
          url: "https://ecomdesignshub.com",
          description: "Web design, development, and digital marketing agency.",
        }}
      />

      <HeroSlider />

      {/* Intro statement + key figures */}
      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <h2 className="font-heading text-4xl font-semibold leading-[1.05] sm:text-5xl">
              From first idea to a business that grows online.
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted-foreground">
              We bring strategy, design, engineering and marketing together in one team, so every website we build
              has a clear job and the support to do it well after launch.
            </p>
            <Link to="/about" className="link-arrow mt-8">
              More about the company <ArrowRight size={16} />
            </Link>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-6 lg:col-start-7">
            {stats.map((s) => (
              <RevealItem key={s.label} className="border-l-2 border-primary pl-6">
                <CountUp value={s.value} className="block font-heading text-5xl font-semibold leading-none md:text-6xl" />
                <p className="mt-3 max-w-[14rem] text-[0.98rem] leading-snug text-muted-foreground">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <LogoMarquee />

      {/* Services: four practice cards */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="heading-bar font-heading text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">Our services</h2>
            <Link to="/services" className="link-arrow">
              Discover all services <ArrowRight size={16} />
            </Link>
          </Reveal>

          <RevealGroup stagger={0.1} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serviceGroups.map((g) => {
              const Icon = groupIcons[g.key as keyof typeof groupIcons];
              return (
                <RevealItem key={g.key} className="flex">
                  <Link
                    to={`/services#${g.items[0].slug}`}
                    className="group relative flex min-h-[400px] w-full flex-col overflow-hidden rounded-md bg-graphite p-8 text-white"
                  >
                    {/* lime panel rises from the bottom on hover */}
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
                    <Icon
                      size={120}
                      strokeWidth={1}
                      className="absolute -right-6 -top-6 text-white/[0.06] transition-colors duration-500 group-hover:text-foreground/10"
                    />
                    <span className="relative grid h-14 w-14 place-items-center rounded-md bg-white/10 text-primary transition-colors duration-500 group-hover:bg-foreground group-hover:text-primary">
                      <Icon size={26} />
                    </span>
                    <div className="relative mt-auto">
                      <h3 className="font-heading text-3xl font-semibold leading-tight text-white transition-colors duration-500 group-hover:text-foreground">
                        {g.title}
                      </h3>
                      <div className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="pt-3 leading-relaxed text-white/70 transition-colors duration-500 group-hover:text-foreground/80">
                            {g.blurb}
                          </p>
                          <p className="pt-4 text-sm text-white/50 transition-colors duration-500 group-hover:text-foreground/70">
                            {g.items.map((i) => i.title).join(", ")}
                          </p>
                        </div>
                      </div>
                      <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-primary transition-colors duration-500 group-hover:text-foreground">
                        Learn more
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <FeaturedWork />

      {/* Process */}
      <section className="section">
        <div className="container">
          <SectionHeading
            split
            title="How we work"
            intro="A proven four-step workflow that keeps every project on schedule and on budget."
          />
          <RevealGroup as="ol" stagger={0.15} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, i) => (
              <RevealItem as="li" key={step.title} className="group relative pt-6">
                <span className="absolute inset-x-0 top-0 h-0.5 bg-line" />
                <span className="absolute left-0 top-0 h-0.5 w-12 bg-foreground transition-all duration-500 group-hover:w-full group-hover:bg-primary" />
                <span className="font-heading text-lg font-semibold text-moss">Step {i + 1}</span>
                <h3 className="mt-2 font-heading text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{step.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-mist">
        <div className="container">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="heading-bar font-heading text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
              What our clients say
            </h2>
            <ReviewBadge />
          </Reveal>
          <RevealGroup stagger={0.12} className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <RevealItem key={t.name} className="flex">
                <figure className="flex w-full flex-col rounded-md border border-line bg-white p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(27,31,36,0.35)]">
                  <Quote size={28} className="text-primary" />
                  <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed">{t.quote}</blockquote>
                  <figcaption className="mt-8 flex items-center justify-between border-t border-line pt-5">
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      <span className="block text-sm text-muted-foreground">{t.role}</span>
                    </span>
                    <span className="flex gap-0.5" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={14} className="fill-primary text-primary" />
                      ))}
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Insights */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="heading-bar font-heading text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
              Featured insights
            </h2>
            <Link to="/blog" className="link-arrow">
              Read the blog <ArrowUpRight size={16} />
            </Link>
          </Reveal>
          <RevealGroup className="grid gap-6 md:grid-cols-3">
            {latest.map((post) => (
              <RevealItem key={post.slug} className="flex">
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex w-full flex-col rounded-md border border-line p-7 transition-colors duration-300 hover:border-foreground hover:bg-foreground"
                >
                  <p className="text-sm font-semibold text-moss transition-colors group-hover:text-primary">{post.category}</p>
                  <h3 className="mt-3 font-heading text-2xl font-semibold leading-snug transition-colors group-hover:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted-foreground transition-colors group-hover:text-white/70">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-semibold transition-colors group-hover:text-primary">
                    Read more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Careers band */}
      <section className="bg-primary">
        <Reveal className="container flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">Where careers take shape</h2>
            <p className="mt-2 max-w-xl text-foreground/80">
              Join a team of designers, developers and marketers doing work that clients notice.
            </p>
          </div>
          <Link to="/careers" className="btn-dark shrink-0">
            Explore careers <ArrowRight size={17} />
          </Link>
        </Reveal>
      </section>

      {/* Enquiry form */}
      <section className="section bg-graphite text-white">
        <div className="container grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-heading text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
              Let's build what's next, together.
            </h2>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-white/70">
              Tell us about your project. We read every enquiry and reply within one business day.
            </p>
            <ul className="mt-10 space-y-5 text-[0.98rem]">
              <li className="flex items-center gap-4">
                <Mail size={19} className="shrink-0 text-primary" />
                <a href={`mailto:${SITE.inbox}`} className="break-all transition-colors hover:text-primary">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <MapPin size={19} className="shrink-0 text-primary" />
                <span className="text-white/80">{SITE.address}</span>
              </li>
              <li className="flex items-center gap-4">
                <Clock size={19} className="shrink-0 text-primary" />
                <span className="text-white/80">Reply within one business day</span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="rounded-md border border-graphite-line p-6 sm:p-9">
              <ContactForm idPrefix="home" tone="dark" />
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
