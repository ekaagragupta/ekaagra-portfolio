"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TECHNICAL_SKILLS } from "@/data/content";

export function MinimalSkills() {
  const sectionRef = useRef<HTMLElement>(null);

  const categories = [
    {
      category: "PROGRAMMING LANGUAGES",
      skills: TECHNICAL_SKILLS.languages,
    },
    {
      category: "CORE MACHINE LEARNING & DEEP LEARNING",
      skills: TECHNICAL_SKILLS.coreML,
    },
    {
      category: "GENERATIVE AI & AGENTIC ARCHITECTURES",
      skills: TECHNICAL_SKILLS.generativeAI,
    },
    {
      category: "INFRASTRUCTURE, TOOLS & PLATFORMS",
      skills: TECHNICAL_SKILLS.infrastructure,
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
      const rows = gsap.utils.toArray(".skill-row");
      rows.forEach((row: any) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="stack page-wrap py-24 sm:py-28">
      {/* Section Label */}
      <div className="minimal-divider">
        <span>TECHNICAL SKILLS</span>
        <span>CURATED ENGINEERING STACK</span>
      </div>

      {/* Editorial Headline */}
      <h2 className="section-heading-lg text-white">
        Languages, tools
        <br />
        <em className="text-zinc-500 not-italic">&amp; architectures.</em>
      </h2>

      {/* Categorized Rows */}
      <div className="mt-16 sm:mt-20 flex flex-col">
        {categories.map((group) => (
          <div
            key={group.category}
            className="skill-row py-6 sm:py-7 border-b border-white/10 hover:border-[#ff2d78]/40 transition-colors duration-300 first:border-t grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline"
          >
            {/* Category Label */}
            <div className="md:col-span-4">
              <span className="text-[10.5px] font-mono-code tracking-[0.1em] text-[#ff2d78] font-semibold uppercase block">
                {group.category}
              </span>
            </div>

            {/* Inline dot-separated skill items */}
            <div className="md:col-span-8">
              <p className="text-[13px] sm:text-[14px] font-mono-code text-zinc-300 leading-relaxed">
                {group.skills.map((skill, sIdx) => (
                  <React.Fragment key={skill}>
                    <span className="hover:text-[#ff2d78] transition-colors cursor-default">
                      {skill}
                    </span>
                    {sIdx < group.skills.length - 1 && (
                      <span className="text-white/20 mx-2 select-none">·</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        ))}

        {/* Certifications Row */}
        <div className="skill-row py-6 sm:py-7 border-b border-white/10 hover:border-[#ff2d78]/40 transition-colors duration-300 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline">
          <div className="md:col-span-4">
            <span className="text-[10.5px] font-mono-code tracking-[0.1em] text-[#ff2d78] font-semibold uppercase block">
              ACADEMIC CERTIFICATIONS
            </span>
          </div>
          <div className="md:col-span-8">
            <div className="space-y-2 text-[13px] font-mono-code text-zinc-300">
              {TECHNICAL_SKILLS.certifications.map((c, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2">
                  <span className="text-white font-medium">{c.title}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-[11px] text-[#ff2d78]/90">{c.issuer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
