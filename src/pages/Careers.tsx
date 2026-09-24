import { useState, useEffect } from "react";
import { Briefcase, MapPin, Clock, Users, X, CalendarDays, RefreshCw, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import JobApplication from "@/components/JobApplication";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
  { icon: Users, title: "Growing team", body: "Work alongside designers, developers and marketers." },
  { icon: Briefcase, title: "Ambitious projects", body: "Real clients, real launches, across many industries." },
  { icon: Clock, title: "Flexible hours", body: "We care about results, not time at a desk." },
];

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const SEOBlock = () => (
  <SEO
    title="Careers"
    description="Join E-ComDesignsHub. We're hiring designers, developers, and strategists who care about doing great work."
    path="/careers"
  />
);

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedJobDetails, setSelectedJobDetails] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://ecomdesignshub.runasp.net/api/jobs");
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      setJobs(data.filter((job: Job) => job.isActive));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Layout>
      <SEOBlock />
      <PageHeader
        crumb="Careers"
        title="Build your career with us."
        intro="We hire curious people who care about the craft. If shaping digital experiences excites you, you'll feel at home here."
      />

      {/* Perks */}
      <section className="border-b border-line bg-mist">
        <RevealGroup className="container grid gap-8 py-12 md:grid-cols-3">
          {perks.map(({ icon: Icon, title, body }) => (
            <RevealItem key={title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-white text-moss">
                <Icon size={20} />
              </span>
              <div>
                <h2 className="font-body text-[1.05rem] font-semibold">{title}</h2>
                <p className="mt-1 text-[0.95rem] text-muted-foreground">{body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Open positions */}
      <section className="section">
        <div className="container">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="heading-bar font-heading text-3xl font-semibold sm:text-4xl">Open positions</h2>
            {!loading && !error && (
              <span className="text-[0.95rem] text-muted-foreground">
                {jobs.length} {jobs.length === 1 ? "role" : "roles"} available
              </span>
            )}
          </div>

          {loading && (
            <div className="divide-y divide-line rounded-md border border-line">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-3 p-6">
                  <div className="h-5 w-1/3 animate-pulse rounded bg-mist" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-mist" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="rounded-md border border-line bg-mist px-6 py-14 text-center">
              <p className="font-semibold">Open positions couldn't be loaded.</p>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
              <button onClick={fetchJobs} className="btn-outline mt-6">
                <RefreshCw size={16} /> Try again
              </button>
            </div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="rounded-md border border-line bg-mist px-6 py-16 text-center">
              <Briefcase size={36} className="mx-auto text-muted-foreground" />
              <h3 className="mt-4 font-heading text-2xl font-semibold">No open positions right now</h3>
              <p className="mt-2 text-muted-foreground">
                New roles are posted here first. You can also send your CV to us through the contact page.
              </p>
            </div>
          )}

          {!loading && !error && jobs.length > 0 && (
            <RevealGroup as="ul" className="divide-y divide-line overflow-hidden rounded-md border border-line">
              {jobs.map((job) => (
                <RevealItem
                  as="li"
                  key={job.jobId}
                  className="group relative grid gap-5 bg-white p-6 transition-colors hover:bg-mist md:grid-cols-[1fr_auto] md:items-center md:gap-8"
                >
                  <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100" />
                  <div>
                    <h3 className="font-heading text-2xl font-semibold">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1.5 text-[0.95rem] text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={15} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={15} /> {job.jobType}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={15} /> {job.experienceRequired}+ years experience
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={15} /> Apply by {formatDate(job.dueDate)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setSelectedJobDetails(job)} className="btn-outline !px-5 !py-2.5">
                      View details
                    </button>
                    <button onClick={() => setSelectedJob(job)} className="btn-dark !px-5 !py-2.5">
                      Apply now
                    </button>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>

      {selectedJob && <JobApplication job={selectedJob} onClose={() => setSelectedJob(null)} />}

      {/* Job details */}
      <Dialog open={!!selectedJobDetails} onOpenChange={(o) => !o && setSelectedJobDetails(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl gap-0 overflow-y-auto rounded-md border-line p-0 [&>button]:hidden">
          {selectedJobDetails && (
            <>
              <div className="flex items-start justify-between gap-4 border-b border-line p-6 md:p-8">
                <div>
                  <DialogTitle className="font-heading text-3xl font-semibold">{selectedJobDetails.title}</DialogTitle>
                  <DialogDescription className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem]">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} /> {selectedJobDetails.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={15} /> {selectedJobDetails.jobType}
                    </span>
                  </DialogDescription>
                </div>
                <button
                  onClick={() => setSelectedJobDetails(null)}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-mist hover:text-foreground"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8 p-6 md:p-8">
                <div>
                  <h3 className="font-body text-base font-semibold">About the role</h3>
                  <p className="mt-2 whitespace-pre-line leading-relaxed text-muted-foreground">
                    {selectedJobDetails.description}
                  </p>
                </div>

                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line text-[0.95rem]">
                  {[
                    ["Experience", `${selectedJobDetails.experienceRequired}+ years`],
                    ["Job type", selectedJobDetails.jobType],
                    ["Posted", formatDate(selectedJobDetails.postedDate)],
                    ["Deadline", formatDate(selectedJobDetails.dueDate)],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-white p-4">
                      <dt className="text-sm text-muted-foreground">{k}</dt>
                      <dd className="mt-0.5 font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => {
                      setSelectedJobDetails(null);
                      setSelectedJob(selectedJobDetails);
                    }}
                    className="btn-dark flex-1"
                  >
                    Apply for this position <ArrowRight size={16} />
                  </button>
                  <button onClick={() => setSelectedJobDetails(null)} className="btn-outline">
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Careers;
