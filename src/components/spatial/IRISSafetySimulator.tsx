"use client";

import { useState } from "react";
import { ShieldCheck, ArrowRight, Play, RotateCcw } from "lucide-react";

export default function IRISSafetySimulator() {
  const [selectedAction, setSelectedAction] = useState<string>("fund_transfer");
  const [undoWindow, setUndoWindow] = useState<number>(85);
  const [logs, setLogs] = useState<string[]>([
    "[INIT] IRIS Runtime Safety Governor initialized.",
    "[STATUS] Tool inverse registry loaded: 14 compensating inverses registered.",
    "[CONFORMAL] Alpha-spending budget remaining: α = 0.048",
  ]);

  const actions: Record<
    string,
    {
      label: string;
      risk: "LOW" | "MED" | "CRITICAL";
      inverse: string;
      policy: "EXECUTE" | "HOLD" | "CONFIRM" | "BLOCK";
      effectEnvelope: string;
    }
  > = {
    fund_transfer: {
      label: "Autonomous Wire Execution ($4,500)",
      risk: "CRITICAL",
      inverse: "Compensating ledger reversal pending clearing window",
      policy: "CONFIRM",
      effectEnvelope: "funds_moved > $1000 => requires human authorization token",
    },
    row_mutation: {
      label: "Database Bulk Delete (users WHERE active=false)",
      risk: "MED",
      inverse: "Snapshot diff rollback committed to hold-and-release buffer",
      policy: "HOLD",
      effectEnvelope: "rows_mutated = 3,410 => delta staged in memory buffer",
    },
    safe_retrieval: {
      label: "HNSW Semantic Embedding Query (top-k=15)",
      risk: "LOW",
      inverse: "Read-only idempotent operation; no inverse required",
      policy: "EXECUTE",
      effectEnvelope: "read_only = true => executed without bounds violation",
    },
  };

  const current = actions[selectedAction];

  const handleSimulate = () => {
    const time = new Date().toLocaleTimeString();
    const newLog = `[${time}] ${current.policy} -> "${current.label}" | Inverse: ${current.inverse}`;
    setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
  };

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0c] p-4 text-xs font-mono">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-3">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold">
          <ShieldCheck className="h-4 w-4" />
          <span>IRIS PATENT RUNTIME CONTROLLER</span>
        </div>
        <span className="text-[10px] text-zinc-500">CONFORMAL RISK ENGINE v2.1</span>
      </div>

      {/* Action Selector */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {Object.entries(actions).map(([key, act]) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelectedAction(key)}
            className={`rounded-lg p-2 text-left transition-all ${
              selectedAction === key
                ? "border border-cyan-400/60 bg-cyan-400/10 text-white"
                : "border border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:text-white"
            }`}
          >
            <div className="text-[10px] text-zinc-500 uppercase">{act.risk} RISK</div>
            <div className="text-[11px] font-medium truncate">{key.replace("_", " ")}</div>
          </button>
        ))}
      </div>

      {/* Telemetry Output */}
      <div className="rounded-lg bg-black/60 border border-white/[0.05] p-3 mb-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Action:</span>
          <span className="text-zinc-200">{current.label}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Safety Policy Routing:</span>
          <span
            className={`font-bold px-2 py-0.5 rounded text-[10px] ${
              current.policy === "EXECUTE"
                ? "bg-emerald-500/20 text-emerald-400"
                : current.policy === "HOLD"
                ? "bg-amber-500/20 text-amber-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {current.policy}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Effect Envelope:</span>
          <span className="text-cyan-400/90 text-[10px] truncate max-w-[260px]">
            {current.effectEnvelope}
          </span>
        </div>
      </div>

      {/* Simulation trigger */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={handleSimulate}
          className="flex items-center gap-1.5 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all"
        >
          <Play className="h-3 w-3" />
          <span>Test Trajectory Governor</span>
        </button>

        <span className="text-[10px] text-zinc-500 font-mono">
          Patent: Reversible Action Envelopes
        </span>
      </div>

      {/* Terminal Mini-Log */}
      <div className="mt-3 border-t border-white/[0.06] pt-2 text-[10px] text-zinc-500 space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="truncate text-zinc-400">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
