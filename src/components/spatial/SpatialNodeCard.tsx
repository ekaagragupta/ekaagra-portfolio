"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Move, Maximize2 } from "lucide-react";

interface SpatialNodeCardProps {
  id: string;
  title: string;
  category: string;
  coordinate: string;
  badge?: string;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  initialRotation?: number;
  depth?: "foreground" | "midground" | "background";
  accentColor?: "cyan" | "indigo" | "emerald";
  className?: string;
  onFocusCard?: (id: string) => void;
}

export default function SpatialNodeCard({
  id,
  title,
  category,
  coordinate,
  badge,
  children,
  initialRotation = 0,
  depth = "midground",
  accentColor = "cyan",
  className = "",
  onFocusCard,
}: SpatialNodeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const accentStyles = {
    cyan: "border-cyan-400/30 hover:border-cyan-400/70 text-cyan-400",
    indigo: "border-indigo-400/30 hover:border-indigo-400/70 text-indigo-400",
    emerald: "border-emerald-400/30 hover:border-emerald-400/70 text-emerald-400",
  }[accentColor];

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(Draggable);

    const card = cardRef.current;
    const handle = handleRef.current;
    if (!card || !handle) return;

    // Check touch or small viewport: disable free drag on mobile to prevent trapping touch events
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const draggableInstance = Draggable.create(card, {
      type: "x,y",
      trigger: handle,
      edgeResistance: 0.75,
      cursor: "grab",
      activeCursor: "grabbing",
      onPress: function () {
        // Elevate z-index on interaction
        gsap.to(card, { scale: 1.02, zIndex: 50, duration: 0.2 });
        if (onFocusCard) onFocusCard(id);
      },
      onRelease: function () {
        gsap.to(card, { scale: 1, duration: 0.2 });
      },
    });

    return () => {
      draggableInstance[0]?.kill();
    };
  }, [id, onFocusCard]);

  return (
    <div
      ref={cardRef}
      id={`node-${id}`}
      style={{
        transform: `rotate(${initialRotation}deg)`,
      }}
      className={`group relative rounded-2xl border border-white/[0.09] bg-[#101010]/95 p-6 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-cyan-500/10 ${className}`}
    >
      {/* Draggable Header Bar / Handle */}
      <div
        ref={handleRef}
        className="flex items-center justify-between border-b border-white/[0.07] pb-3 mb-4 cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400/80 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            {coordinate}
          </span>
          <span className="text-zinc-600 font-mono text-[10px]">•</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400/90 font-medium">
            {category}
          </span>
        </div>

        <div className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-300 transition-colors">
          {badge && (
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] text-zinc-400">
              {badge}
            </span>
          )}
          <span className="hidden lg:flex items-center gap-1 font-mono text-[10px] text-zinc-600 group-hover:text-zinc-400">
            <Move className="h-3 w-3" />
            <span>DRAG</span>
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
        {title}
      </h3>

      {/* Node Content */}
      <div className="relative">{children}</div>

      {/* Corner crosshairs */}
      <div className="pointer-events-none absolute -top-1 -left-1 h-2 w-2 border-t-2 border-l-2 border-white/20" />
      <div className="pointer-events-none absolute -top-1 -right-1 h-2 w-2 border-t-2 border-r-2 border-white/20" />
      <div className="pointer-events-none absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 border-white/20" />
      <div className="pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 border-white/20" />
    </div>
  );
}
