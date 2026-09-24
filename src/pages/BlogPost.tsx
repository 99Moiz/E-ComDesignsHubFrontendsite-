import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
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

      <header className="border-b border-line bg-mist">
        <div className="container max-w-3xl py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-moss">Home</Link>
            <ChevronRight size={14} />
            <Link to="/blog" className="hover:text-moss">Blog</Link>
            <ChevronRight size={14} />
            <span className="text-foreground">{post.category}</span>
          </nav>
          <h1 className="font-heading text-4xl font-semibold leading-[1.08] sm:text-5xl">{post.title}</h1>
          <p className="mt-6 text-[0.95rem] text-muted-foreground">
            By <span className="font-semibold text-foreground">{post.author}</span>
            <span className="mx-2 text-foreground/25">|</span>
            {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            <span className="mx-2 text-foreground/25">|</span>
            {post.readTime}
          </p>
        </div>
      </header>

      <article className="container max-w-3xl py-12 md:py-16">
        <p className="mb-8 text-xl leading-relaxed text-foreground">{post.excerpt}</p>
        <div className="prose-body">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-md border-l-4 border-primary bg-mist p-7 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-2xl font-semibold">Want results like this on your site?</h2>
            <p className="mt-1 text-muted-foreground">Tell us what's slowing your site or funnel down.</p>
          </div>
          <Link to="/contact" className="btn-dark shrink-0">
            Start a project
          </Link>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-semibold">Keep reading</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="group block border-t border-line pt-5">
                  <p className="text-sm font-semibold text-moss">{r.category}</p>
                  <h3 className="mt-2 font-heading text-xl font-semibold leading-snug group-hover:text-moss">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link to="/blog" className="link-arrow mt-12">
          <ArrowLeft size={16} /> Back to all articles
        </Link>
      </article>
    </Layout>
  );
};

export default BlogPost;
