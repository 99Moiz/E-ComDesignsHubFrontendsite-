import { Link } from "react-router-dom";
import { Target, Eye, Heart, Award, Users, Lightbulb, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem, CountUp } from "@/components/Reveal";

const values = [
  { Icon: Lightbulb, title: "Innovation", description: "Pushing boundaries with creative solutions and emerging technologies." },
  { Icon: Users, title: "Collaboration", description: "Working closely with clients as true partners in every project." },
  { Icon: Award, title: "Excellence", description: "Delivering premium quality in every pixel and line of code." },
  { Icon: Heart, title: "Passion", description: "Driven by genuine love for the craft and meaningful digital work." },
];

const timeline = [
  { year: "2018", title: "Founded", description: "Started with a vision to create exceptional digital experiences." },
  { year: "2019", title: "First major client", description: "Delivered a breakthrough project that set our standard for quality." },
  { year: "2021", title: "Team expansion", description: "Grew to 20+ professionals across design and engineering." },
  { year: "2023", title: "Global reach", description: "Expanded services to clients across 15+ countries worldwide." },
  { year: "2025", title: "Industry recognition", description: "Awarded for excellence in digital innovation and design." },
];

const facts = [
  { value: "2018", label: "Founded" },
  { value: "20+", label: "Team members" },
  { value: "15+", label: "Countries served" },
  { value: "200+", label: "Projects delivered" },
];

const About = () => (
  <Layout>
    <SEO
      title="About Us"
      description="Meet the team behind E-ComDesignsHub, a hands-on studio building websites and digital experiences that drive real growth."
      path="/about"
    />
    <PageHeader
      crumb="About us"
      title="A team of designers, developers and marketers."
      intro="E-ComDesignsHub is a digital agency dedicated to transforming brands through web solutions, compelling design and data-driven strategies."
    />

    {/* Intro + facts */}
    <section className="section">
      <div className="container grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="heading-bar font-heading text-3xl font-semibold sm:text-4xl">Who we are</h2>
          <div className="mt-6 max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-muted-foreground">
            <p>
              We started in 2018 as a small studio with one goal: build websites that look good and actually work for
              the business behind them. Since then we have grown into a full-service team covering design,
              development, SEO and marketing.
            </p>
            <p>
              We treat every brand like our own, and we obsess over the details that turn a good product into one
              people remember and come back to.
            </p>
          </div>
        </Reveal>
        <RevealGroup as="dl" className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-md border border-line bg-line lg:col-span-5">
          {facts.map((f) => (
            <RevealItem key={f.label} className="bg-white p-6">
              <dt className="text-sm text-muted-foreground">{f.label}</dt>
              <dd className="mt-1 font-heading text-4xl font-semibold">
                {f.label === "Founded" ? f.value : <CountUp value={f.value} />}
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    {/* Mission & vision */}
    <section className="section bg-mist">
      <RevealGroup stagger={0.12} className="container grid gap-6 md:grid-cols-2">
        {[
          {
            Icon: Target,
            title: "Our mission",
            body: "To empower businesses with digital solutions that drive meaningful growth, foster engagement, and create lasting impressions.",
          },
          {
            Icon: Eye,
            title: "Our vision",
            body: "To be one of the most trusted digital agencies globally, known for high standards in design, technology and client partnership.",
          },
        ].map(({ Icon, title, body }) => (
          <RevealItem key={title} className="rounded-md border border-line border-t-4 border-t-primary bg-white p-8 transition-shadow duration-300 hover:shadow-[0_20px_40px_-24px_rgba(27,31,36,0.35)] md:p-10">
            <Icon size={30} className="text-moss" />
            <h3 className="mt-5 font-heading text-3xl font-semibold">{title}</h3>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">{body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>

    {/* Values */}
    <section className="section">
      <div className="container">
        <SectionHeading title="What drives us" intro="Four principles guide how we hire, how we work and how we treat clients." />
        <RevealGroup className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, title, description }) => (
            <RevealItem key={title} className="group bg-white p-7 transition-colors hover:bg-mist">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-mist text-moss transition-colors group-hover:bg-primary group-hover:text-foreground">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    {/* Timeline */}
    <section className="section bg-graphite text-white">
      <div className="container">
        <SectionHeading tone="light" title="Our journey" intro="Key milestones since the studio opened its doors." />
        <RevealGroup as="ol" stagger={0.12} className="grid gap-8 md:grid-cols-5 md:gap-6">
          {timeline.map((item) => (
            <RevealItem as="li" key={item.year} className="border-t-2 border-primary pt-5">
              <span className="font-heading text-3xl font-semibold text-primary">{item.year}</span>
              <h3 className="mt-2 font-body text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">{item.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    {/* Careers link */}
    <section className="section">
      <Reveal className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-heading text-3xl font-semibold">Want to work with us?</h2>
          <p className="mt-2 text-muted-foreground">We're always looking for people who care about good work.</p>
        </div>
        <Link to="/careers" className="btn-outline">
          See open positions <ArrowRight size={17} />
        </Link>
      </Reveal>
    </section>
  </Layout>
);

export default About;
