"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/content";

interface NavbarProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export function Navbar({ onOpenContact, onOpenResume }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "RESEARCH", href: "#research" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "ACTIVITIES", href: "#activities" },
    { label: "CADENCE", href: "#activity" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-400 flex items-center justify-between px-6 sm:px-10 ${
        isScrolled
          ? "bg-[#09090b]/85 backdrop-blur-md border-b border-white/[0.07] py-3.5 shadow-lg shadow-black/40"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      {/* Wordmark with pixel pink accent dot */}
      <a
        href="#about"
        className="group flex items-center gap-2 text-[12px] font-bold font-mono-code tracking-[0.16em] text-white transition-colors"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff2d78] shadow-[0_0_8px_#ff2d78] transition-transform duration-300 group-hover:scale-150" />
        <span className="group-hover:text-[#ff2d78] transition-colors">
          EKAAGRA GUPTA
        </span>
      </a>

      {/* Desktop Navigation Links */}
      <nav className="hidden xl:flex items-center gap-7 text-[10.5px] font-mono-code tracking-[0.14em] text-[#a1a1aa]">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hover:text-white transition-colors relative py-1"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Actions */}
      <div className="hidden lg:flex items-center gap-4 text-[10px] font-mono-code tracking-[0.1em]">
        <a
          href={PERSONAL_INFO.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#a1a1aa] hover:text-[#ff2d78] transition-colors inline-flex items-center gap-1"
        >
          <span>GITHUB</span>
          <span className="text-[9px]">↗</span>
        </a>

        <a
          href={PERSONAL_INFO.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#a1a1aa] hover:text-[#ff2d78] transition-colors inline-flex items-center gap-1"
        >
          <span>LINKEDIN</span>
          <span className="text-[9px]">↗</span>
        </a>

        <button
          type="button"
          onClick={onOpenResume}
          className="px-3 py-1.5 rounded border border-white/10 text-white/90 hover:border-[#ff2d78]/60 hover:text-[#ff2d78] transition-all inline-flex items-center gap-1"
        >
          <span>RESUME</span>
          <span className="text-[9px]">↗</span>
        </button>

        <button
          type="button"
          onClick={onOpenContact}
          className="px-3.5 py-1.5 bg-[#ff2d78] text-white font-semibold rounded hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(255,45,120,0.3)] inline-flex items-center gap-1.5"
        >
          <span>CONTACT</span>
          <span>→</span>
        </button>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
        className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
      >
        <span
          className={`w-5 h-[1.5px] bg-white transition-transform duration-300 ${
            mobileMenuOpen ? "rotate-45 translate-y-[4px] bg-[#ff2d78]" : ""
          }`}
        />
        <span
          className={`w-5 h-[1.5px] bg-white transition-transform duration-300 ${
            mobileMenuOpen ? "-rotate-45 -translate-y-[4px] bg-[#ff2d78]" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#09090b]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-xs font-mono-code tracking-[0.12em] text-[#a1a1aa] shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#ff2d78] transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="h-[1px] bg-white/10 my-1" />

          <div className="flex items-center justify-between py-1 text-[11px]">
            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GITHUB ↗
            </a>
            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LINKEDIN ↗
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="text-[#ff2d78] hover:text-white transition-colors"
            >
              RESUME ↗
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full text-center py-2.5 bg-[#ff2d78] text-white font-semibold rounded hover:bg-white hover:text-black transition-colors mt-2"
          >
            GET IN TOUCH →
          </button>
        </div>
      )}
    </header>
  );
}
