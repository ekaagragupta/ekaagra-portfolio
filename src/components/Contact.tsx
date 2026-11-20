"use client";

import { useState } from "react";
import { PERSONAL_INFO } from "@/data/content";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";
import { Copy, Check, ArrowUp, Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative pt-28 sm:pt-36 pb-12 border-t border-white/[0.08] overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 h-96 w-[700px] bg-cyan-500/10 blur-[130px] rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <Mail className="h-3.5 w-3.5" />
          <span>05 / GET IN TOUCH</span>
        </div>

        {/* Huge Headline with line reveal */}
        <div className="mb-12 max-w-4xl">
          <SplitText as="h2" className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white uppercase leading-none">
            Let&apos;s build something.
          </SplitText>
          <p className="mt-6 max-w-xl font-mono text-sm sm:text-base text-zinc-400 leading-relaxed">
            I am currently open to research collaborations, AI internship opportunities, and engineering roles in safe autonomous agent architectures and calibrated foundation models.
          </p>
        </div>

        {/* Interactive Click-to-Copy Email Card */}
        <div className="mb-20">
          <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-4 rounded-2xl border border-white/10 bg-[#141414] p-3 sm:p-4 backdrop-blur-md">
            <div className="flex items-center gap-3 px-3 py-1 font-mono text-sm sm:text-base text-white">
              <Mail className="h-4 w-4 text-cyan-400" />
              <span>{PERSONAL_INFO.email}</span>
            </div>

            <MagneticButton>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 font-mono text-xs font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-400 hover:text-black"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Footer Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white/[0.08] pt-12 items-center">
          {/* Identity */}
          <div className="md:col-span-5 flex flex-col gap-1">
            <span className="font-mono text-sm font-semibold text-white">
              {PERSONAL_INFO.name} ({PERSONAL_INFO.nickname})
            </span>
            <span className="font-mono text-xs text-zinc-500">
              {PERSONAL_INFO.title} • {PERSONAL_INFO.location}
            </span>
          </div>

          {/* Social Links with Magnetic Hover */}
          <div className="md:col-span-5 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href={PERSONAL_INFO.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href={PERSONAL_INFO.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Resume</span>
              </a>
            </MagneticButton>
          </div>

          {/* Back to Top */}
          <div className="md:col-span-2 flex justify-start md:justify-end">
            <MagneticButton>
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-[#161616] px-4 py-2 font-mono text-xs text-zinc-400 hover:border-cyan-400 hover:text-white transition-all"
                aria-label="Back to top"
              >
                <span>TOP</span>
                <ArrowUp className="h-3.5 w-3.5 text-cyan-400" />
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Subtle Copyright */}
        <div className="mt-12 text-center font-mono text-[11px] text-zinc-600">
          © 2026 Ekaagra Gupta. Built with Next.js App Router, GSAP, Lenis, and Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
