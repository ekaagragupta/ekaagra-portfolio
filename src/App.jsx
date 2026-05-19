import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowUpRight,
  Binary,
  BrainCircuit,
  CircuitBoard,
  Cpu,
  Database,
  BookUser,
  GitBranch,
  Mail,
  Microscope,
  Network,
  Radar,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import ReactBitsFloatingLines from "./components/FloatingLines";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  "About",
  "Stack",
  "Projects",
  "Research",
  "Achievements",
  "Signal",
];

const contact = {
  email: "ekaagrag2006@gmail.com",
  academicEmail: "ekaagra.2427010368@muj.manipal.edu",
  phone: "+91 9773366055",
  portfolio: "https://ekaagraguptaportfolio.vercel.app",
  github: "https://github.com/ekaagragupta",
  linkedin: "https://linkedin.com/in/ekaagragupta",
};

const techStack = [
  { name: "Python", type: "Core ML", power: 94 },
  { name: "PyTorch & sklearn", type: "Research Models", power: 90 },
  { name: "TensorFlow", type: "Deep Learning", power: 88 },
  { name: "HuggingFace", type: "LLM Systems", power: 86 },
  { name: "LangChain", type: "Agentic RAG", power: 84 },
  { name: "FAISS / Chroma", type: "Vector Databases ", power: 82 },
  { name: "OpenCV", type: "Vision + Geospatial", power: 81 },
  { name: "React", type: "AI Dashboards", power: 89 },
];

const projects = [
  {
    title: "MemoRAG",
    tag: "Memory-Augmented RAG",
    metric: "BGE-M3",
    copy: "A memory-augmented retrieval framework for long-context and multi-hop reasoning, built around global memory compression, surrogate query generation, FAISS retrieval, and grounded LLM responses.",
    stats: [
      "LLMs",
      "FAISS",
      "LangChain",
      "Python",
      "HuggingFace",
      "Transformers",
      " Retrieval Systems",
    ],
    href: "https://github.com/ekaagragupta/mem0RAG",
  },
  {
    title: "SEVAS",
    tag: "Satellite Environmental Intelligence",
    metric: "98%",
    copy: "A satellite-based environmental violation analysis system forecasting violations 2-3 weeks ahead, triaging 1000+ daily reports, and reducing manual enforcement workload through severity intelligence.",
    stats: [
      "LSTM",
      "ViT",
      "NDVI / NDWI",
      "TensorFlow",
      "Keras",
      " OpenCV",
      "NumPy",
      "scikit-learn",
      " Flask",
      "REST",
    ],
    href: "https://github.com/ekaagragupta/sevas",
  },
  {
    title: "GETHER",
    tag: "Patent-Backed Environmental AI",
    metric: "XAI",
    copy: "A Generative Emission Temporal Hybrid Explainable Regressor for AQI forecasting, causal pollutant discovery, SHAP attribution, uncertainty-aware inference, and counterfactual policy simulation.",
    stats: [
      "LSTM",
      "SHAP",
      "Causality",
      "TensorFlow",
      "Scikit-learn",
      "SHAP",
      " Streamlit",
      "Pandas",
      "NumPy",
      "Matplotlib",
    ],
    href: "https://github.com/ekaagragupta/GETHER",
  },
  {
    title: "MCA e-Consultation Analytics",
    tag: "Civic Feedback Intelligence",
    metric: "Live",
    copy: "A web analytics dashboard for stakeholder consultation feedback, sentiment distribution, intent categories, issue tracking, keyword insights, and real-time filtering.",
    stats: ["React", "Charts", "Analytics", "Data Visualization"],
    href: "https://github.com/ekaagragupta/MCA_e-_Consultation",
  },
  {
    title: "CoreGen AI Systems",
    tag: "Internship Build Track",
    metric: "2026",
    copy: "AI/ML internship work building RAG applications, semantic search with vector databases, LLM pipelines, and tool-using agentic workflows connected through REST APIs.",
    stats: ["RAG", "Agents", "APIs"],
  },
];

