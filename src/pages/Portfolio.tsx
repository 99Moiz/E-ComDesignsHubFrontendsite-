import { useState, useEffect, useMemo } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { RevealGroup, RevealItem } from "@/components/Reveal";

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

const ProjectImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-mist">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-mist" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover object-top transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.03] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

const SkeletonCard = () => (
  <div className="overflow-hidden rounded-md border border-line bg-white">
    <div className="aspect-[16/10] animate-pulse bg-mist" />
    <div className="space-y-3 p-6">
      <div className="h-3 w-24 animate-pulse rounded bg-mist" />
      <div className="h-5 w-2/3 animate-pulse rounded bg-mist" />
      <div className="h-3 w-full animate-pulse rounded bg-mist" />
    </div>
  </div>
);

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const [projRes, catRes] = await Promise.all([
          fetch(`${API_BASE}/api/ProjectApi/get`),
          fetch(`${API_BASE}/api/ProjectApi/GetCategory`),
        ]);
        if (!projRes.ok || !catRes.ok) throw new Error("API request failed");

        const projData = await projRes.json();
        const catData = await catRes.json();
        if (!isMounted) return;

        setProjects(projData);
        setCategories(["All", ...catData.map((c: { name: string }) => c.name)]);
      } catch (err) {
        console.error("Portfolio API Error:", err);
        if (isMounted) setError("Projects couldn't be loaded. Check your connection and try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [reload]);

  const filteredProjects = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.categoryName === active)),
    [projects, active]
  );

  return (
    <Layout>
      <SEO
        title="Portfolio"
        description="Browse selected web design and development projects by E-ComDesignsHub across e-commerce, branding, and custom platforms."
        path="/portfolio"
      />
      <PageHeader
        crumb="Portfolio"
        title="Selected work."
        intro="Projects where strategy meets craft, each one built to move a brand forward."
      />

      <section className="section">
        <div className="container">
          {!loading && !error && (
            <div className="mb-10 flex flex-col gap-4 border-b border-line md:flex-row md:items-end md:justify-between">
              <div role="tablist" aria-label="Filter projects" className="-mb-px flex flex-wrap gap-x-7">
                {categories.map((cat) => {
                  const isActive = active === cat;
                  return (
                    <button
                      key={cat}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(cat)}
                      className={`border-b-[3px] pb-4 pt-1 text-[0.98rem] font-semibold transition-colors ${
                        isActive
                          ? "border-primary text-foreground"
                          : "border-transparent text-muted-foreground hover:border-line hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
              <p className="pb-4 text-sm text-muted-foreground">
                Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
              </p>
            </div>
          )}

          {loading && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-md border border-line bg-mist px-6 py-14 text-center">
              <p className="font-semibold">{error}</p>
              <button onClick={() => setReload((n) => n + 1)} className="btn-outline mt-6">
                <RefreshCw size={16} /> Try again
              </button>
            </div>
          )}

          {!loading && !error && filteredProjects.length > 0 && (
            <RevealGroup key={active} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <RevealItem key={project.id} className="flex">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full flex-col overflow-hidden rounded-md border border-line bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-[0_14px_32px_-16px_rgba(27,31,36,0.28)]"
                >
                  <ProjectImage src={`${API_BASE}${project.imgUrl}`} alt={project.title} />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm font-semibold text-moss">{project.categoryName}</p>
                    <h2 className="mt-2 font-heading text-2xl font-semibold leading-tight transition-colors group-hover:text-moss">
                      {project.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 flex-1 leading-relaxed text-muted-foreground">{project.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-foreground">
                      Visit project
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </a>
                </RevealItem>
              ))}
            </RevealGroup>
          )}

          {!loading && !error && filteredProjects.length === 0 && (
            <div className="rounded-md border border-line bg-mist px-6 py-14 text-center">
              <p className="font-semibold">No projects in this category yet.</p>
              <button onClick={() => setActive("All")} className="link-arrow mt-3">
                Show all projects
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
