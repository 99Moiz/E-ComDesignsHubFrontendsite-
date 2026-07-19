import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import Magnetic from "@/components/motion/Magnetic";
import { blogPosts } from "@/data/blog";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          author: { "@type": "Organization", name: post.author },
          datePublished: post.date,
        }}
      />

      <article className="px-5 md:px-8 pt-20 md:pt-28 pb-24">
        <div className="container mx-auto max-w-2xl">
          <ScrollReveal>
            <Link
              to="/blog"
              className="link-underline mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary"
            >
              <ArrowLeft size={14} /> Back to insights
            </Link>

            <span className="mb-5 inline-flex w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
              {post.category}
            </span>

            <h1 className="font-heading text-3xl font-normal leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-3 border-b border-line pb-8 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
              <span>{post.author}</span>
              <span>·</span>
              <span>
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-10 space-y-6">
              {post.content.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-muted-foreground">
                  {para}
                </p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-14 rounded-2xl border border-line bg-card p-8 text-center">
              <h3 className="font-heading text-xl font-normal">
                Want results like this on your own site?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Let's talk about what's slowing your site or funnel down.
              </p>
              <Magnetic strength={12}>
                <Link to="/contact" className="btn-pill mt-6 justify-center">
                  Start a project
                  <span className="btn-pill-arrow">
                    <ArrowUpRight size={15} />
                  </span>
                </Link>
              </Magnetic>
            </div>
          </ScrollReveal>

          {related.length > 0 && (
            <ScrollReveal delay={0.2}>
              <div className="mt-16 border-t border-line pt-10">
                <p className="eyebrow mb-6">Keep reading</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/blog/${r.slug}`}
                      className="group block rounded-xl border border-line bg-card p-5 transition-colors hover:border-primary/30"
                    >
                      <h4 className="font-heading text-sm font-semibold leading-snug group-hover:text-primary">
                        {r.title}
                      </h4>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                        {r.readTime}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
