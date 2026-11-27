"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PERSONAL_INFO } from "@/data/content";
import MagneticButton from "./MagneticButton";
import MediaSlot from "./MediaSlot";
import SplitText from "./SplitText";
import { ArrowDown, FileDown, Terminal, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const details = detailsRef.current;
    const media = mediaRef.current;
    if (!details || !media) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      details.children,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.6,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      media,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.4,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden"
    >
      {/* Background ambient radial gradients & obsidian grid lines */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(34,211,238,0.12),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Typography & Callouts */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Status tag */}
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1 font-mono text-xs text-cyan-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                <span>{PERSONAL_INFO.availability}</span>
              </span>
              <span className="font-mono text-xs text-zinc-500">
                {PERSONAL_INFO.location}
              </span>
            </div>

            {/* Huge Headline Split Text */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-white uppercase leading-[0.95]">
              <SplitText delay={0.1} triggerOnScroll={false}>
                {PERSONAL_INFO.name}
              </SplitText>
            </h1>

            <div ref={detailsRef} className="mt-6 flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-mono text-lg sm:text-xl text-cyan-400 font-medium tracking-tight">
                  {PERSONAL_INFO.title}
                </h2>
                <span className="text-zinc-600">•</span>
                <span className="font-mono text-sm text-zinc-400">
                  {PERSONAL_INFO.education.institution}
                </span>
              </div>

              <p className="max-w-xl text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
                Specializing in{" "}
                <span className="text-zinc-200 font-medium">
                  {PERSONAL_INFO.tagline}
                </span>
                . Designing runtime safety governors with action-reversibility bounds and uncertainty-calibrated RAG pipelines.
              </p>

              {/* Research Focus Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-zinc-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                  Conformal Risk Control
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-zinc-300">
                  <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                  Evidential Deep Learning
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-zinc-300">
                  vLLM & RAG Systems
                </span>
              </div>

              {/* Magnetic Action Buttons */}
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <a
                    href={PERSONAL_INFO.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#161616] px-5 py-3 font-mono text-xs text-white transition-all duration-300 hover:border-cyan-400/60 hover:bg-[#1a1a1a] hover:text-cyan-300"
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href={PERSONAL_INFO.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#161616] px-5 py-3 font-mono text-xs text-white transition-all duration-300 hover:border-cyan-400/60 hover:bg-[#1a1a1a] hover:text-cyan-300"
                  >
                    <LinkedinIcon className="h-4 w-4 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href={PERSONAL_INFO.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 font-mono text-xs font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-400 hover:text-black"
                  >
                    <FileDown className="h-4 w-4" />
                    <span>Resume (PDF)</span>
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Dedicated Profile Photo Slot with Parallax */}
          <div ref={mediaRef} className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md sm:max-w-sm lg:max-w-none">
              {/* Decorative accent glow ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-transparent to-transparent opacity-70 blur-xl" />

              {/* INSERT INTERNSHIP/WORK PHOTO HERE -> /public/media/profile-hero.jpg */}
              <MediaSlot
                src="/media/profile-hero.jpg"
                alt="Ekaagra Gupta - AI/ML Researcher"
                aspectRatio="portrait"
                caption="Ekaagra Gupta• Researcher & Engineer"
                priority={true}
                parallax={true}
                className="relative z-10"
              />

              {/* Status pill overlay */}
              <div className="absolute -bottom-3 -left-3 z-20 flex items-center gap-2 rounded-lg border border-white/10 bg-[#0a0a0a]/90 px-3 py-1.5 font-mono text-[11px] text-zinc-300 backdrop-blur-md shadow-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>CSIR-NIDSA Research</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Scroll Indicator */}
      <div className="mx-auto mt-12 flex flex-col items-center">
        <a
          href="#about"
          className="group flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500 hover:text-cyan-400 transition-colors"
        >
          <span>Scroll To Explore</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-cyan-400/80" />
        </a>
      </div>
    </section>
  );
}
