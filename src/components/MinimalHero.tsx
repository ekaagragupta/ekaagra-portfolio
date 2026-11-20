"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL_INFO } from "@/data/content";

interface MinimalHeroProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export function MinimalHero({ onOpenContact, onOpenResume }: MinimalHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Title line reveals with skew and slide
      tl.fromTo(
        titleLine1Ref.current,
        { y: 80, opacity: 0, rotateX: 25 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.1, delay: 0.15 }
      )
        .fromTo(
          titleLine2Ref.current,
          { y: 80, opacity: 0, rotateX: 25 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.1 },
          "-=0.85"
        )
        .fromTo(
          copyRef.current?.children ? Array.from(copyRef.current.children) : [],
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          photoRef.current,
          { opacity: 0, scale: 0.94, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=0.9"
        )
        .fromTo(
          metaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );

      // Subtle parallax on the profile photo card when scrolling down
      if (photoRef.current) {
        gsap.to(photoRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="about"
      className="page-wrap min-h-[92vh] pt-32 sm:pt-40 pb-20 flex flex-col justify-between relative"
    >
      <div className="w-full">
        {/* Eyebrow & Status indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10.5px] font-mono-code mb-8">
          <div className="flex items-center gap-2">
            <span className="text-[#ff2d78] tracking-[0.16em] uppercase font-semibold">
              AI/ML RESEARCHER &amp; SYSTEMS ENGINEER
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">JAIPUR, INDIA</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-300 bg-white/[0.03] border border-white/10 px-3 py-1 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d78] shadow-[0_0_8px_#ff2d78] animate-pulse" />
            <span className="text-[9.5px] tracking-wider">{PERSONAL_INFO.availability}</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left: Giant Display Typography */}
          <div className="lg:col-span-8 flex flex-col">
            <h1 className="text-[clamp(3.4rem,11.5vw,9.8rem)] font-medium leading-[0.86] tracking-[-0.06em] text-white overflow-hidden">
              <span ref={titleLine1Ref} className="block will-change-transform">
                EKAAGRA
              </span>
              <span ref={titleLine2Ref} className="block stroke-display will-change-transform">
                GUPTA
              </span>
            </h1>

            <div ref={copyRef} className="mt-8 sm:mt-10 flex flex-col">
              {/* Research thesis statement */}
              <p className="text-[clamp(1.15rem,2vw,1.5rem)] font-normal text-zinc-200 leading-[1.38] tracking-[-0.02em] max-w-[640px]">
                &ldquo;Engineering formal runtime safety governors for autonomous LLM agents and uncertainty-calibrated deep learning under distribution shift.&rdquo;
              </p>

              {/* Bio summary */}
              <p className="mt-5 text-[14px] sm:text-[15px] text-zinc-400 leading-[1.7] max-w-[620px]">
                Undergraduate researcher at Manipal University Jaipur (B.Tech CSE AI/ML). Invented IRIS (runtime safety governor for tool-using agents, patent pending at IIT Dhanbad), developing evidential action anticipation at CSIR-NIDSA, and engineered 50k-chunk hybrid RAG at MNIT Jaipur.
              </p>

              {/* CTAs with hover physics */}
              <div className="mt-9 flex flex-wrap items-center gap-3.5 text-xs font-mono-code">
                <a
                  href="#projects"
                  className="px-5 py-2.5 bg-white text-black font-semibold rounded hover:bg-[#ff2d78] hover:text-white transition-all duration-300 inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span>VIEW PROJECTS</span>
                  <span>→</span>
                </a>

                <a
                  href="#research"
                  className="px-5 py-2.5 border border-white/15 text-zinc-200 font-medium rounded hover:border-[#ff2d78] hover:text-[#ff2d78] transition-all duration-300 inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span>EXPLORE RESEARCH</span>
                  <span>→</span>
                </a>

                <button
                  type="button"
                  onClick={onOpenResume}
                  className="px-5 py-2.5 bg-white/[0.04] border border-white/15 text-zinc-300 rounded hover:border-[#ff2d78] hover:text-[#ff2d78] transition-all inline-flex items-center gap-1.5 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span>RESUME</span>
                  <span>↗</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenContact}
                  className="px-4 py-2.5 text-[#ff2d78] border-b border-[#ff2d78] hover:border-white hover:text-white transition-colors"
                >
                  GET IN TOUCH →
                </button>
              </div>
            </div>
          </div>

          {/* Right: Editorial Photo Frame with subtle pixel pink accent glow */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div
              ref={photoRef}
              className="relative group w-64 sm:w-72 lg:w-[320px] aspect-[4/5] will-change-transform"
            >
              {/* Picture Frame */}
              <div className="relative w-full h-full bg-[#111114] border border-white/10 rounded-lg p-1.5 overflow-hidden transition-all duration-500 group-hover:border-[#ff2d78]/70 group-hover:shadow-[0_0_35px_rgba(255,45,120,0.25)] shadow-2xl">
                {/* INSERT INTERNSHIP/WORK PHOTO HERE -> /public/media/profile-hero.jpg */}
                <div className="relative w-full h-full overflow-hidden rounded-md">
                  <Image
                    src="/media/profile-hero.jpg"
                    alt="Ekaagra Gupta — AI/ML Engineer & Researcher"
                    fill
                    priority
                    sizes="(max-width: 768px) 280px, 320px"
                    className="object-cover object-top grayscale-[15%] contrast-[1.05] brightness-95 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Corner Pixel Pink Accent Crosshairs */}
                <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-[#ff2d78] pointer-events-none" />
                <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-[#ff2d78] pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-[#ff2d78] pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-[#ff2d78] pointer-events-none" />

                {/* Subtitle Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded flex items-center justify-between text-[9px] font-mono-code text-zinc-400">
                  <span className="text-white font-medium">EKAAGRA GUPTA</span>
                  <span className="text-[#ff2d78] font-semibold">MUJ · AI/ML</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Meta Line: Academic metadata + Verified Links */}
      <div
        ref={metaRef}
        className="mt-16 sm:mt-24 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 text-[10.5px] font-mono-code text-zinc-400 leading-relaxed"
      >
        <div>
          <span className="text-white uppercase font-medium">
            {PERSONAL_INFO.education.institution}
          </span>
          <span className="mx-2 text-white/20">·</span>
          <span>{PERSONAL_INFO.education.degree}</span>
          <span className="mx-2 text-white/20">·</span>
          <span>Class of 2028</span>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-zinc-200">
          <a
            href={PERSONAL_INFO.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff2d78] transition-colors"
          >
            GITHUB &gt;
          </a>
          <a
            href={PERSONAL_INFO.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff2d78] transition-colors"
          >
            LINKEDIN &gt;
          </a>
          <a
            href={PERSONAL_INFO.links.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff2d78] transition-colors"
          >
            LEETCODE &gt;
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-[#ff2d78] transition-colors"
          >
            EMAIL &gt;
          </a>
        </div>
      </div>
    </section>
  );
}