const achievements = [
  [
    "01",
    "AI/ML Intern at CoreGen",
    "Building LLM-powered RAG applications, semantic search systems, vector database workflows, and agentic AI pipelines.",
  ],
  [
    "02",
    "Google Developer Groups Technical Co-Lead",
    "Leading technical planning and developer workshops across web, cloud, and AI/ML technologies.",
  ],
  [
    "03",
    "DevForge Technical Joint Head",
    "Overseeing full-stack development with a focus on modular architecture and performance optimization.",
  ],
  [
    "04",
    "GSSoC — Open Source Contributor ",
    "Contributed AI/ML and web features following structured open-source workflows.",
  ],
  [
    "05",
    "IEEE CIS — Joint Head, Sponsorship and Curation ",
    "Led sponsorship acquisition aligned with technical event objectives.",
  ],
  [
    "06",
    "Ministry of Education’s Innovation Cell — Innovation Ambassador ",
    "Supported dissemination of startup and innovation frameworks by Participating in national innovation and entrepreneurship programs.",
  ],
];
const researchNodes = [
  { label: "Large Language Models", value: "0.92" },
  { label: "RAG + Vector Search", value: "0.90" },
  { label: "Deep Learning", value: "0.88" },
  { label: "Explainable AI", value: "0.84" },
];

function App() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { damping: 28, stiffness: 180 });
  const smoothY = useSpring(cursorY, { damping: 28, stiffness: 180 });
  const cursorStyle = {
    "--cursor-x": useTransform(smoothX, (value) => `${value}px`),
    "--cursor-y": useTransform(smoothY, (value) => `${value}px`),
  };

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    gsap.utils.toArray(".gsap-rise").forEach((element) => {
      gsap.fromTo(
        element,
        { y: 44, opacity: 0, filter: "blur(12px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
          },
        },
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <motion.main
      className="min-h-screen overflow-hidden bg-[#030712] text-slate-100 selection:bg-cyan-300 selection:text-slate-950"
      style={cursorStyle}
      onMouseMove={(event) => {
        cursorX.set(event.clientX);
        cursorY.set(event.clientY);
      }}
    >
      <ReactiveLight />
      <MainFrameBackground />
      <SiteNav />
      <Hero />
      <About />
      <TechMatrix />
      <Projects />
      <Research />
      <Achievements />
      <Contact />
    </motion.main>
  );
}

function SiteNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/8 bg-[#030712]/68 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Ekaagra Gupta home"
        >
          <span className="grid size-9 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/8 text-sm font-semibold text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
            EG
          </span>
          <span className="hidden text-sm font-medium text-slate-300 sm:block">
            Ekaagra Gupta
          </span>
        </a>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 md:flex">
          {navItems.map((item) => (
            <a
              href={`#${item.toLowerCase()}`}
              key={item}
              className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-400 transition hover:bg-white/8 hover:text-cyan-100"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/14"
        >
          <Mail size={16} />
          <span className="hidden sm:inline">Transmit</span>
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden px-5 pt-28 sm:px-8"
    >
      <AmbientLines density={22} variant="hero" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,233,0.18),transparent_32%),radial-gradient(circle_at_82%_36%,rgba(168,85,247,0.12),transparent_30%),linear-gradient(180deg,transparent,rgba(3,7,18,0.92)_88%)]" />
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 py-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 26, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/18 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
            <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            AGI command layer online
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 90 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl text-balance text-6xl font-semibold leading-[0.92] tracking-normal text-white sm:text-7xl lg:text-7xl xl:text-8xl"
            >
              Ekaagra Gupta
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-xl font-medium text-cyan-100 sm:text-2xl"
          >
            AI/ML Engineer • Researcher • Developer
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 max-w-2xl text-lg leading-8 text-slate-400"
          >
            3rd-year B.Tech CSE student specializing in AI & ML at Manipal
            University Jaipur, building RAG systems, environmental intelligence
            platforms, and explainable AI products.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#projects" className="premium-button">
              Explore systems
              <ArrowUpRight size={18} />
            </a>
            <a href="#signal" className="ghost-button">
              Open secure channel
              <Radar size={18} />
            </a>
          </motion.div>
        </motion.div>
        <CommandCenter />
      </div>
    </section>
  );
}

