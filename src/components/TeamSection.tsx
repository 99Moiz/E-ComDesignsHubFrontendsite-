import TiltCard from "@/components/motion/TiltCard";
import ScrollReveal from "@/components/ScrollReveal";
import { Linkedin, Twitter } from "lucide-react";

// Placeholder team — swap in real names, roles, photos, and links.
const team = [
  { name: "Arjun Mehta", role: "Founder & Creative Director", initials: "AM" },
  { name: "Sara Iqbal", role: "Lead Product Designer", initials: "SI" },
  { name: "Daniyal Raza", role: "Head of Engineering", initials: "DR" },
  { name: "Emily Chen", role: "Growth & SEO Strategist", initials: "EC" },
];

const TeamSection = () => (
  <section className="section-padding border-t border-line">
    <div className="container mx-auto">
      <ScrollReveal>
        <div className="mb-16 max-w-xl">
          <p className="eyebrow mb-4">The people</p>
          <h2 className="font-heading text-3xl font-normal leading-[1.1] sm:text-4xl md:text-5xl">
            Meet the <span className="text-gradient">team</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A small, senior team that stays hands-on from kickoff to launch — no account managers relaying messages.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {team.map((member, i) => (
          <ScrollReveal key={member.name} delay={i * 0.08}>
            <TiltCard max={6} className="group h-full cursor-hover">
              <div className="flex h-full flex-col items-center rounded-2xl border border-line bg-card p-6 text-center transition-colors duration-300 hover:border-primary/30">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 font-heading text-lg font-semibold text-primary">
                  {member.initials}
                </div>
                <h3 className="font-heading text-sm font-semibold">{member.name}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {member.role}
                </p>
                <div className="mt-4 flex gap-2 opacity-60 transition-opacity group-hover:opacity-100">
                  <a href="#" aria-label={`${member.name} on LinkedIn`} className="text-muted-foreground hover:text-primary">
                    <Linkedin size={14} />
                  </a>
                  <a href="#" aria-label={`${member.name} on Twitter`} className="text-muted-foreground hover:text-primary">
                    <Twitter size={14} />
                  </a>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
