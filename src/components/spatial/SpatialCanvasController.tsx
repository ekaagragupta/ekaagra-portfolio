"use client";

import { useState } from "react";
import { Sliders, Layers, RefreshCw, ZoomIn, Eye } from "lucide-react";

export type SpatialViewMode = "canvas" | "spec-sheet" | "deep-dive";

interface SpatialCanvasControllerProps {
  activeLayer: string;
  onLayerChange: (layer: string) => void;
  viewMode: SpatialViewMode;
  onViewModeChange: (mode: SpatialViewMode) => void;
  onResetPositions?: () => void;
}

export default function SpatialCanvasController({
  activeLayer,
  onLayerChange,
  viewMode,
  onViewModeChange,
  onResetPositions,
}: SpatialCanvasControllerProps) {
  const layers = [
    { id: "all", label: "Global Space" },
    { id: "research", label: "Research & Patents" },
    { id: "systems", label: "Agentic Systems" },
    { id: "deployments", label: "Industry Deployments" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full border border-white/[0.12] bg-[#0c0c0c]/90 px-4 py-2 backdrop-blur-xl shadow-2xl">
      {/* Layer Filter Chips */}
      <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
        <Layers className="h-3.5 w-3.5 text-cyan-400 mr-1 hidden sm:inline" />
        {layers.map((layer) => (
          <button
            key={layer.id}
            type="button"
            onClick={() => onLayerChange(layer.id)}
            className={`rounded-full px-3 py-1 font-mono text-[11px] transition-all ${
              activeLayer === layer.id
                ? "bg-cyan-400 text-black font-semibold shadow-lg shadow-cyan-400/20"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-1 pl-1">
        <button
          type="button"
          onClick={() => onViewModeChange(viewMode === "canvas" ? "spec-sheet" : "canvas")}
          className="flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] text-zinc-300 hover:text-cyan-400 transition-colors"
          title="Toggle Canvas vs Spec Sheet mode"
        >
          <Eye className="h-3.5 w-3.5 text-cyan-400" />
          <span className="hidden md:inline">
            {viewMode === "canvas" ? "Canvas Mode" : "Spec Sheet Mode"}
          </span>
        </button>

        {onResetPositions && (
          <button
            type="button"
            onClick={onResetPositions}
            className="hidden lg:flex items-center gap-1 rounded-full p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            title="Reset dragged node positions"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
