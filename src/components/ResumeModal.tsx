"use client";

import React, { useEffect } from "react";
import { PERSONAL_INFO } from "@/data/content";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#09090b]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#111114] border border-white/15 rounded-lg p-8 sm:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-[10px] font-mono-code text-zinc-400 hover:text-[#ff2d78] tracking-wider transition-colors"
        >
          [CLOSE ×]
        </button>

        <span className="text-[10px] font-mono-code text-[#ff2d78] tracking-[0.16em] uppercase">
          CURRICULUM VITAE / RÉSUMÉ
        </span>

        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mt-3">
          Resume Document
        </h3>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-4">
          To review verified technical qualifications, research projects, and internship contributions, you can inspect the comprehensive timeline on this site, connect on LinkedIn, or download the curriculum vitae directly.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3 text-xs font-mono-code">
          <a
            href={PERSONAL_INFO.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            download="Ekaagra_Gupta_Resume.pdf"
            className="px-4 py-2 bg-[#ff2d78] text-white font-semibold rounded hover:bg-white hover:text-black transition-colors inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,45,120,0.3)]"
          >
            <span>DOWNLOAD RESUME PDF</span>
            <span>↓</span>
          </a>

          <a
            href={PERSONAL_INFO.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-white/20 text-white rounded hover:border-[#ff2d78] hover:text-[#ff2d78] transition-colors"
          >
            LINKEDIN PROFILE →
          </a>
        </div>
      </div>
    </div>
  );
}
