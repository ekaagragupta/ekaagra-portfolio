"use client";

import { useState } from "react";
import { Sliders, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export default function PlattScalingVisualizer() {
  const [threshold, setThreshold] = useState<number>(0.72);

  // Derive decision tier based on calibrated confidence
  const getDecision = (conf: number) => {
    if (conf >= 0.78) return { tier: "ANSWER", color: "text-emerald-400", acc: "88.4%", desc: "Direct grounded generation with high confidence" };
    if (conf >= 0.5) return { tier: "HEDGE", color: "text-amber-400", acc: "63.3%", desc: "Generates with epistemic warning caveats" };
    return { tier: "ABSTAIN", color: "text-red-400", acc: "33.3%", desc: "Withholds answer to prevent hallucination" };
  };

  const decision = getDecision(threshold);

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0c] p-4 text-xs font-mono">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-3">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold">
          <Sliders className="h-4 w-4" />
          <span>CARE: PLATT SCALING CALIBRATION</span>
        </div>
        <span className="text-[10px] text-zinc-500">ECE 0.1545 → 0.0042</span>
      </div>

      {/* Interactive slider for Platt-scaled confidence */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1 text-[11px]">
          <span className="text-zinc-400">Sampled Generation Confidence:</span>
          <span className="text-white font-bold font-mono">{(threshold * 100).toFixed(1)}%</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="0.99"
          step="0.01"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[9px] text-zinc-600 mt-1">
          <span>0% (Underconfident)</span>
          <span>50% (Hedge Boundary)</span>
          <span>100% (High Confidence)</span>
        </div>
      </div>

      {/* Dynamic Tier Card */}
      <div className="rounded-lg border border-white/[0.06] bg-black/50 p-3 mb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-zinc-500 text-[10px]">CARE Tri-Signal Decision:</span>
          <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${decision.color} bg-white/[0.04]`}>
            {decision.tier}
          </span>
        </div>
        <p className="text-zinc-300 text-[11px] mb-2">{decision.desc}</p>
        <div className="flex items-center justify-between border-t border-white/[0.05] pt-2 text-[10px]">
          <span className="text-zinc-500">SQuAD 2.0 Tier Accuracy:</span>
          <span className="text-white font-bold">{decision.acc}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500">
        <span>Signals: FAISS + Cross-Encoder + 5x LLM Sample</span>
        <span className="text-cyan-400">Monotonic Validity</span>
      </div>
    </div>
  );
}
