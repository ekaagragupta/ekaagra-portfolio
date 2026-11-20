"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCES, ExperienceEntry } from "@/data/content";

export function MinimalExperience() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray(".experience-row");
      rows.forEach((row: any) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
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
    <section ref={sectionRef} id="experience" className="experience page-wrap py-24 sm:py-28">
      {/* Section Label Divider */}
      <div className="minimal-divider">
        <span>EXPERIENCE</span>
        <span>2026 — PRESENT</span>
      </div>

      {/* Experience Timeline List */}
      <div className="mt-14 sm:mt-16 flex flex-col">
        {EXPERIENCES.map((item: ExperienceEntry) => (
          <article
            key={item.id}
            className="experience-row group py-10 sm:py-12 border-b border-white/10 hover:border-[#ff2d78]/40 transition-colors duration-300 first:border-t grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10"
          >
            {/* Left: Duration Date */}
            <div className="md:col-span-3">
              <span className="text-[10.5px] font-mono-code tracking-[0.08em] text-zinc-400 uppercase sticky top-24">
                {item.period}
              </span>
            </div>

            {/* Right: Role, Company, Technical Bullets, Meta */}
            <div className="md:col-span-9 flex flex-col min-w-0">
              {/* Role Title with glide arrow */}
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-[clamp(1.4rem,2.8vw,2.2rem)] font-medium tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1">
                  {item.role}
                </h2>
                <span
                  aria-hidden="true"
                  className="font-mono-code text-[#ff2d78] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                >
                  -&gt;
                </span>
              </div>

              {/* Organization & Location */}
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <p className="text-[15px] font-medium text-[#ff2d78]">
                  {item.organization}
                </p>
                {item.patentOrCert && (
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded border border-[#ff2d78]/30 bg-[#ff2d78]/10 text-[#ff2d78]">
                    {item.patentOrCert.label}
                  </span>
                )}
              </div>
              <p className="text-[12px] font-mono-code text-zinc-400 mt-1">
                {item.location} · {item.type}
              </p>

              {/* Technical Bullets */}
              <ul className="mt-5 space-y-2.5 text-[14px] text-zinc-400 leading-relaxed list-disc list-inside">
                {item.highlights.map((bullet, idx) => (
                  <li key={idx} className="marker:text-zinc-600">
                    <span className="text-zinc-200">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Supporting Photograph / Media Gallery Preview */}
              {item.media && item.media.length > 0 && item.media[0].src && (
                <div className="mt-5 flex items-center gap-3">
                  <div
                    onClick={() => setActiveImage(item.media[0].src!)}
                    className="w-16 h-12 rounded border border-white/10 overflow-hidden bg-black/40 cursor-pointer group/thumb relative hover:border-[#ff2d78]/70 transition-all shrink-0"
                    title="Click to expand supporting artifact"
                  >
                    <Image
                      src={item.media[0].src}
                      alt={item.media[0].alt}
                      fill
                      sizes="80px"
                      className="object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-transparent transition-colors" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveImage(item.media[0].src!)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded hover:border-[#ff2d78]/50 cursor-pointer transition-all text-[10px] font-mono-code text-zinc-400 hover:text-white"
                  >
                    <span>VIEW VERIFIED EVIDENCE</span>
                    <span className="text-[#ff2d78]">↗</span>
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#111114] border border-white/20 p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 text-white font-mono-code text-xs hover:text-[#ff2d78]"
            >
              [CLOSE ×]
            </button>

            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-video rounded overflow-hidden">
                <Image
                  src={activeImage}
                  alt="Workplace / Research Evidence"
                  fill
                  sizes="600px"
                  className="object-contain rounded"
                />
              </div>
              <p className="text-center text-[10.5px] font-mono-code text-zinc-400 mt-3">
                Verified Internship / Research Record
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
