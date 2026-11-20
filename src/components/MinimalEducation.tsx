"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL_INFO } from "@/data/content";

export function MinimalEducation() {
  const sectionRef = useRef<HTMLElement>(null);

  const educationList = [
    {
      period: "2024 — 2028",
      institution: "Manipal University Jaipur",
      degree: "B.Tech in Computer Science and Engineering with specialization in AI & ML",
      location: "Jaipur, Rajasthan",
      highlights: "Research focus on runtime safety governors for tool-using LLMs, conformal risk control, and high-throughput hybrid RAG architectures.",
      badge: "CLASS OF 2028",
    },
    {
      period: "2024",
      institution: "Gyan Aashram School",
      degree: "Class XII (Senior Secondary Examination)",
      location: "Jaipur, Rajasthan",
      highlights: "Foundational mathematics, physics, and computer science.",
      badge: "CLASS XII",
    },
    {
      period: "2022",
      institution: "Warren Academy School",
      degree: "Class X (Secondary School Examination)",
      location: "Jaipur, Rajasthan",
      highlights: "Secondary academic foundational certifications.",
      badge: "CLASS X",
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
      const items = gsap.utils.toArray(".education-row");
      items.forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="education" className="education page-wrap py-20 sm:py-24">
      {/* Section Label */}
      <div className="minimal-divider">
        <span>ACADEMIC BACKGROUND</span>
        <span>EDUCATION</span>
      </div>

      {/* Education List */}
      <div className="mt-14 flex flex-col">
        {educationList.map((edu, idx) => (
          <div
            key={idx}
            className="education-row group py-8 sm:py-10 border-b border-white/10 hover:border-[#ff2d78]/40 transition-colors first:border-t grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
          >
            {/* Period */}
            <div className="md:col-span-3 text-[10.5px] font-mono-code text-zinc-400 uppercase tracking-wider">
              {edu.period}
            </div>

            {/* Institution & Degree */}
            <div className="md:col-span-6">
              <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                {edu.institution}
              </h3>
              <p className="text-sm text-zinc-300 mt-1.5">{edu.degree}</p>
              <p className="text-xs font-mono-code text-zinc-400 mt-1">
                {edu.location}
              </p>
              {edu.highlights && (
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                  {edu.highlights}
                </p>
              )}
            </div>

            {/* Academic Badge */}
            <div className="md:col-span-3 text-left md:text-right mt-2 md:mt-0 font-mono-code">
              <span className="text-[#ff2d78] text-sm font-bold block">
                {edu.badge}
              </span>
              <span className="text-[9.5px] text-zinc-400 block mt-1">
                AI/ML SPECIALIZATION
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
