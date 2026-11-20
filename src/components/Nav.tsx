"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PERSONAL_INFO, NAV_LINKS } from "@/data/content";
import MagneticButton from "./MagneticButton";
import { ArrowUpRight, Menu, X, FileText } from "lucide-react";

export default function Nav() {
  const [scrolledDown, setScrolledDown] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > 120 && currentScrollY > lastScrollY + 5) {
        setScrolledDown(true);
      } else if (currentScrollY < lastScrollY - 5 || currentScrollY <= 80) {
        setScrolledDown(false);
      }
      lastScrollY = currentScrollY;

      // Track active section
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          scrolledDown ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
          <nav className="flex items-center justify-between rounded-full border border-white/[0.08] bg-[#0a0a0a]/70 px-5 sm:px-7 py-3 backdrop-blur-md shadow-2xl">
            {/* Identity badge */}
            <Link
              href="#"
              className="group flex items-center gap-2.5 font-mono text-sm tracking-tight text-white"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-400 transition-transform duration-300 group-hover:scale-125" />
              <span className="font-semibold text-white tracking-tight">Ekaagra Gupta</span>
              <span className="hidden sm:inline font-mono text-xs text-zinc-500">
                / {PERSONAL_INFO.nickname}
              </span>
            </Link>

            {/* Desktop Navigation links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`group relative flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                      isActive ? "text-cyan-400 font-medium" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className="text-[10px] text-zinc-600 group-hover:text-cyan-400/80 transition-colors">
                      {link.number}
                    </span>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-cyan-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <MagneticButton>
                <a
                  href={PERSONAL_INFO.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 font-mono text-xs text-cyan-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-black"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Resume</span>
                  <ArrowUpRight className="h-3 w-3 opacity-70" />
                </a>
              </MagneticButton>

              {/* Mobile hamburger button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex md:hidden h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col bg-[#0a0a0a]/95 px-6 pt-24 pb-8 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/[0.08] pb-4 font-mono text-lg text-zinc-300 hover:text-cyan-400"
              >
                <span>{link.label}</span>
                <span className="text-xs text-zinc-600">{link.number}</span>
              </a>
            ))}
            <a
              href={PERSONAL_INFO.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/10 py-3 font-mono text-sm text-cyan-300"
            >
              <FileText className="h-4 w-4" />
              <span>Download Resume</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
