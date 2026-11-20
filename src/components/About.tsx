"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_CONTENT } from "@/data/content";
import SplitText from "./SplitText";
import MediaSlot from "./MediaSlot";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function About() {
  const narrativeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const narrative = narrativeRef.current;
    if (!narrative) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Word-by-word text reveal scrubbed to scroll (opacity 0.15 -> 1)
    const words = narrative.querySelectorAll(".scrub-word");
    const anim = gsap.fromTo(
      words,
      { opacity: 0.15, color: "#71717a" },
      {
        opacity: 1,
        color: "#f4f4f5",
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: narrative,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 0.8,
        },
      }
    );

    // Animate stats counter triggers
    const stats = statsRef.current;
    let statsAnim: gsap.core.Tween | null = null;
    if (stats) {
      statsAnim = gsap.fromTo(
        stats.querySelectorAll(".stat-item"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stats,
            start: "top 85%",
          },
        }
      );
    }

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
      if (statsAnim) {
        statsAnim.scrollTrigger?.kill();
        statsAnim.kill();
      }
    };
  }, []);

  const fullNarrativeText = ABOUT_CONTENT.narrative.join(" ");
  const narrativeWords = fullNarrativeText.split(" ");

  return (
    <section id="about" className="relative py-28 sm:py-36 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section mono tag */}
        <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{ABOUT_CONTENT.sectionLabel}</span>
        </div>

        {/* Huge Section Heading */}
        <div className="mb-14 max-w-4xl">
          <SplitText as="h2" className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {ABOUT_CONTENT.headline}
          </SplitText>
        </div>

        {/* Content Grid: Narrative Scrub + Second Photo Slot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Scrubbed Narrative */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div
              ref={narrativeRef}
              className="text-lg sm:text-2xl font-light leading-relaxed tracking-tight text-zinc-400"
            >
              {narrativeWords.map((word, i) => (
                <span key={i} className="scrub-word inline-block mr-[0.25em] transition-colors duration-150">
                  {word}
                </span>
              ))}
            </div>

            {/* Core Capabilities */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ABOUT_CONTENT.focusAreas.map((area, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/[0.08] bg-[#121212]/80 p-5 backdrop-blur-sm transition-colors hover:border-cyan-400/40"
                >
                  <div className="mb-2 flex items-center gap-2 font-mono text-xs text-cyan-400 font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>0{i + 1}</span>
                  </div>
                  <h3 className="font-sans text-sm font-semibold text-white mb-1.5">{area.title}</h3>
                  <p className="font-mono text-xs text-zinc-400 leading-normal">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated Second Photo Slot & Quick Identity */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative">
              {/* INSERT INTERNSHIP/WORK PHOTO HERE -> /public/media/profile-about.jpg */}
              <MediaSlot
                src={ABOUT_CONTENT.photo.src}
                alt={ABOUT_CONTENT.photo.alt}
                aspectRatio="portrait"
                caption={ABOUT_CONTENT.photo.caption}
                priority={false}
                parallax={true}
              />
            </div>
          </div>
        </div>

        {/* Animated Statistical Counters */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-t border-white/[0.08] pt-12"
        >
          {ABOUT_CONTENT.stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item flex flex-col rounded-xl border border-white/[0.06] bg-[#111111]/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30"
            >
              <div className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1">
                {stat.value}
              </div>
              <div className="font-sans text-sm font-medium text-zinc-300 mb-1">{stat.label}</div>
              <div className="font-mono text-[11px] text-cyan-400/80">{stat.change}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
