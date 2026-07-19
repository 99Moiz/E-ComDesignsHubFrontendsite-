export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  date: string; // ISO
  readTime: string;
}

// Sample posts — swap for real articles or fetch from a CMS/API.
export const blogPosts: BlogPost[] = [
  {
    slug: "why-your-site-speed-is-costing-you-customers",
    title: "Why Your Site Speed Is Costing You Customers",
    excerpt:
      "A one-second delay in load time can drop conversions by 7%. Here's what actually moves the needle on real-world performance.",
    category: "Performance",
    author: "E-ComDesignsHub Team",
    date: "2026-06-02",
    readTime: "5 min read",
    content: [
      "Most performance advice stops at 'compress your images,' but that's rarely where the real cost is hiding. In our audits, the biggest wins usually come from render-blocking scripts, unoptimized fonts, and third-party embeds that quietly add seconds to first paint.",
      "Start by measuring what actually matters to users: Largest Contentful Paint and Interaction to Next Paint, not just a single Lighthouse score. A site can score 95 in a lab test and still feel sluggish on a real 4G connection in the field.",
      "The highest-leverage fixes we see repeatedly: lazy-loading below-the-fold media, deferring non-critical JavaScript, self-hosting fonts instead of blocking on a third-party request, and trimming animation libraries down to only what's used on a given page.",
      "Speed isn't a one-time project — it's a budget. Set a performance budget per page (e.g. under 200KB of JS, LCP under 2.5s) and treat any regression like a bug, not a nice-to-have.",
    ],
  },
  {
    slug: "designing-for-trust-what-makes-visitors-stay",
    title: "Designing for Trust: What Makes Visitors Stay",
    excerpt:
      "Bounce rate is often a trust problem disguised as a design problem. Here's the checklist we run on every new site.",
    category: "Design",
    author: "E-ComDesignsHub Team",
    date: "2026-05-18",
    readTime: "4 min read",
    content: [
      "Visitors decide whether to trust a site within the first few seconds — before they've read a single word. That judgment is almost entirely visual: consistent spacing, legible type, and a clear hierarchy that tells them where to look first.",
      "Social proof does real work here. A specific testimonial with a name and role outperforms a generic 'we're the best' claim every time. Numbers help too, but only when they're credible and sourced.",
      "The fastest way to lose trust is friction: a contact form with too many required fields, a broken link, or a claim that isn't backed up anywhere on the page. Every one of these is a small tax on conversion.",
      "Our rule of thumb: if a first-time visitor can't tell what you do, who it's for, and what to do next within five seconds, the design isn't done yet — no matter how polished it looks.",
    ],
  },
  {
    slug: "seo-in-2026-what-actually-still-works",
    title: "SEO in 2026: What Actually Still Works",
    excerpt:
      "Search has changed a lot in the last few years. Here's what we're still recommending to clients — and what we've dropped.",
    category: "SEO",
    author: "E-ComDesignsHub Team",
    date: "2026-04-27",
    readTime: "6 min read",
    content: [
      "Keyword stuffing has been dead for years, but a lot of businesses are still optimizing as if it works. What actually moves rankings now is topical depth: covering a subject thoroughly enough that you become the obvious source, not just one more page targeting a phrase.",
      "Technical fundamentals still matter more than most people expect — crawlability, structured data, and page speed remain table stakes. You can't out-content a site that search engines can't properly index.",
      "AI-generated overviews have changed how people interact with results, which makes being the cited source more valuable than ranking #1 in a traditional sense. Clear, well-structured, factual content gets pulled into these summaries more often than marketing copy.",
      "Our current playbook: write for the specific person searching, structure content so both humans and machines can parse it quickly, and treat backlinks as a byproduct of being genuinely useful — not a checklist item.",
    ],
  },
];
