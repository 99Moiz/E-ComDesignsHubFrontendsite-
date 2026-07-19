import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Spotlight from "@/components/motion/Spotlight";
import FloatingShapes from "@/components/motion/FloatingShapes";
import TextReveal from "@/components/motion/TextReveal";
import TiltCard from "@/components/motion/TiltCard";
import Magnetic from "@/components/motion/Magnetic";
//for live
const API_BASE = "https://ecomdesignshub.runasp.net";
//for test
// const API_BASE = "https://localhost:7230";

interface Project {
  id: number | string;
  imgUrl: string;
  title: string;
  description: string;
  categoryName: string;
  projectUrl: string;
}

const ImageWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-surface" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease" }}
        className={`h-full w-full object-cover will-change-transform group-hover:scale-[1.06] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* legibility veil */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
    </div>
  );
};

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [projRes, catRes] = await Promise.all([
          fetch(`${API_BASE}/api/ProjectApi/get`),
          fetch(`${API_BASE}/api/ProjectApi/GetCategory`)
        ]);

        if (!projRes.ok || !catRes.ok) {
          throw new Error("API request failed");
        }

        const projData = await projRes.json();
        const catData = await catRes.json();

        if (!isMounted) return;

        setProjects(projData);
        setCategories(["All", ...catData.map((c: { name: string }) => c.name)]);
      } catch (err) {
        console.error("Portfolio API Error:", err);
        if (isMounted) setError("Failed to load projects.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter(p => p.categoryName === active);
  }, [projects, active]);

  return (
    <Layout>
      <SEO
        title="Portfolio"
        description="Browse selected web design and development projects by E-ComDesignsHub — real work across e-commerce, branding, and custom platforms."
        path="/portfolio"
      />
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 md:pt-28 pb-10 px-5 md:px-8">
        <Spotlight color="var(--primary)" size={620} opacity={0.12} />
        <FloatingShapes variant="mixed" />
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.35]" />

        <div className="container relative mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-6"
          >
            <span className="text-accent">/ 04</span> — Selected Work
          </motion.p>

          <TextReveal
            as="h1"
            text="The work speaks first."
            highlight={["work"]}
            className="max-w-4xl font-heading text-3xl font-normal leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            A curated index of projects where strategy meets craft — each one
            built to move a brand forward.
          </motion.p>
        </div>
      </section>

      {/* ── Filters + Grid ─────────────────────────────────────── */}
      <section className="relative px-5 md:px-8 pb-28">
        <div className="container relative mx-auto">
          {/* Filter bar — editorial underlined tabs */}
          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-line pb-5"
            >
              {categories.map(cat => {
                const isActive = active === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={`relative cursor-hover font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                    {isActive && (
                      <motion.span
                        layoutId="portfolioFilterInk"
                        className="absolute -bottom-[21px] left-0 right-0 h-px bg-primary glow-green-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                );
              })}
              <span className="ml-auto font-mono text-xs text-muted-foreground/70">
                {String(filteredProjects.length).padStart(2, "0")} projects
              </span>
            </motion.div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center gap-5 py-24">
              <img
                src="/images/logo.jpeg"
                alt="Loading"
                className="w-16 rounded-full opacity-90 animate-pulse"
              />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Loading work…
              </span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 py-16 text-center text-destructive">
              {error}
            </div>
          )}

          {/* Projects */}
          {!loading && !error && (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <TiltCard max={5} glare className="h-full">
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block h-full rounded-2xl border border-line bg-card p-3 transition-colors duration-500 hover:border-primary/40"
                      >
                        <ImageWithSkeleton
                          src={`${API_BASE}${project.imgUrl}`}
                          alt={project.title}
                        />

                        <div className="flex items-start justify-between gap-4 px-3 pb-3 pt-5">
                          <div>
                            <div className="mb-3 flex items-center gap-3">
                              <span className="font-mono text-[11px] text-primary">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                                {project.categoryName}
                              </span>
                            </div>
                            <h3 className="font-heading text-xl font-bold leading-tight md:text-2xl">
                              {project.title}
                            </h3>
                            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                              {project.description}
                            </p>
                          </div>

                          <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-muted-foreground transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                            <ArrowUpRight
                              size={16}
                              className="transition-transform duration-500 group-hover:rotate-45"
                            />
                          </span>
                        </div>
                      </a>
                    </TiltCard>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                No projects in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 md:px-8 pb-32">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center md:py-24">
            <Spotlight color="var(--accent)" size={520} opacity={0.1} />
            <h2 className="mx-auto max-w-2xl font-heading text-2xl font-normal leading-snug sm:text-3xl md:text-4xl">
              Like what you see? Let's add yours to the list.
            </h2>
            <div className="mt-10">
              <Magnetic>
                <a
                  href="/contact"
                  className="btn-pill"
                >
                  Start a project
                  <span className="btn-pill-arrow">
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
