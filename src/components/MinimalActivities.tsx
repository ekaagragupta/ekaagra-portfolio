"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LEADERSHIP, LeadershipEntry } from "@/data/content";

export function MinimalActivities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".activity-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".activities-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="activities" className="community page-wrap py-24 sm:py-28">
      {/* Section Label */}
      <div className="minimal-divider">
        <span>COMMUNITY &amp; LEADERSHIP</span>
        <span>INITIATIVES &amp; MENTORSHIP</span>
      </div>

      {/* Editorial Headline */}
      <h2 className="section-heading-lg text-white">
        Technical initiatives,
        <br />
        <em className="text-zinc-500 not-italic">mentoring &amp; leadership.</em>
      </h2>

      {/* Activities Grid */}
      <div className="activities-grid mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {LEADERSHIP.map((activity: LeadershipEntry, idx: number) => (
          <div
            key={idx}
            className="activity-card group bg-[#111114] border border-white/10 hover:border-[#ff2d78]/40 rounded-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5"
          >
            <div>
              {/* Index & Date */}
              <div className="flex justify-between items-baseline text-[9.5px] font-mono-code text-zinc-400">
                <span className="text-[#ff2d78] font-semibold">
                  0{idx + 1} / LEADERSHIP
                </span>
                <span>{activity.period || "2025"}</span>
              </div>

              {/* Title & Organization */}
              <h3 className="text-lg font-medium text-white tracking-tight mt-4 group-hover:text-[#ff2d78] transition-colors">
                {activity.role}
              </h3>
              <p className="text-xs font-mono-code text-[#ff2d78] mt-1">
                {activity.organization}
              </p>

              {/* Description */}
              <p className="text-[13px] text-zinc-400 leading-relaxed mt-4">
                {activity.summary}
              </p>
            </div>

            {/* Impact Metric */}
            {activity.metrics && (
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono-code text-zinc-400">IMPACT:</span>
                <span className="text-[10.5px] font-mono-code px-2 py-0.5 bg-white/[0.04] text-[#ff2d78] rounded">
                  {activity.metrics}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
