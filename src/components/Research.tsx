"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RESEARCH_AND_PUBLICATIONS,
  LEADERSHIP,
  TECHNICAL_SKILLS,
} from "@/data/content";
import SplitText from "./SplitText";
import { BookOpen, Users, ArrowUpRight, Award, FileBadge } from "lucide-react";

export default function Research() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const rows = container.querySelectorAll(".editorial-row");
    const anim = gsap.fromTo(
      rows,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section id="research" ref={containerRef} className="relative py-28 sm:py-36 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <BookOpen className="h-3.5 w-3.5" />
          <span>04 / RESEARCH, PATENTS & LEADERSHIP</span>
        </div>

        <div className="mb-16 max-w-3xl">
          <SplitText as="h2" className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Patents, Scholarly Review & Community
          </SplitText>
          <p className="mt-4 font-mono text-sm text-zinc-400">
            Intellectual property filings, peer reviewing for academic conferences, and technical leadership across communities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Patents & Scholarly Contributions */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 font-mono text-xs uppercase tracking-wider text-zinc-400">
              <Award className="h-4 w-4 text-cyan-400" />
              <span>Patents & Peer Review Roles</span>
            </div>

            <div className="flex flex-col divide-y divide-white/[0.06]">
              {RESEARCH_AND_PUBLICATIONS.map((item, idx) => (
                <div
                  key={idx}
                  className="editorial-row group py-6 transition-all duration-300 hover:pl-2"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                        {item.category}
                      </span>
                      <span className="font-mono text-xs text-zinc-500">{item.year}</span>
                    </div>
                    {item.status && (
                      <span className="font-mono text-[11px] text-emerald-400">
                        {item.status}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <div className="mt-1 font-mono text-xs text-zinc-400">
                    {item.venueOrAssignee}
                  </div>

                  <p className="mt-2.5 font-mono text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Certifications Block */}
            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#121212]/70 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan-400 mb-4">
                <FileBadge className="h-4 w-4" />
                <span>Academic & Industry Certifications</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TECHNICAL_SKILLS.certifications.map((cert, cIdx) => (
                  <div key={cIdx} className="flex flex-col border-l-2 border-cyan-400/30 pl-3">
                    <span className="text-sm font-semibold text-white">{cert.title}</span>
                    <span className="font-mono text-xs text-zinc-500">{cert.issuer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leadership & Organization Roles */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 font-mono text-xs uppercase tracking-wider text-zinc-400">
              <Users className="h-4 w-4 text-cyan-400" />
              <span>Leadership & Impact</span>
            </div>

            <div className="flex flex-col gap-4">
              {LEADERSHIP.map((lead, lIdx) => (
                <div
                  key={lIdx}
                  className="editorial-row rounded-xl border border-white/[0.08] bg-[#121212]/90 p-5 transition-all duration-300 hover:border-cyan-400/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white">{lead.role}</h3>
                      <div className="font-mono text-xs text-cyan-400">{lead.organization}</div>
                    </div>
                    {lead.period && (
                      <span className="font-mono text-[11px] text-zinc-500 shrink-0">
                        {lead.period}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 font-mono text-xs text-zinc-300 leading-relaxed">
                    {lead.summary}
                  </p>

                  {lead.metrics && (
                    <div className="mt-3 inline-block rounded bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-zinc-400">
                      {lead.metrics}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
