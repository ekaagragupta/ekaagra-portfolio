"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCES, ExperienceEntry } from "@/data/content";
import SplitText from "./SplitText";
import MediaSlot from "./MediaSlot";
import { ChevronDown, Briefcase, Calendar, MapPin, Award } from "lucide-react";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    "iit-dhanbad": true,
    "csir-nidsa": true,
    "mnit-jaipur": false,
    "ethify-ai": false,
    "coregen": false,
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const progress = progressBarRef.current;
    if (!container || !progress) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Timeline progress line draws along the left as user scrolls
    const progressAnim = gsap.fromTo(
      progress,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          end: "bottom 80%",
          scrub: true,
        },
      }
    );

    // Fade-in reveal for timeline cards
    const cards = container.querySelectorAll(".experience-card");
    const cardsAnim = gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
        },
      }
    );

    return () => {
      progressAnim.scrollTrigger?.kill();
      progressAnim.kill();
      cardsAnim.scrollTrigger?.kill();
      cardsAnim.kill();
    };
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative py-28 sm:py-36 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section mono tag */}
        <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <Briefcase className="h-3.5 w-3.5" />
          <span>02 / WORK EXPERIENCE</span>
        </div>

        {/* Section Heading */}
        <div className="mb-16 max-w-3xl">
          <SplitText as="h2" className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Research Internships & Production AI Deployments
          </SplitText>
          <p className="mt-4 font-mono text-sm text-zinc-400">
            Formalizing safety guarantees, high-recall hybrid RAG, and spatio-temporal anticipation models.
          </p>
        </div>

        {/* Timeline Container with Left Progress Line */}
        <div className="relative pl-6 sm:pl-10 md:pl-12">
          {/* Static background hairline */}
          <div className="absolute left-2.5 sm:left-4 top-4 bottom-8 w-[1.5px] bg-white/[0.08]" />

          {/* Animated active progress fill */}
          <div
            ref={progressBarRef}
            className="absolute left-2.5 sm:left-4 top-4 bottom-8 w-[1.5px] bg-gradient-to-b from-cyan-400 via-indigo-400 to-cyan-400 origin-top will-change-transform"
          />

          {/* Experience Cards Stack */}
          <div className="flex flex-col gap-12 sm:gap-16">
            {EXPERIENCES.map((exp: ExperienceEntry, idx: number) => {
              const isOpen = openAccordions[exp.id];
              return (
                <div
                  key={exp.id}
                  className="experience-card relative rounded-2xl border border-white/[0.08] bg-[#111111]/90 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/30"
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[30px] sm:-left-[43px] md:-left-[51px] top-8 flex h-5 w-5 items-center justify-center rounded-full border border-cyan-400/40 bg-[#0a0a0a]">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  </div>

                  {/* Header: Role, Organization, Meta */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1.5">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                          {exp.role}
                        </h3>
                        <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
                          {exp.type}
                        </span>
                        {exp.status === "Present" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Active
                          </span>
                        )}
                      </div>

                      <div className="text-base sm:text-lg font-medium text-cyan-400">
                        {exp.organization}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                        <span>{exp.location}</span>
                      </div>
                      {exp.patentOrCert && (
                        <div className="flex items-center gap-1.5 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-cyan-300">
                          <Award className="h-3.5 w-3.5" />
                          <span>{exp.patentOrCert.label}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Collapsible Highlights Accordion */}
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(exp.id)}
                      className="flex items-center justify-between w-full font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>Key Technical Achievements ({exp.highlights.length})</span>
                      <div className="flex items-center gap-1 text-cyan-400">
                        <span>{isOpen ? "Collapse" : "Expand"}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-400 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-3.5 pl-2 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          {exp.highlights.map((bullet: string, bIdx: number) => (
                            <li key={bIdx} className="flex items-start gap-3">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/80" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Dedicated Media Gallery Area for Proof of Work / Certificates */}
                  <div className="mt-8 border-t border-white/[0.06] pt-6">
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                      Proof of Work & Artifacts ({exp.media.length})
                    </div>
                    <div
                      className={`grid gap-4 ${
                        exp.media.length === 1
                          ? "grid-cols-1"
                          : exp.media.length === 2
                          ? "grid-cols-1 md:grid-cols-2"
                          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      }`}
                    >
                      {exp.media.map((item, mIdx) => (
                        <div key={mIdx}>
                          {/* INSERT INTERNSHIP/WORK PHOTO HERE -> /public/media/{item.src || 'placeholder.jpg'} */}
                          <MediaSlot
                            src={item.src}
                            alt={item.alt}
                            caption={item.caption}
                            aspectRatio={item.aspectRatio || "video"}
                            parallax={false}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
