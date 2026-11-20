"use client";

import { useState } from "react";
import Image from "next/image";
import {
  PERSONAL_INFO,
  ABOUT_CONTENT,
  EXPERIENCES,
  PROJECTS,
  RESEARCH_AND_PUBLICATIONS,
  LEADERSHIP,
  TECHNICAL_SKILLS,
} from "@/data/content";
import SpatialNodeCard from "./SpatialNodeCard";
import IRISSafetySimulator from "./IRISSafetySimulator";
import PlattScalingVisualizer from "./PlattScalingVisualizer";
import SpatialCanvasController, { SpatialViewMode } from "./SpatialCanvasController";
import MediaSlot from "../MediaSlot";
import MagneticButton from "../MagneticButton";
import { GithubIcon, LinkedinIcon } from "../Icons";
import {
  ShieldCheck,
  BrainCircuit,
  Database,
  Satellite,
  Compass,
  FileDown,
  Terminal,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function SpatialAICanvas() {
  const [activeLayer, setActiveLayer] = useState<string>("all");
  const [viewMode, setViewMode] = useState<SpatialViewMode>("canvas");

  const resetNodePositions = () => {
    if (typeof window !== "undefined") {
      const cards = document.querySelectorAll("[id^='node-']");
      cards.forEach((card) => {
        (card as HTMLElement).style.transform = "";
      });
    }
  };

  const isVisibleInLayer = (layerCategory: string) => {
    if (activeLayer === "all") return true;
    if (activeLayer === "research" && ["research", "patents", "vision"].includes(layerCategory)) return true;
    if (activeLayer === "systems" && ["agentic", "rag", "uncertainty"].includes(layerCategory)) return true;
    if (activeLayer === "deployments" && ["deployment", "experience", "internship"].includes(layerCategory)) return true;
    return false;
  };

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-12 pt-28 pb-32">
      {/* HUD Spatial Meta Header */}
      <div className="mx-auto max-w-7xl mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
              <Compass className="h-3.5 w-3.5 animate-spin-slow" />
              <span>SPATIAL RESEARCH CANVAS • LATENT SPACE VIEW</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white uppercase leading-none">
              {PERSONAL_INFO.name}
            </h1>
            <p className="mt-2 font-mono text-xs sm:text-sm text-zinc-400">
              {PERSONAL_INFO.title} • {PERSONAL_INFO.education.institution}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-xs text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Interactive Drag & Simulation Canvas</span>
            </span>

            <MagneticButton>
              <a
                href={PERSONAL_INFO.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 font-mono text-xs font-semibold text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all"
              >
                <FileDown className="h-4 w-4" />
                <span>Resume (PDF)</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Main Dynamic Canvas / Grid */}
      <div className="mx-auto max-w-7xl">
        <div
          className={`grid gap-8 transition-all duration-500 ${
            viewMode === "canvas"
              ? "grid-cols-1 lg:grid-cols-12 auto-rows-auto"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {/* NODE 01: Core Researcher Profile & Telemetry (Lg 5 Cols) */}
          {isVisibleInLayer("research") && (
            <div className={viewMode === "canvas" ? "lg:col-span-5" : ""}>
              <SpatialNodeCard
                id="profile"
                title="Ekaagra Gupta (Edu)"
                category="AI Researcher & Engineer"
                coordinate="NODE_01 // 26.9124°N"
                badge="MUJ • CSE AI/ML"
                accentColor="cyan"
              >
                <div className="space-y-4">
                  {/* Dedicated Profile Photo Slot */}
                  {/* INSERT INTERNSHIP/WORK PHOTO HERE -> /public/media/profile-hero.jpg */}
                  <MediaSlot
                    src="/media/profile-hero.jpg"
                    alt="Ekaagra Gupta - Researcher Photo"
                    aspectRatio="portrait"
                    caption="Ekaagra Gupta • Jaipur, India"
                    priority={true}
                    parallax={false}
                  />

                  <p className="font-mono text-xs text-zinc-300 leading-relaxed">
                    Engineering rigorous safety bounds and high-throughput pipelines for autonomous AI systems. Research spans runtime safety governors, spatio-temporal risk anticipation, and sub-second hybrid retrieval.
                  </p>

                  <div className="grid grid-cols-2 gap-2 border-t border-white/[0.08] pt-3 font-mono text-[11px]">
                    <div>
                      <span className="text-zinc-500 block">EDUCATION</span>
                      <span className="text-zinc-200">Manipal University Jaipur</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">PATENTS</span>
                      <span className="text-cyan-400">IRIS Governor (Filed)</span>
                    </div>
                  </div>

                  {/* Quick Connect Links */}
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={PERSONAL_INFO.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-zinc-300 hover:text-cyan-400 hover:border-cyan-400/50"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href={PERSONAL_INFO.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-zinc-300 hover:text-cyan-400 hover:border-cyan-400/50"
                    >
                      <LinkedinIcon className="h-3.5 w-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </SpatialNodeCard>
            </div>
          )}

          {/* NODE 02: Interactive IRIS Safety Governor & Patent Simulator (Lg 7 Cols) */}
          {isVisibleInLayer("agentic") && (
            <div className={viewMode === "canvas" ? "lg:col-span-7" : ""}>
              <SpatialNodeCard
                id="iris-governor"
                title="IRIS: Runtime Safety Governor for LLM Agents"
                category="Patent Pending • IIT Dhanbad"
                coordinate="NODE_02 // SYSTEM_GOVERNOR"
                badge="PATENT FILED 2026"
                accentColor="cyan"
              >
                <div className="space-y-4">
                  <p className="font-mono text-xs text-zinc-300 leading-relaxed">
                    Formalizing action reversibility as minimum-cost compensating path search over a tool inverse registry with time-decayed undo windows. Bounding cumulative expected irreversible harm via Sequential Conformal Risk Control.
                  </p>

                  {/* Interactive IRIS Simulation Terminal */}
                  <IRISSafetySimulator />

                  {/* Media proof */}
                  {/* INSERT INTERNSHIP/WORK PHOTO HERE -> /public/media/proj-iris-agent.gif */}
                  <MediaSlot
                    src="/media/proj-iris-agent.gif"
                    alt="IRIS Agent Safety Governor Flow"
                    caption="IRIS Tool Inverse Registry & Shadow-Execution Verifier"
                    aspectRatio="video"
                    parallax={false}
                  />
                </div>
              </SpatialNodeCard>
            </div>
          )}

          {/* NODE 03: Evidential Spatio-Temporal Action Anticipation (CSIR-NIDSA) (Lg 6 Cols) */}
          {isVisibleInLayer("vision") && (
            <div className={viewMode === "canvas" ? "lg:col-span-6" : ""}>
              <SpatialNodeCard
                id="csir-nidsa"
                title="Evidential Spatio-Temporal Anticipation"
                category="Computer Vision & EDL • CSIR-NIDSA"
                coordinate="NODE_03 // TENSOR_SPACE"
                badge="ACTIVE RESEARCH"
                accentColor="indigo"
              >
                <div className="space-y-4">
                  {/* INSERT INTERNSHIP/WORK PHOTO HERE -> /public/media/proj-conformal.gif */}
                  <MediaSlot
                    src="/media/proj-conformal.gif"
                    alt="Evidential Video Action Anticipation Demo"
                    caption="Swin3D-T + Dirichlet EDL on DoTA & DAD Traffic Datasets"
                    aspectRatio="video"
                    parallax={false}
                  />

                  <ul className="space-y-2 font-mono text-xs text-zinc-300 leading-relaxed pl-1">
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>Dirichlet-distributed predictive outputs quantifying epistemic uncertainty and eliminating overconfident false alarms.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>Domain-Adversarial Neural Networks (DANN) and Test-Time Adaptation (TTA) under rain, glare, and blur.</span>
                    </li>
                  </ul>
                </div>
              </SpatialNodeCard>
            </div>
          )}

          {/* NODE 04: CARE Calibrated Abstaining RAG Evaluator (Lg 6 Cols) */}
          {isVisibleInLayer("uncertainty") && (
            <div className={viewMode === "canvas" ? "lg:col-span-6" : ""}>
              <SpatialNodeCard
                id="care-rag"
                title="CARE: Calibrated Abstaining RAG"
                category="Uncertainty Quantification"
                coordinate="NODE_04 // PLATT_CALIB"
                badge="ECE → 0.0042"
                accentColor="indigo"
              >
                <div className="space-y-4">
                  <p className="font-mono text-xs text-zinc-300 leading-relaxed">
                    Triple-signal uncertainty scoring across retrieval (FAISS IndexFlatIP), reranking (cross-encoder), and 5x LLM self-consistency sampling.
                  </p>

                  {/* Interactive Platt Scaling Visualizer */}
                  <PlattScalingVisualizer />

                  {/* INSERT INTERNSHIP/WORK PHOTO HERE -> /public/media/proj-care-rag.gif */}
                  <MediaSlot
                    src="/media/proj-care-rag.gif"
                    alt="CARE RAG Calibration and Abstention Pipeline"
                    caption="CARE SQuAD 2.0 Platt-Scaling Reliability Curve"
                    aspectRatio="video"
                    parallax={false}
                  />
                </div>
              </SpatialNodeCard>
            </div>
          )}

          {/* NODE 05: Production Scale Hybrid RAG at MNIT Jaipur (Lg 7 Cols) */}
          {isVisibleInLayer("deployment") && (
            <div className={viewMode === "canvas" ? "lg:col-span-7" : ""}>
              <SpatialNodeCard
                id="mnit-rag"
                title="50,000-Chunk Production Hybrid RAG"
                category="Systems & vLLM • MNIT Jaipur"
                coordinate="NODE_05 // HIGH_THROUGHPUT"
                badge="+66.4% RECALL@15"
                accentColor="emerald"
              >
                <div className="space-y-4">
                  {/* INSERT INTERNSHIP/WORK PHOTO HERE -> /public/media/exp-mnit-1.jpg */}
                  <MediaSlot
                    src="/media/exp-mnit-1.jpg"
                    alt="MNIT Jaipur Internship Verification & RAG Evaluation"
                    caption="MNIT Jaipur Internship Validation & High-Recall Pipeline"
                    aspectRatio="video"
                    parallax={false}
                  />

                  <div className="grid grid-cols-3 gap-2 border-y border-white/[0.08] py-3 font-mono text-xs">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">CHUNKS</span>
                      <span className="text-white font-bold">50,003</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">LATENCY</span>
                      <span className="text-emerald-400 font-bold">305ms (-27.4%)</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">METADATA</span>
                      <span className="text-cyan-400 font-bold">1.4MB (-90%)</span>
                    </div>
                  </div>

                  <p className="font-mono text-xs text-zinc-300 leading-relaxed">
                    Dual-encoder BM25 + HNSW with Qwen3-Embedding-4B (2560-dim), multi-stage neural reranking (ColBERT + Qwen3-Reranker-4B + RRF), and vLLM GPU inference profiling.
                  </p>
                </div>
              </SpatialNodeCard>
            </div>
          )}

          {/* NODE 06: Satellite Super-Resolution Reconstruction (CoreGen) (Lg 5 Cols) */}
          {isVisibleInLayer("deployment") && (
            <div className={viewMode === "canvas" ? "lg:col-span-5" : ""}>
              <SpatialNodeCard
                id="coregen-sr"
                title="Satellite Multi-Frame Super-Resolution"
                category="Fourier Neural Warping • CoreGen"
                coordinate="NODE_06 // OPTICAL_FLOW"
                badge="64×64 → 256×256"
                accentColor="emerald"
              >
                <div className="space-y-4">
                  {/* INSERT INTERNSHIP/WORK PHOTO HERE -> /public/media/exp-coregen-1.jpg */}
                  <MediaSlot
                    src="/media/exp-coregen-1.jpg"
                    alt="CoreGen Satellite Imagery Reconstruction Artifacts"
                    caption="Multi-temporal (3+1) Neural Warping Reconstruction"
                    aspectRatio="video"
                    parallax={false}
                  />

                  <p className="font-mono text-xs text-zinc-300 leading-relaxed">
                    Coupled optical flow with Fourier-based spatial warping to reconstruct sub-meter geographic textures, outperforming standard bicubic and ESRGAN baselines.
                  </p>
                </div>
              </SpatialNodeCard>
            </div>
          )}

          {/* NODE 07: Scholarly Patents & Leadership Matrix (Lg 12 Cols Full Width) */}
          {isVisibleInLayer("research") && (
            <div className={viewMode === "canvas" ? "lg:col-span-12" : ""}>
              <SpatialNodeCard
                id="patents-leadership"
                title="Intellectual Property, Peer Review & Community Leadership"
                category="Scholarly & Leadership Archive"
                coordinate="NODE_07 // RESEARCH_LEDGER"
                badge="PATENTS + GDG + IEEE"
                accentColor="cyan"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                  {/* Patents */}
                  <div className="space-y-3 border-r border-white/[0.06] pr-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold block">
                      Intellectual Property (Patents)
                    </span>
                    {RESEARCH_AND_PUBLICATIONS.map((r, i) => (
                      <div key={i} className="rounded-lg bg-black/40 border border-white/[0.05] p-3">
                        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono mb-1">
                          <span>{r.category}</span>
                          <span className="text-emerald-400">{r.status}</span>
                        </div>
                        <h4 className="font-sans text-xs font-bold text-white mb-1">{r.title}</h4>
                        <p className="font-mono text-[11px] text-zinc-400 leading-snug">{r.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Leadership */}
                  <div className="space-y-3 border-r border-white/[0.06] pr-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold block">
                      Leadership & Community
                    </span>
                    {LEADERSHIP.slice(0, 3).map((lead, i) => (
                      <div key={i} className="rounded-lg bg-black/40 border border-white/[0.05] p-3">
                        <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mb-1">
                          <span className="text-white font-medium">{lead.role}</span>
                          <span>{lead.period}</span>
                        </div>
                        <div className="text-cyan-400 font-mono text-[11px] mb-1">{lead.organization}</div>
                        <p className="font-mono text-[11px] text-zinc-400 leading-snug">{lead.summary}</p>
                      </div>
                    ))}
                  </div>

                  {/* Skills & Certifications */}
                  <div className="space-y-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold block">
                      Skills & Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {[...TECHNICAL_SKILLS.languages, ...TECHNICAL_SKILLS.coreML.slice(0, 5), ...TECHNICAL_SKILLS.generativeAI.slice(0, 4)].map(
                        (skill) => (
                          <span
                            key={skill}
                            className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>

                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold block pt-2">
                      Academic Certifications
                    </span>
                    <div className="space-y-1.5">
                      {TECHNICAL_SKILLS.certifications.map((c, i) => (
                        <div key={i} className="text-[11px] font-mono text-zinc-300 border-l border-cyan-400/40 pl-2">
                          <span className="block text-white font-medium">{c.title}</span>
                          <span className="text-[10px] text-zinc-500">{c.issuer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SpatialNodeCard>
            </div>
          )}
        </div>
      </div>

      {/* Floating Spatial Controller Bar */}
      <SpatialCanvasController
        activeLayer={activeLayer}
        onLayerChange={setActiveLayer}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onResetPositions={resetNodePositions}
      />
    </div>
  );
}
