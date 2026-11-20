"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL_INFO } from "@/data/content";

interface MinimalContactProps {
  onOpenContact: () => void;
}

export function MinimalContact({ onOpenContact }: MinimalContactProps) {
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
        ".contact-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="contact page-wrap pt-28 pb-24 sm:pt-36 sm:pb-32">
      {/* Section Label */}
      <div className="minimal-divider">
        <span>CONTACT</span>
        <span>COLLABORATION &amp; INQUIRIES</span>
      </div>

      <div className="mt-14 sm:mt-16">
        {/* Eyebrow */}
        <p className="text-[10.5px] font-mono-code tracking-[0.16em] text-[#ff2d78] uppercase font-semibold">
          READY TO COLLABORATE?
        </p>

        {/* Editorial Headline */}
        <h2 className="contact-heading mt-6 text-[clamp(2.5rem,8vw,7.8rem)] font-medium tracking-tight text-white leading-[0.88] break-words">
          LET&apos;S BUILD
          <br />
          <em className="text-zinc-500 not-italic">SOMETHING</em>
          <br />
          EXTRAORDINARY.
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mt-8 sm:mt-10 leading-relaxed font-normal">
          Have an internship opportunity, research project in mind, or want to discuss machine learning, generative AI safety, and engineering solutions?
        </p>

        {/* Primary CTA */}
        <div className="mt-8">
          <button
            type="button"
            onClick={onOpenContact}
            className="text-xs sm:text-sm font-mono-code text-[#ff2d78] border-b border-[#ff2d78] pb-1.5 hover:text-white hover:border-white transition-colors tracking-wider"
          >
            GET IN TOUCH -&gt;
          </button>
        </div>

        {/* Contact Links Row */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-mono-code text-zinc-400">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-[#ff2d78] transition-colors"
          >
            {PERSONAL_INFO.email}
          </a>

          <a
            href={PERSONAL_INFO.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff2d78] transition-colors"
          >
            GitHub -&gt;
          </a>

          <a
            href={PERSONAL_INFO.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff2d78] transition-colors"
          >
            LinkedIn -&gt;
          </a>

          <a
            href={PERSONAL_INFO.links.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff2d78] transition-colors"
          >
            LeetCode -&gt;
          </a>
        </div>
      </div>
    </section>
  );
}
