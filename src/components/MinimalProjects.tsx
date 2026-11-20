"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, ProjectEntry } from "@/data/content";

export function MinimalProjects() {
  const [showMore, setShowMore] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const featuredProjects = PROJECTS.slice(0, 3);
  const minorProjects = PROJECTS.slice(3);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".project-card");
      items.forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="work page-wrap py-24 sm:py-28">
      {/* Section Label */}
      <div className="minimal-divider">
        <span>PROJECTS</span>
        <span>03 FEATURED SYSTEMS</span>
      </div>

      {/* Editorial Headline */}
      <h2 className="section-heading-lg text-white">
        Things I&apos;ve
        <br />
        <em className="text-zinc-500 not-italic">engineered &amp; built.</em>
      </h2>

      {/* Featured Projects List */}
      <div className="mt-20 sm:mt-24 flex flex-col gap-24 sm:gap-32">
        {featuredProjects.map((project: ProjectEntry, idx: number) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              key={project.id}
              className="project-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Project Preview visual container */}
              <div
                className={`lg:col-span-7 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                } w-full aspect-[1.45] sm:aspect-[1.55] bg-[#111114] border border-white/10 rounded-lg overflow-hidden shadow-2xl relative group transition-colors duration-500 hover:border-[#ff2d78]/50`}
              >
                {/* INSERT INTERNSHIP/WORK PHOTO HERE -> /public/media/{project.media.src || 'project.gif'} */}
                {project.media.src ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={project.media.src}
                      alt={project.media.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-center filter grayscale-[20%] contrast-[1.05] transition-all duration-700 group-hover:filter-none group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    {project.media.caption && (
                      <div className="absolute bottom-3 left-3 right-3 font-mono-code text-[10px] text-zinc-300 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/10 flex items-center justify-between">
                        <span className="truncate">{project.media.caption}</span>
                        <span className="text-[#ff2d78] text-[9px] uppercase font-semibold">Artifact</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full bg-[#141418] flex items-center justify-center p-8 text-zinc-400 font-mono-code text-xs">
                    {project.title} Preview
                  </div>
                )}
              </div>

              {/* Project Editorial Copy */}
              <div
                className={`lg:col-span-5 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                } flex flex-col`}
              >
                {/* Index / Year */}
                <div className="text-[11px] font-mono-code tracking-[0.14em] text-[#ff2d78] font-semibold">
                  0{idx + 1} / 2026
                </div>

                {/* Project Title */}
                <h3 className="text-[clamp(1.8rem,3.4vw,3.2rem)] font-medium tracking-tight text-white leading-[0.98] mt-3">
                  {project.title}
                </h3>

                {/* Subtitle */}
                <p className="text-[14.5px] font-normal text-zinc-300 mt-3">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-[13.5px] text-zinc-400 leading-[1.68] mt-4">
                  {project.description}
                </p>

                {/* Technical Stack Tags */}
                <span className="text-[10px] font-mono-code tracking-[0.08em] text-zinc-400 uppercase mt-6 block leading-relaxed">
                  {project.tags.join(" · ")}
                </span>

                {/* Action Links */}
                <div className="mt-6 flex flex-wrap items-center gap-5 text-[11px] font-mono-code">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ff2d78] border-b border-[#ff2d78] pb-0.5 hover:text-white hover:border-white transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>LIVE DEMO</span>
                      <span>-&gt;</span>
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ff2d78] border-b border-[#ff2d78] pb-0.5 hover:text-white hover:border-white transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>GITHUB REPO</span>
                      <span>-&gt;</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable Accordion: View More Minor Projects */}
      <div className="mt-24 sm:mt-28 border-t border-white/10">
        <button
          type="button"
          onClick={() => setShowMore(!showMore)}
          aria-expanded={showMore}
          className="w-full py-7 border-b border-white/10 flex items-center justify-between font-mono-code text-white hover:text-[#ff2d78] transition-colors focus-visible:outline-none"
        >
          <div className="flex items-center gap-4 text-xs font-semibold tracking-wider">
            <span className="text-[#ff2d78] text-base font-bold">
              {showMore ? "−" : "+"}
            </span>
            <span>VIEW MORE RESEARCH &amp; MINOR PROJECTS</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-zinc-400 tracking-wider">
            <span>01+ SYSTEMS</span>
            <span
              className={`text-[#ff2d78] transition-transform duration-300 ${
                showMore ? "rotate-180" : ""
              }`}
            >
              ↓
            </span>
          </div>
        </button>

        {showMore && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 pb-4">
            {minorProjects.map((project, mIdx) => (
              <div
                key={project.id}
                className="bg-[#111114] border border-white/10 hover:border-[#ff2d78]/60 rounded-lg p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-baseline justify-between text-[9px] font-mono-code text-zinc-400 gap-3">
                    <span className="text-[#ff2d78] font-semibold">
                      0{mIdx + 4} / SYSTEM
                    </span>
                    <span className="truncate max-w-[200px] text-right uppercase">
                      {project.tags.slice(0, 3).join(" · ")}
                    </span>
                  </div>

                  <h4 className="text-[clamp(1.3rem,2.2vw,1.75rem)] font-medium text-white tracking-tight mt-4">
                    {project.title}
                  </h4>

                  <p className="text-xs font-normal text-[#ff2d78] mt-1.5">
                    {project.subtitle}
                  </p>

                  <p className="text-[13px] text-zinc-400 leading-relaxed mt-3">
                    {project.description}
                  </p>

                  {project.media.src && (
                    <div className="mt-4 w-full h-28 rounded overflow-hidden border border-white/10 bg-black/60 relative group/img">
                      <Image
                        src={project.media.src}
                        alt={project.title}
                        fill
                        sizes="300px"
                        className="object-cover opacity-85 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-300"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[11px] font-mono-code">
                  <span className="text-[9px] text-zinc-400 uppercase">
                    {project.tags.join(" · ")}
                  </span>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ff2d78] hover:text-white transition-colors inline-flex items-center gap-1 shrink-0 ml-3"
                    >
                      <span>REPO</span>
                      <span>→</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
