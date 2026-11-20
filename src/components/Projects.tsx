"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, ProjectEntry } from "@/data/content";
import SplitText from "./SplitText";
import MediaSlot from "./MediaSlot";
import MagneticButton from "./MagneticButton";
import { Layers, ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "./Icons";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;

    // Check media query & reduced motion: only pin on desktop (width >= 1024px)
    const isDesktop = window.innerWidth >= 1024;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDesktop || prefersReducedMotion) {
      return;
    }

    const totalWidth = gallery.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollAmount = totalWidth - viewportWidth + 120;

    const pinAnim = gsap.to(gallery, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${scrollAmount}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      pinAnim.scrollTrigger?.kill();
      pinAnim.kill();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-28 sm:py-36 border-t border-white/[0.06] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <Layers className="h-3.5 w-3.5" />
          <span>03 / FEATURED SYSTEMS</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SplitText as="h2" className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Architectures & Implementations
            </SplitText>
            <p className="mt-4 font-mono text-sm text-zinc-400">
              Causal video action anticipation, calibrated abstaining RAG, and runtime safety governors.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span>SCROLL HORIZONTALLY</span>
            <ArrowRight className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Horizontal pinned gallery for desktop, clean stacked layout on mobile */}
      <div ref={triggerRef} className="relative w-full">
        <div
          ref={galleryRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-10 px-4 sm:px-6 lg:px-12 w-full lg:w-max will-change-transform"
        >
          {PROJECTS.map((project: ProjectEntry) => (
            <article
              key={project.id}
              className="group relative flex flex-col justify-between w-full lg:w-[620px] shrink-0 rounded-2xl border border-white/[0.08] bg-[#121212]/90 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50"
            >
              <div>
                {/* Media frame */}
                <div className="mb-6 overflow-hidden rounded-xl">
                  {/* INSERT INTERNSHIP/WORK PHOTO HERE -> /public/media/{project.media.src || 'project.jpg'} */}
                  <MediaSlot
                    src={project.media.src}
                    alt={project.media.alt}
                    caption={project.media.caption}
                    aspectRatio="video"
                    parallax={false}
                  />
                </div>

                {/* Subtitle / Category */}
                <div className="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-cyan-400">
                  {project.subtitle}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Key Metrics Grid */}
                {project.metrics && (
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/[0.06] mb-6 font-mono text-xs">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex flex-col">
                        <span className="text-zinc-500 text-[10px] uppercase">{metric.label}</span>
                        <span className="text-zinc-200 font-semibold truncate">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <MagneticButton>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#181818] px-4 py-2 font-mono text-xs text-white hover:border-cyan-400/60 hover:text-cyan-300 transition-colors"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>Source Code</span>
                    </a>
                  </MagneticButton>

                  {project.liveUrl && (
                    <MagneticButton>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 font-mono text-xs text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Live / Demo</span>
                      </a>
                    </MagneticButton>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
