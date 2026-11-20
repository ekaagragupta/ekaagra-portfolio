"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/content";

export function MinimalFooter() {
  return (
    <footer className="footer page-wrap border-t border-white/10 py-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-[10.5px] font-mono-code text-zinc-400 tracking-wider">
      {/* Left */}
      <span className="text-center md:text-left">
        {PERSONAL_INFO.name} ({PERSONAL_INFO.nickname}) · 2026
      </span>

      {/* Center: Live Research / System Indicator with pixel pink pulse */}
      <div className="flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d78] shadow-[0_0_8px_#ff2d78] animate-pulse" />
        <span className="text-zinc-200">AI/ML RESEARCH &amp; AGENTIC SYSTEMS</span>
      </div>

      {/* Right */}
      <span className="text-center md:text-right">
        JAIPUR, RAJASTHAN, INDIA
      </span>
    </footer>
  );
}
