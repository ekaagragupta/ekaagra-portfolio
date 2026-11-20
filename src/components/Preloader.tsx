"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has already visited in this session
    const hasVisited = sessionStorage.getItem("portfolio_intro_played");
    if (hasVisited) {
      setComplete(true);
      return;
    }

    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("portfolio_intro_played", "true");
        setComplete(true);
      },
    });

    tl.to(counter, {
      val: 100,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(counter.val).toString().padStart(3, "0");
        }
      },
    })
      .to(
        textRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.in",
        },
        "-=0.1"
      )
      .to(curtainRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (complete) return null;

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0a0a0a] p-8 sm:p-14 text-white"
    >
      <div className="w-full flex justify-between items-center font-mono text-xs text-zinc-500 uppercase tracking-widest">
        <span>Ekaagra Gupta</span>
        <span>Obsidian Systems v2.0</span>
      </div>

      <div ref={textRef} className="flex flex-col items-center text-center">
        <div className="font-mono text-6xl sm:text-8xl font-bold tracking-tighter text-white">
          <span ref={counterRef}>000</span>
          <span className="text-cyan-400 font-light">%</span>
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
          Initializing Conformal Runtime
        </p>
      </div>

      <div className="w-full flex justify-between items-center font-mono text-[11px] text-zinc-600">
        <span>JAIPUR, IN</span>
        <span>LAT: 26.9124° N</span>
      </div>
    </div>
  );
}