function CommandCenter() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.05, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 mx-auto w-full max-w-xl xl:max-w-2xl"
    >
      <div className="absolute -inset-10 rounded-[40px] bg-cyan-400/10 blur-3xl" />
      <div className="os-shell scanline relative overflow-hidden rounded-[28px] border border-white/12 bg-slate-950/58 p-3 shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-rose-300/80" />
            <span className="size-3 rounded-full bg-amber-200/80" />
            <span className="size-3 rounded-full bg-emerald-300/80" />
          </div>
          <span className="text-xs uppercase tracking-[0.28em] text-slate-500">
            ekaagra.ai/os
          </span>
        </div>
        <div className="grid gap-3 p-3 md:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-3">
            <AnalyticsPanel />
            <TerminalPanel />
          </div>
          <div className="space-y-3">
            <NeuralPanel />
            <SignalPanel />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AnalyticsPanel() {
  return (
    <div className="panel p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">
            Model telemetry
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Intelligence stack
          </h2>
        </div>
        <BrainCircuit className="text-cyan-200" size={26} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["RAG", "LLMs", "XAI"].map((label, index) => (
          <div
            key={label}
            className="rounded-lg border border-white/10 bg-white/[0.035] p-3"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              {label}
            </p>
            <motion.div
              className="mt-4 h-1.5 rounded-full bg-cyan-300"
              initial={{ width: 0 }}
              animate={{ width: `${72 + index * 8}%` }}
              transition={{ duration: 1.2, delay: 0.5 + index * 0.12 }}
            />
          </div>
        ))}
      </div>
      <div className="mt-5 h-28 overflow-hidden rounded-xl border border-cyan-300/10 bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(255,255,255,0.02))] p-4">
        <div className="neural-map">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              style={{
                "--i": index,
                "--x": `${(index * 31) % 92}%`,
                "--y": `${(index * 19) % 82}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TerminalPanel() {
  const lines = [
    "load mem0rag --mode=global_memory",
    "forecast sevas --horizon=3_weeks",
    "simulate gether --policy=counterfactual",
  ];

  return (
    <div className="panel p-4 font-mono text-sm">
      <div className="mb-3 flex items-center gap-2 text-cyan-100">
        <Terminal size={16} />
        <span className="text-xs uppercase tracking-[0.22em]">terminal</span>
      </div>
      <div className="space-y-2">
        {lines.map((line, index) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.75 + index * 0.24 }}
            className="text-slate-300"
          >
            <span className="text-cyan-300">~/lab</span> {line}
          </motion.p>
        ))}
        <span className="inline-flex h-4 w-2 translate-y-0.5 animate-pulse bg-cyan-200" />
      </div>
    </div>
  );
}

function NeuralPanel() {
  return (
    <div className="panel relative min-h-56 overflow-hidden p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
          Neural routing
        </p>
        <Network size={20} className="text-cyan-200" />
      </div>
      <svg
        className="absolute inset-x-0 bottom-0 h-52 w-full"
        viewBox="0 0 360 220"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="route" x1="0" x2="1">
            <stop stopColor="#22d3ee" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        {[30, 74, 118, 162].map((y, index) => (
          <motion.path
            key={y}
            d={`M24 ${y} C 100 ${y - 48}, 170 ${y + 68}, 336 ${y + index * 4}`}
            fill="none"
            stroke="url(#route)"
            strokeWidth="1.4"
            strokeOpacity="0.55"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              delay: 0.45 + index * 0.18,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1.2,
            }}
          />
        ))}
        {[42, 96, 166, 244, 318].map((x, index) => (
          <motion.circle
            key={x}
            cx={x}
            cy={index % 2 ? 74 : 146}
            r="5"
            fill="#67e8f9"
            initial={{ opacity: 0.35, scale: 0.8 }}
            animate={{ opacity: [0.35, 1, 0.35], scale: [0.8, 1.25, 0.8] }}
            transition={{
              duration: 2.2,
              delay: index * 0.22,
              repeat: Infinity,
            }}
          />
        ))}
      </svg>
      <div className="relative mt-8 grid grid-cols-2 gap-3">
        {["Leetcode", "ranking", "Gen Ai", "vision"].map((item) => (
          <div
            key={item}
            className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-slate-300"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function SignalPanel() {
  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            system signal
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">98%</p>
        </div>
        <Zap className="text-amber-200" size={24} />
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2">
        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={index}
            className="h-8 rounded-md border border-white/8 bg-cyan-300/10"
            style={{ animationDelay: `${index * 90}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <Section
      id="about"
      eyebrow="⟡ ⋆ why code works, not just syntax ⋆ ⟡|"
      title="About Ekaagra! "
    >
      <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="gsap-rise panel relative overflow-hidden p-6">
          <div className="absolute right-6 top-6 text-cyan-200/70">
            <ShieldCheck size={28} />
          </div>
          <div className="profile-orbit mx-auto mt-2 grid size-52 place-items-center rounded-full border border-cyan-300/18 bg-cyan-300/6">
            <div className="grid size-28 place-items-center rounded-2xl border border-white/12 bg-white/[0.045] text-4xl font-semibold text-white">
              <img
                src="src/assets/photo.png"
                alt="profile"
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {[
              "B.Tech CSE, AI & ML specialization, Manipal University Jaipur",
              "Research interests: LLMs, RAG, multimodal learning, computer vision, XAI",
              "Passionate about systems where intelligence, retrieval, and scale intersect",
            ].map((line) => (
              <div
                key={line}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-slate-300"
              >
                <span className="size-2 rounded-full bg-cyan-300" />
                {line}
              </div>
            ))}
          </div>
        </div>
        <div className="gsap-rise grid gap-4 sm:grid-cols-2">
          {[
            [
              "01",
              "RAG Systems",
              "Built MemoRAG with global memory compression, query rewriting, dense retrieval, and grounded LLM generation.",
            ],
            [
              "02",
              "Environmental AI",
              "Built SEVAS and GETHER around satellite analysis, AQI forecasting, causal reasoning, and policy simulation.",
            ],
            [
              "03",
              "AI Tooling",
              "Works with HuggingFace Transformers, LangChain, LlamaIndex, FAISS, Chroma, REST APIs, Docker, and Git.",
            ],
            [
              "04",
              "Leadership",
              "Technical Co-Lead at GDG, DevForge Technical Joint Head, and active contributor across AI/community programs.",
            ],
          ].map(([number, title, copy]) => (
            <article
              key={title}
              className="panel group p-6 transition duration-500 hover:-translate-y-1 hover:border-cyan-200/24"
            >
              <span className="text-xs font-semibold tracking-[0.24em] text-cyan-200/60">
                {number}
              </span>
              <h3 className="mt-8 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function TechMatrix() {
  return (
    <Section id="stack" eyebrow="Cybernetic Tech Matrix" title="Tech stack">
      <div className="gsap-rise panel overflow-hidden p-5 sm:p-7">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-slate-400">Architecture view</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">
              Models, retrieval, geospatial intelligence, deployment
            </h3>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-cyan-100">
            <CircuitBoard size={17} />
            Neural links active
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="tech-chip"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-white">{tech.name}</h4>
                  <p className="mt-1 text-sm text-slate-500">{tech.type}</p>
                </div>
                {index % 3 === 0 ? (
                  <Cpu size={19} />
                ) : index % 3 === 1 ? (
                  <Database size={19} />
                ) : (
                  <Binary size={19} />
                )}
              </div>
              <div className="mt-6 h-1.5 rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tech.power}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.04 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="AI Product Ecosystem" title="Projects">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="gsap-rise project-card group"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/60">
            {project.tag}
          </p>
          <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
            {project.title}
          </h3>
        </div>
        <span className="rounded-lg border border-cyan-300/18 bg-cyan-300/8 px-3 py-2 font-mono text-sm text-cyan-100">
          {project.metric}
        </span>
      </div>
      <p className="mt-5 leading-7 text-slate-400">{project.copy}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.stats.map((stat) => (
          <span
            key={stat}
            className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300"
          >
            {stat}
          </span>
        ))}
      </div>
      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-white"
        >
          Open repository
          <ArrowUpRight size={16} />
        </a>
      )}
    </motion.article>
  );
}

function Research() {
  return (
    <Section
      id="research"
      eyebrow="Quantum Research Dashboard"
      title="Research signals intelligence."
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="gsap-rise panel relative min-h-[420px] overflow-hidden p-6">
          <AmbientLines density={12} variant="research" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/60">
                experiment graph
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Hypothesis routing
              </h3>
            </div>
            <Microscope className="text-cyan-200" size={26} />
          </div>
          <div className="relative z-10 mt-10 grid gap-4">
            {researchNodes.map((node, index) => (
              <div key={node.label} className="research-row">
                <span>{node.label}</span>
                <div className="h-2 flex-1 rounded-full bg-white/8">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-200"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Number(node.value) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: index * 0.12 }}
                  />
                </div>
                <span className="font-mono text-cyan-100">{node.value}</span>
              </div>
            ))}
          </div>
          <div className="relative z-10 mt-10 rounded-xl border border-white/10 bg-slate-950/44 p-5 font-mono text-sm text-slate-400">
            <p>
              <span className="text-violet-200">aqi(t)</span> = temporal_memory
              + pollutant_causality + uncertainty
            </p>
            <p className="mt-2">
              <span className="text-cyan-200">rag(q)</span> = global_memory +
              surrogate_query + grounded_generation
            </p>
          </div>
        </div>
        <div className="gsap-rise space-y-4">
          {[
            "LLM-powered RAG",
            "Spatio-temporal forecasting",
            "SHAP explainability",
            "Agentic AI workflows",
          ].map((item, index) => (
            <div key={item} className="panel flex items-center gap-4 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-cyan-300/18 bg-cyan-300/8 font-mono text-sm text-cyan-100">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="font-semibold text-white">{item}</h4>
                <p className="mt-1 text-sm text-slate-500">
                  Structured research loops with implementation bias.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Digital Milestone System"
      title="A timeline of technical identity"
    >
      <div className="relative">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/35 to-cyan-300/0 md:block" />
        <div className="space-y-4">
          {achievements.map(([number, title, copy]) => (
            <motion.article
              key={title}
              className="gsap-rise achievement-row"
              whileHover={{ x: 8 }}
            >
              <span className="achievement-index">{number}</span>
              <div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 leading-7 text-slate-400">{copy}</p>
              </div>
              <Sparkles
                className="ml-auto hidden text-cyan-200/70 sm:block"
                size={20}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const [message, setMessage] = useState(
    "Hi Ekaagra, I want to discuss an AI/ML opportunity around RAG, environmental intelligence, or agentic systems.",
  );

  return (
    <section id="signal" className="relative px-5 py-24 sm:px-8">
      <AmbientLines density={14} variant="contact" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
            AI Communication Terminal
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold tracking-normal text-white sm:text-6xl">
            Send a secure transmission.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            For AI/ML internships, research collaborations, RAG systems,
            environmental intelligence, or product-focused AI work.
          </p>
        </div>
        <div className="gsap-rise mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="panel p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl border border-cyan-300/18 bg-cyan-300/8 text-cyan-100">
                <Workflow size={22} />
              </span>
              <div>
                <h3 className="font-semibold text-white">Signal routes</h3>
                <p className="text-sm text-slate-500">Low-friction channels</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <ContactLink
                icon={<Mail size={17} />}
                label="Email"
                value={contact.email}
                href={`mailto:${contact.email}`}
              />
              <ContactLink
                icon={<Mail size={17} />}
                label="MUJ Mail"
                value={contact.academicEmail}
                href={`mailto:${contact.academicEmail}`}
              />
              <ContactLink
                icon={<BookUser size={17} />}
                label="LinkedIn"
                value="linkedin.com/in/ekaagragupta"
                href={contact.linkedin}
              />
              <ContactLink
                icon={<GitBranch size={17} />}
                label="GitHub"
                value="github.com/ekaagragupta"
                href={contact.github}
              />
              <ContactLink
                icon={<Radar size={17} />}
                label="Phone"
                value={contact.phone}
                href={`tel:${contact.phone.replaceAll(" ", "")}`}
              />
            </div>
          </div>
          <form
            className="panel p-5 sm:p-6"
            onSubmit={(event) => {
              event.preventDefault();
              window.location.href = `mailto:${contact.email}?subject=Portfolio%20Transmission&body=${encodeURIComponent(message)}`;
            }}
          >
            <label
              className="text-xs uppercase tracking-[0.24em] text-cyan-200/60"
              htmlFor="transmission"
            >
              transmission payload
            </label>
            <textarea
              id="transmission"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-4 min-h-44 w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 p-4 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40 focus:shadow-[0_0_34px_rgba(34,211,238,0.12)]"
            />
            <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-sm text-slate-500">
                Encrypted visual channel • human readable
              </p>
              <button className="premium-button" type="submit">
                Send signal
                <Send size={17} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ icon, label, value, href }) {
  return (
    <a
      href={href}
      className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm transition hover:border-cyan-300/25 hover:bg-cyan-300/8"
    >
      <span className="flex min-w-0 items-center gap-3 text-slate-300">
        <span className="text-cyan-100">{icon}</span>
        {label}
      </span>
      <span className="min-w-0 truncate text-right text-slate-500">
        {value}
      </span>
    </a>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="relative px-5 py-24 sm:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="gsap-rise mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
            {eyebrow}
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function MainFrameBackground() {
  return (
    <div className="main-frame-background" aria-hidden="true">
      <ReactBitsFloatingLines
        enabledWaves={["top", "middle", "bottom"]}
        lineCount={[10, 15, 20]}
        lineDistance={[8, 6, 4]}
        linesGradient={["#67e8f9", "#38bdf8", "#818cf8", "#c084fc"]}
        topWavePosition={{ x: 8.0, y: 0.75, rotate: -0.35 }}
        middleWavePosition={{ x: 4.6, y: 0.02, rotate: 0.18 }}
        bottomWavePosition={{ x: 2.0, y: -0.72, rotate: -1 }}
        animationSpeed={0.62}
        interactive={true}
        bendRadius={5.0}
        bendStrength={-0.5}
        mouseDamping={0.05}
        parallax={true}
        parallaxStrength={0.16}
        mixBlendMode="screen"
      />
      <div className="main-frame-vignette" />
    </div>
  );
}

function AmbientLines({ density = 18, variant = "default" }) {
  const lines = useMemo(
    () =>
      Array.from({ length: density }, (_, index) => ({
        id: index,
        x: (index * 37) % 100,
        delay: (index % 9) * 0.35,
        duration: 5 + (index % 7) * 0.65,
        opacity: 0.09 + (index % 4) * 0.035,
      })),
    [density],
  );

  return (
    <div
      className={`floating-lines floating-lines-${variant}`}
      aria-hidden="true"
    >
      {lines.map((line) => (
        <span
          key={line.id}
          style={{
            left: `${line.x}%`,
            animationDelay: `${line.delay}s`,
            animationDuration: `${line.duration}s`,
            opacity: line.opacity,
          }}
        />
      ))}
    </div>
  );
}

function ReactiveLight() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] hidden mix-blend-screen md:block reactive-light"
      aria-hidden="true"
    />
  );
}

export default App;
