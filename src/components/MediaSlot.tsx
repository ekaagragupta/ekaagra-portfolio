"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageIcon } from "lucide-react";

export interface MediaSlotProps {
  src?: string;
  alt: string;
  aspectRatio?: "square" | "video" | "wide" | "portrait";
  caption?: string;
  priority?: boolean;
  parallax?: boolean;
  className?: string;
}

export default function MediaSlot({
  src,
  alt,
  aspectRatio = "video",
  caption,
  priority = false,
  parallax = true,
  className = "",
}: MediaSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-[16/10]",
    wide: "aspect-[21/9]",
    portrait: "aspect-[4/5]",
  }[aspectRatio];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const wrapper = imageWrapperRef.current;
    if (!container || !wrapper || !src || imageError) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !parallax) return;

    // Smooth subtle parallax shift (yPercent -8 to +8)
    const anim = gsap.fromTo(
      wrapper,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [src, imageError, parallax]);

  const hasValidImage = src && !imageError;

  return (
    <figure className={`group relative w-full overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className={`relative w-full ${aspectClasses} overflow-hidden rounded-xl border border-white/[0.08] bg-[#121212] transition-colors duration-500 hover:border-cyan-400/40`}
      >
        {hasValidImage ? (
          <div
            ref={imageWrapperRef}
            className="relative h-[116%] w-full -top-[8%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center filter grayscale-[35%] contrast-[105%] transition-all duration-700 group-hover:filter-none"
              onError={() => setImageError(true)}
            />
            {/* Subtle inner obsidian glass vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.05]" />
          </div>
        ) : (
          /* High-fidelity obsidian placeholder frame */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border border-dashed border-white/20 bg-gradient-to-b from-[#141414] to-[#0c0c0c]">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-cyan-400">
              <ImageIcon className="h-6 w-6 stroke-[1.5]" />
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-zinc-300">
              Media Asset Placeholder
            </p>
            <p className="mt-1 font-mono text-[11px] text-zinc-500">
              Drop image here: <span className="text-cyan-400/80">{src || "/public/media/<filename>"}</span>
            </p>
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="mt-2.5 flex items-center gap-2 font-mono text-[11px] tracking-wide text-zinc-500">
          <span className="h-1 w-1 rounded-full bg-cyan-400/60" />
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
