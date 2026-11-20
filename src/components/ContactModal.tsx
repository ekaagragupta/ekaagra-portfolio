"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/content";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Ekaagra,\n\n${message}\n\nBest regards,\n${name}\nEmail: ${email}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#09090b]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#111114] border border-white/15 rounded-lg p-8 sm:p-14 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-[10px] font-mono-code text-zinc-400 hover:text-[#ff2d78] tracking-wider transition-colors"
        >
          [CLOSE ×]
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col justify-center items-start">
            <span className="text-[10px] font-mono-code text-[#ff2d78] tracking-[0.16em] uppercase">
              MESSAGE DISPATCHED
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mt-4">
              Thank you.
            </h2>
            <p className="text-sm text-zinc-400 mt-4 leading-relaxed max-w-md">
              Your default email client has been triggered. Alternatively, you can write directly to{" "}
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#ff2d78] underline">
                {PERSONAL_INFO.email}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 text-xs font-mono-code text-[#ff2d78] border-b border-[#ff2d78] pb-1 hover:text-white hover:border-white transition-colors"
            >
              RETURN TO PORTFOLIO →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-5 flex flex-col">
              <span className="text-[10px] font-mono-code text-[#ff2d78] tracking-[0.16em] uppercase">
                INITIATE CONTACT
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mt-3 leading-tight">
                Let&apos;s build
                <br />
                <em className="text-zinc-500 not-italic">together.</em>
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed mt-4">
                Open to research discussions, AI/ML engineering collaborations, internship opportunities, or academic dialogue.
              </p>
              <div className="mt-8 pt-6 border-t border-white/10 text-[10px] font-mono-code text-zinc-400">
                <span className="block text-white font-medium mb-1">DIRECT INBOX</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#ff2d78] hover:underline">
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="md:col-span-7 flex flex-col gap-5">
              <label className="flex flex-col gap-2 text-[10px] font-mono-code tracking-wider text-zinc-400">
                NAME
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#ff2d78] transition-colors"
                />
              </label>

              <label className="flex flex-col gap-2 text-[10px] font-mono-code tracking-wider text-zinc-400">
                EMAIL
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  className="bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#ff2d78] transition-colors"
                />
              </label>

              <label className="flex flex-col gap-2 text-[10px] font-mono-code tracking-wider text-zinc-400">
                MESSAGE
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Project details, research inquiries, or collaboration scope..."
                  className="bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#ff2d78] transition-colors resize-none"
                />
              </label>

              <button
                type="submit"
                className="mt-4 self-start px-6 py-2.5 bg-[#ff2d78] text-white font-semibold text-xs font-mono-code tracking-wider rounded hover:bg-white hover:text-black transition-colors shadow-[0_0_15px_rgba(255,45,120,0.3)]"
              >
                SEND INQUIRY →
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
