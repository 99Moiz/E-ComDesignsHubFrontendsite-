import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, Users, X, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import JobApplication from "@/components/JobApplication";
import Spotlight from "@/components/motion/Spotlight";
import FloatingShapes from "@/components/motion/FloatingShapes";
import TextReveal from "@/components/motion/TextReveal";
import TiltCard from "@/components/motion/TiltCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

interface Job {
  jobId: number;
  title: string;
  description: string;
  location: string;
  jobType: string;
  experienceRequired: number;
  postedDate: string;
  dueDate: string;
  isActive: boolean;
}

const perks = [
  { icon: Users, label: "Growing team" },
  { icon: Briefcase, label: "Ambitious projects" },
  { icon: Clock, label: "Flexible hours" },
];

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedJobDetails, setSelectedJobDetails] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('https://ecomdesignshub.runasp.net/api/jobs');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data.filter((job: Job) => job.isActive));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Layout>
        <SEO
                  title="Careers"
                  description="Join E-ComDesignsHub — we're hiring designers, developers, and strategists who care about doing great work."
                  path="/careers"
                />
        <div className="flex min-h-[70vh] flex-col items-center justify-center">
          <motion.img
            src="/images/logo.jpeg"
            alt="e-comdesignshub"
            className="h-20 w-20 rounded-2xl object-cover shadow-lg animate-pulse"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.p
            className="mt-5 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Loading positions…
          </motion.p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <SEO
                  title="Careers"
                  description="Join E-ComDesignsHub — we're hiring designers, developers, and strategists who care about doing great work."
                  path="/careers"
                />
        <div className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="text-center">
            <h2 className="mb-4 font-heading text-2xl font-bold text-destructive">Error loading jobs</h2>
            <p className="text-muted-foreground">{error}</p>
            <button
              onClick={fetchJobs}
              className="mt-6 rounded-full bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Try again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
                title="Careers"
                description="Join E-ComDesignsHub — we're hiring designers, developers, and strategists who care about doing great work."
                path="/careers"
              />
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 md:pt-28 pb-14 px-5 md:px-8">
        <Spotlight color="var(--accent)" size={600} opacity={0.1} />
        <FloatingShapes variant="gold" />
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.35]" />

        <div className="container relative mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-6"
          >
            <span className="text-accent">/ 05</span> — Careers
          </motion.p>

          <TextReveal
            as="h1"
            text="Come build the studio with us."
            highlight={["studio"]}
            className="max-w-4xl font-heading text-3xl font-normal leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            We hire curious people who care about the craft. If shaping premium
            digital experiences excites you, you'll feel at home here.
          </motion.p>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {perks.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon size={16} className="text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open positions ─────────────────────────────────────── */}
      <section className="relative px-5 md:px-8 pb-28">
        <div className="container mx-auto">
          <div className="mb-12 flex items-end justify-between border-b border-line pb-5">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">Open positions</h2>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {String(jobs.length).padStart(2, "0")} roles
            </span>
          </div>

          {jobs.length === 0 ? (
            <div className="rounded-3xl border border-line bg-surface py-20 text-center">
              <Briefcase size={48} className="mx-auto mb-5 text-muted-foreground" />
              <h3 className="mb-2 font-heading text-2xl font-bold">No open positions</h3>
              <p className="text-muted-foreground">
                We're not hiring right now — but check back soon for new opportunities.
              </p>
            </div>
          ) : (
            <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job, index) => (
                <StaggerItem key={job.jobId} className="h-full">
                  <TiltCard max={5} glare className="h-full">
                    <div className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors duration-500 hover:border-primary/40">
                      <div className="mb-4 flex items-start justify-between">
                        <span className="font-mono text-xs text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                          Active
                        </span>
                      </div>

                      <h3 className="mb-3 font-heading text-xl font-bold leading-tight">
                        {job.title}
                      </h3>

                      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={14} /> {job.jobType}
                        </span>
                      </div>

                      <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {job.description}
                      </p>

                      <div className="mb-5 mt-auto flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                        <span>{job.experienceRequired}+ yrs exp</span>
                        <span>{formatDate(job.postedDate)}</span>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="btn-pill flex-1 justify-center !py-2.5 !pl-5 text-sm"
                        >
                          Apply now
                          <span className="btn-pill-arrow !h-7 !w-7">
                            <ArrowUpRight size={14} />
                          </span>
                        </button>
                        <button
                          onClick={() => setSelectedJobDetails(job)}
                          className="rounded-full border border-line px-4 py-2.5 text-sm transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      {/* Application Modal (preserved) */}
      {selectedJob && (
        <JobApplication
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJobDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/70 p-4 backdrop-blur-md"
            onClick={() => setSelectedJobDetails(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-line p-6">
                <div>
                  <span className="eyebrow mb-3 block">Position details</span>
                  <h2 className="font-heading text-2xl font-bold">
                    {selectedJobDetails.title}
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} /> {selectedJobDetails.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={15} /> {selectedJobDetails.jobType}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJobDetails(null)}
                  className="cursor-hover rounded-full border border-line p-2 transition-colors hover:border-primary/40 hover:text-primary"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-6 p-6">
                <div>
                  <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-primary">
                    Job description
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {selectedJobDetails.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-primary">
                      Requirements
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{selectedJobDetails.experienceRequired}+ years of experience</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-primary">
                      Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location</span>
                        <span>{selectedJobDetails.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Job type</span>
                        <span>{selectedJobDetails.jobType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Posted</span>
                        <span>{formatDate(selectedJobDetails.postedDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Deadline</span>
                        <span>{formatDate(selectedJobDetails.dueDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 border-t border-line pt-6">
                  <button
                    onClick={() => {
                      setSelectedJobDetails(null);
                      setSelectedJob(selectedJobDetails);
                    }}
                    className="btn-pill flex-1 justify-center"
                  >
                    Apply for this position
                    <span className="btn-pill-arrow">
                      <ArrowUpRight size={16} />
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedJobDetails(null)}
                    className="rounded-full border border-line px-6 py-3 transition-colors hover:border-primary/40"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Careers;
