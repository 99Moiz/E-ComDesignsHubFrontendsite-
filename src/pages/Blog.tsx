import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { blogPosts } from "@/data/blog";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const Blog = () => {
  const [featured, ...rest] = blogPosts;

  return (
    <Layout>
      <SEO
        title="Blog"
        description="Practical writing on web design, performance, and SEO from the E-ComDesignsHub team."
        path="/blog"
      />
      <PageHeader
        crumb="Blog"
        title="Insights on design, speed and search."
        intro="Practical write-ups from projects we've shipped."
      />

      <section className="section">
        <div className="container">
          {featured && (
            <Reveal>
            <Link
              to={`/blog/${featured.slug}`}
              className="group mb-14 grid gap-6 rounded-md border border-line bg-mist p-8 transition-colors hover:border-foreground/30 md:grid-cols-12 md:p-12"
            >
              <div className="md:col-span-8">
                <p className="text-sm font-semibold text-moss">Latest article <span className="mx-2 text-foreground/25">|</span> {featured.category}</p>
                <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight transition-colors group-hover:text-moss md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground">{featured.excerpt}</p>
              </div>
              <div className="flex flex-col justify-between gap-4 md:col-span-4 md:items-end">
                <p className="text-sm text-muted-foreground md:text-right">
                  {fmt(featured.date)}
                  <br />
                  {featured.readTime}
                </p>
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  Read article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
            </Reveal>
          )}

          <RevealGroup className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <RevealItem key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="group relative block pt-6">
                <span className="absolute inset-x-0 top-0 h-px bg-line" />
                <span className="absolute left-0 top-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                <p className="text-sm font-semibold text-moss">{post.category}</p>
                <h2 className="mt-3 font-heading text-2xl font-semibold leading-snug transition-colors group-hover:text-moss">
                  {post.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <p className="mt-5 text-sm text-muted-foreground">
                  {fmt(post.date)} <span className="mx-2 text-foreground/25">|</span> {post.readTime}
                </p>
              </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
