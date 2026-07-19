import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/motion/TiltCard";
import Spotlight from "@/components/motion/Spotlight";
import TextReveal from "@/components/motion/TextReveal";
import { blogPosts } from "@/data/blog";

const Blog = () => (
  <Layout>
    <SEO
      title="Blog"
      description="Practical, no-fluff writing on web design, performance, and SEO from the E-ComDesignsHub team."
      path="/blog"
    />

    <section className="relative overflow-hidden pt-20 md:pt-28 pb-16 px-5 md:px-8">
      <Spotlight color="var(--primary)" size={620} opacity={0.12} />
      <div className="bg-grid-pattern absolute inset-0 opacity-[0.35]" />
      <div className="container relative mx-auto">
        <p className="eyebrow mb-6">/ 05 — Insights</p>
        <TextReveal
          as="h1"
          text="Notes on design, speed, and search."
          highlight={["speed"]}
          className="max-w-3xl font-heading text-3xl font-normal leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
        />
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Practical write-ups from projects we've shipped — no fluff, no filler.
        </p>
      </div>
    </section>

    <section className="px-5 md:px-8 pb-28">
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.08}>
            <TiltCard max={6} className="h-full cursor-hover">
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors duration-300 hover:border-primary/30"
              >
                <span className="mb-4 w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                  {post.category}
                </span>
                <h2 className="font-heading text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {post.readTime}
                  </span>
                  <ArrowUpRight size={16} className="text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
              </Link>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  </Layout>
);

export default Blog;
