"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SplitTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  triggerOnScroll?: boolean;
}

export default function SplitText({
  children,
  as: Component = "h2",
  className = "",
  delay = 0,
  triggerOnScroll = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = el.querySelectorAll(".split-word");

    if (prefersReducedMotion) {
      gsap.to(words, { opacity: 1, y: 0, duration: 0.4 });
      return;
    }

    if (triggerOnScroll) {
      const anim = gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.04,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          delay,
        }
      );

      return () => {
        anim.scrollTrigger?.kill();
        anim.kill();
      };
    } else {
      const anim = gsap.fromTo(
        words,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: "power4.out",
          delay,
        }
      );

      return () => {
        anim.kill();
      };
    }
  }, [delay, triggerOnScroll]);

  // Split sentence into words with overflow hidden masks
  const words = children.split(" ");

  return (
    <Component ref={containerRef as any} className={`flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1">
          <span className="split-word inline-block will-change-transform translate-y-full opacity-0">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
