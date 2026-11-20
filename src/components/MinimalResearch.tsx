"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RESEARCH_AND_PUBLICATIONS, ResearchEntry } from "@/data/content";

export function MinimalResearch() {
  const sectionRef = useRef<HTMLElement>(null);

  const researchInterests = [
    {
      title: "Agentic Runtime Safety",
      description: "Minimum-cost compensating path search over tool inverse registries, action reversibility, and shadow execution bounds.",
    },
    {
      title: "Evidential & Conformal ML",
      description: "Dirichlet-distributed predictive outputs, spatio-temporal attention, and finite-sample risk bounds under distribution shift.",
    },
    {
      title: "Calibrated Hybrid RAG",
      description: "Multi-stage neural reranking (BM25 + HNSW + ColBERT), Platt scaling, and uncertainty-aware selective abstention.",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".research-interest-box",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".research-interests-grid",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".research-item-row",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".research-items-list",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="research" className="research page-wrap py-24 sm:py-28">
      {/* Section Label */}
      <div className="minimal-divider">
        <span>RESEARCH &amp; PATENTS</span>
        <span>AREAS OF INQUIRY &amp; INVESTIGATIONS</span>
      </div>

      {/* Editorial Headline */}
      <h2 className="section-heading-lg text-white">
        Theoretical inquiry
        <br />
        <em className="text-zinc-500 not-italic">&amp; empirical systems.</em>
      </h2>

      {/* Research Interests Grid */}
      <div className="mt-14 sm:mt-16">
        <span className="text-[10px] font-mono-code tracking-[0.14em] text-zinc-400 uppercase block mb-6">
          PRIMARY RESEARCH INTERESTS
        </span>

        <div className="research-interests-grid grid grid-cols-1 sm:grid-cols-3 gap-4">
          {researchInterests.map((interest, idx) => (
            <div
              key={idx}
              className="research-interest-box p-5 bg-[#111114] border border-white/10 hover:border-[#ff2d78]/50 rounded-lg transition-colors duration-300"
            >
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d78] shadow-[0_0_6px_#ff2d78]" />
                {interest.title}
              </h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                {interest.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Research Projects Timeline / Entries */}
      <div className="mt-20 sm:mt-24">
        <span className="text-[10px] font-mono-code tracking-[0.14em] text-zinc-400 uppercase block mb-8">
          PATENTS, PEER REVIEW &amp; INVESTIGATIONS
        </span>

        <div className="research-items-list flex flex-col">
          {RESEARCH_AND_PUBLICATIONS.map((item: ResearchEntry, idx: number) => (
            <article
              key={idx}
              className="research-item-row py-10 border-b border-white/10 first:border-t hover:border-white/20 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-3">
                <h3 className="text-[clamp(1.3rem,2.4vw,1.9rem)] font-medium text-white tracking-tight">
                  {item.title}
                </h3>
                <span className="px-2.5 py-1 bg-white/[0.04] border border-white/10 rounded text-[9.5px] font-mono-code text-[#ff2d78] tracking-wider uppercase shrink-0 self-start lg:self-auto">
                  {item.status || item.category}
                </span>
              </div>

              <p className="text-[11px] font-mono-code text-[#ff2d78] mt-2">
                VENUE / REGISTRY: {item.venueOrAssignee} ({item.year})
              </p>

              <div className="mt-4 text-[13.5px] text-zinc-400 leading-relaxed max-w-3xl">
                {item.description}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
