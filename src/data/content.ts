/**
 * Centralized Content Architecture for Ekaagra Gupta's Portfolio
 * Single source of truth for text, links, experiences, projects, and research.
 */

export interface MediaItem {
  src?: string;
  alt: string;
  caption?: string;
  aspectRatio?: "square" | "video" | "wide" | "portrait";
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  location: string;
  type: string;
  period: string;
  status: "Present" | "Completed";
  patentOrCert?: {
    type: "patent" | "certificate";
    label: string;
    url?: string;
  };
  highlights: string[];
  media: MediaItem[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  media: MediaItem;
}

export interface ResearchEntry {
  category: "Patent" | "Peer Review" | "Publication";
  title: string;
  venueOrAssignee: string;
  year: string;
  status?: string;
  description: string;
  link?: string;
}

export interface LeadershipEntry {
  role: string;
  organization: string;
  period?: string;
  summary: string;
  metrics?: string;
}

export const PERSONAL_INFO = {
  name: "Ekaagra Gupta",
  nickname: "Eku",
  title: "AI/ML Researcher & Engineer",
  tagline: "Artificial Intelligence, Machine Learning, and Agentic Systems",
  location: "Jaipur, India",
  email: "ekaagrag2006@gmail.com",
  phone: "+91-9773366055",
  availability: "Open to Research Internships & AI Engineering Roles",
  education: {
    institution: "Manipal University Jaipur",
    degree: "B.Tech (Honors) in Computer Science with specialization in AI and ML",
    period: "2024 – 2028",
  },
  links: {
    github: "https://github.com/ekaagragupta",
    linkedin: "https://www.linkedin.com/in/ekaagragupta/",
    resume: "/media/resume.pdf",
    leetcode: "https://leetcode.com/u/ekaagragupta",
  },
};

export const ABOUT_CONTENT = {
  sectionLabel: "01 / ABOUT",
  headline: "⟡ ⋆ why code works, not just syntax ⋆ ⟡",
  narrative: [
    "I specialize in bridging statistical machine learning rigor with production-grade engineering. My work focuses on runtime safety governors for tool-using LLMs, Evidential Deep Learning for high-stakes spatio-temporal risk anticipation, and sub-second hybrid retrieval RAG architectures.",
    "From formalizing action reversibility as minimum-cost compensating path searches over tool inverse registries to calibrating abstaining agents under extreme distribution shift, I engineer systems that know precisely when to act, when to hedge, and when to block irreversible execution.",
  ],
  stats: [] as { label: string; value: string; change: string }[],
  focusAreas: [
    {
      title: "Internships",
      desc: "4",
    },
    {
      title: "Projects",
      desc: "3",
    },
    {
      title: "Research Publications & Patents",
      desc: "2",
    },
  ],
  photo: {
    src: "/media/profile-about.jpg",
    alt: "Ekaagra Gupta ",
    caption: "Jaipur, India",
  },
};

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: "csir-nidsa",
    role: "AI Research Intern",
    organization: "CSIR - National Institute of Data Science and AI (CSIR-NIDSA)",
    location: "Remote / Research Labs",
    type: "Computer Vision & Uncertainty",
    period: "Oct 2026 – Present",
    status: "Present",
    highlights: [
      "Developing an Evidential Spatio-Temporal Action Anticipation framework for proactive road-safety monitoring, integrating video-based motion representations and temporal attention to predict high-risk interactions and near-miss events before occurrence.",
      "Engineering an Evidential Deep Learning (EDL) risk-estimation module using Dirichlet-distributed predictive outputs to quantify epistemic uncertainty, distinguish reliable hazard predictions from overconfident predictions, and enable uncertainty-aware warning and alarm suppression.",
      "Integrating domain-robust visual representations through Domain-Adversarial Neural Networks (DANN) and investigating Test-Time Adaptation (TTA) to improve prediction reliability under distribution shifts involving adverse weather and camera perspective variations.",
      "Establishing a comparative evaluation pipeline using DoTA and DAD traffic-video datasets, benchmarking against Softmax classifiers, MC-Dropout, and Deep Ensembles via early-warning precision, anticipation lead time, and Expected Calibration Error (ECE).",
    ],
    media: [
      {
        src: "/media/exp-csir-nidsa-1.gif",
        alt: "CSIR-NIDSA Evidential Spatio-Temporal Action Anticipation",
        caption: "Dirichlet-distributed EDL uncertainty quantification on DoTA benchmark",
        aspectRatio: "video",
      },
      {
        src: "/media/exp-csir-nidsa-1.jpg",
        alt: "CSIR-NIDSA Research Artifacts",
        caption: "Test-time adaptation curves and epistemic uncertainty metrics",
        aspectRatio: "video",
      },
    ],
  },
  {
    id: "mnit-jaipur",
    role: "AI Intern (Onsite)",
    organization: "Malaviya National Institute of Technology (MNIT) Jaipur",
    location: "Jaipur, India",
    type: "Onsite Internship",
    period: "May 2026 – Jul 2026",
    status: "Completed",
    patentOrCert: {
      type: "certificate",
      label: "Certificate of Completion",
    },
    highlights: [
      "Led a production-scale hybrid RAG pipeline indexing 50,000 documents into 50,003 retrieval chunks using BM25, HNSW, and Qwen3-Embedding-4B (2560-dim embeddings), with top-15 hybrid retrieval and multi-query retrieval.",
      "Implemented multi-stage reranking using Qwen3-Reranker-4B, ColBERT, and Reciprocal Rank Fusion (RRF), improving Recall@15 by 66.4% over baseline retrieval.",
      "Reduced average retrieval latency from 420ms to 305ms (27.4%); redesigned metadata generation to cut preprocessing time by 42% and metadata footprint from 14MB to 1.4MB.",
      "Optimized large-scale inference workflows using vLLM, Hugging Face Transformers, and PyTorch on NVIDIA GPUs; benchmarked retrieval quality (Recall@K, MRR, NDCG) and profiled latency and memory across the pipeline.",
    ],
    media: [
      {
        src: "/media/exp-mnit-1.jpg",
        alt: "MNIT Jaipur Internship Certificate and Research Validation",
        caption: "MNIT Jaipur Onsite Internship Certificate & Benchmark Runs",
        aspectRatio: "video",
      },
    ],
  },
  {
    id: "ethify-ai",
    role: "AI Research Intern (Remote)",
    organization: "EthifyAI",
    location: "Remote",
    type: "Research & Optimization",
    period: "May 2026 – Jul 2026",
    status: "Completed",
    patentOrCert: {
      type: "certificate",
      label: "Certificate of Completion",
    },
    highlights: [
      "Evaluated hybrid retrieval using Qwen3-Embedding-4B with BM25, RRF, and multiple neural reranking strategies (Qwen3-Reranker-4B, ColBERT), profiling GPU and host-memory consumption, latency, and throughput across retrieval, embedding, reranking, and inference stages.",
      "Investigated trade-offs between retrieval quality, latency, and memory footprint across configurations to inform memory-aware deployment optimization on resource-constrained inference pods.",
    ],
    media: [
      {
        src: "/media/exp-ethify-1.jpg",
        alt: "EthifyAI Hybrid Retrieval Profiling",
        caption: "Memory-aware deployment optimization profiles and throughput audits",
        aspectRatio: "video",
      },
    ],
  },
  {
    id: "coregen",
    role: "AI/ML Intern (Hybrid)",
    organization: "CoreGen",
    location: "Hybrid",
    type: "Computer Vision & Edge ML",
    period: "Mar 2026 – May 2026",
    status: "Completed",
    patentOrCert: {
      type: "certificate",
      label: "Certificate of Completion",
    },
    highlights: [
      "Built a multi-frame (3+1) super-resolution reconstruction pipeline for satellite imagery, combining optical flow with Fourier-based neural warping to reconstruct 64×64 → 256×256 high-resolution detail, with a custom GPU-optimized dataset and training pipeline.",
      "Explored lightweight object detection (MobileNet SSD) and real-time anomaly detection for traffic analysis, evaluating ROS, TensorFlow Lite, and OpenCV for on-device inference.",
    ],
    media: [
      {
        src: "/media/exp-coregen-1.jpg",
        alt: "CoreGen Satellite Super-Resolution (3+1) Reconstruction",
        caption: "64×64 → 256×256 High-Resolution Warping Pipeline Artifacts",
        aspectRatio: "video",
      },
    ],
  },
];

export const PROJECTS: ProjectEntry[] = [
  {
    id: "evidential-conformal-anticipation",
    title: "Evidential Conformal Anticipation",
    subtitle: "Finite-Sample Conformal Risk Calibration for Video Action Prediction",
    description:
      "A causal spatiotemporal anticipation pipeline using pretrained Swin3D-T feature extraction and multi-head self-attention Transformers for accident risk estimation. Features Dirichlet-based Evidential Deep Learning (softplus parameterization, expected categorical NLL, KL regularization) and finite-sample conformal alarm calibration with Adaptive Conformal Inference (ACI) and Test-Time Adaptation (TENT).",
    tags: ["PyTorch", "EDL", "Conformal Risk Control", "Swin3D-T", "Transformers", "Test-Time Adaptation", "DoTA"],
    githubUrl: "https://github.com/ekaagragupta/evidential-conformal-anticipation", // GITHUB_URL placeholder
    liveUrl: "https://github.com/ekaagragupta",
    featured: true,
    metrics: [
      { label: "Architecture", value: "Swin3D-T + Causal Masking" },
      { label: "Calibration", value: "Dirichlet EDL + ACI" },
      { label: "Target", value: "Zero False Alarms" },
    ],
    media: {
      src: "/media/proj-conformal.gif",
      alt: "Evidential Conformal Anticipation video anticipation workflow",
      caption: "Causal spatio-temporal video prediction under environmental distribution shifts",
      aspectRatio: "video",
    },
  },
  {
    id: "care-rag-evaluator",
    title: "CARE — Calibrated Abstaining RAG Evaluator",
    subtitle: "Triple-Signal Uncertainty Quantification & Platt-Scaled Abstention",
    description:
      "A self-assessing RAG pipeline that quantifies uncertainty across retrieval, reranking, and generation using three independent confidence signals (FAISS IndexFlatIP, cross-encoder ms-marco-MiniLM sigmoid scoring, and 5x sampled LLM self-consistency). Platt-scaled to correct systematic underconfidence (ECE 0.1545 → 0.0042) with monotonically decreasing accuracy across decision tiers (ANSWER 88.4%, HEDGE 63.3%, ABSTAIN 33.3%).",
    tags: ["RAG", "FAISS", "Cross-Encoder", "Platt Scaling", "SQuAD 2.0", "Uncertainty Quantification", "vLLM"],
    githubUrl: "https://github.com/ekaagragupta/care-calibrated-rag", // GITHUB_URL placeholder
    liveUrl: "https://github.com/ekaagragupta",
    featured: true,
    metrics: [
      { label: "ECE Calibration", value: "0.1545 → 0.0042" },
      { label: "Answer Tier Acc", value: "88.4%" },
      { label: "Abstain Correctness", value: "Monotonic Decay" },
    ],
    media: {
      src: "/media/proj-care-rag.gif",
      alt: "CARE RAG Evaluator Calibration Workflow",
      caption: "Platt-scaling reliability curves and confidence-tier abstention matrix",
      aspectRatio: "video",
    },
  }
];

export const RESEARCH_AND_PUBLICATIONS: ResearchEntry[] = [
  {
    category: "Patent",
    title: "GETHER: Generative Emission Temporal Hybrid Explainable Regressor",
    venueOrAssignee: "Indian Patent Office",
    year: "2026",
    status: "Published",
    description: "Novel hybrid explainable regression paradigm combining temporal generative emission models with transparent risk estimators.",
  },

  {
    category: "Peer Review",
    title: "Peer Reviewer — ICGST 2026",
    venueOrAssignee: "Atal Bihari Vajpayee Indian Institute of Information Technology and Management (ABV-IIITM Gwalior)",
    year: "2026",
    status: "Reviewer",
    description: "Invited reviewer evaluating contemporary research in machine learning, signal processing, and intelligent autonomous systems.",
  },
];

export const LEADERSHIP: LeadershipEntry[] = [
  {
    role: "Tech Co-Lead",
    organization: "Google Developer Groups (GDG)",
    period: "2025 – Present",
    summary: "Led 3 extensive technical workshops with over 300 total attendees, expanding GDG campus membership by 20% and mentoring builders in modern cloud architectures.",
    metrics: "300+ Attendees • +20% Growth",
  },
    {
    role: "Facilitator & Rank 12 Leaderboard",
    organization: "Google Cloud Study Jams",
    period: "2025",
    summary: "Facilitated cloud training across 300 students on campus; completed all 24/24 skill badges, achieving Rank 12 nationwide on the program leaderboard.",
    metrics: "Rank 12 Nationwide • 24/24 Badges",
  },
  {
    role: "Joint Head",
    organization: "IEEE Computational Intelligence Society (IEEE CIS)",
    period: "2025 – Present",
    summary: "Spearheaded technical sponsorship acquisition, securing 67+ corporate and academic sponsors for flagship compute hackathons and research symposiums.",
    metrics: "67+ Sponsors Secured",
  },
  {
    role: "Open Source Contributor",
    organization: "GirlScript Summer of Code (GSSoC'25)",
    period: "2025",
    summary: "Contributed deep AI/ML tooling, neural network pipelines, and performant web architecture across 90+ merged pull requests.",
    metrics: "90+ Merged PRs",
  },
  {
    role: "Tech Joint Head",
    organization: "DevForge",
    period: "2025",
    summary: "Oversaw full-stack development, code reviews, and containerized deployments across 24+ engineering projects.",
    metrics: "24+ Projects Shipped",
  }
];

export const TECHNICAL_SKILLS = {
  languages: ["Python", "C++", "C", "SQL","MATLAB"],
  coreML: [
    "PyTorch",
    "Transformers",
    "Scikit-learn",
    "OpenCV",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "CUDA",
  ],
  generativeAI: [
    "LLM Architecture",
    "RAG (BM25 + HNSW + ColBERT)",
    "Agentic AI",
    "LangChain",
    "CrewAI",
    "AutoGPT",
    "LLaMA",
    "LangGraph",
    "Hugging Face",
    "vLLM",
    "FAISS",
  ],
  infrastructure: [
    "Linux",
    "Docker",
    "Git",
    "Google Colab",
    "AWS",
    "ROS",
    "TensorFlow Lite",
  ],
  certifications: [
    { title: "Prompt Engineering & Programming with OpenAI", issuer: "Columbia University" },
    { title: "Data Structures and Algorithms Design", issuer: "SWAYAM - NPTEL" },
    { title: "Generative AI Studio", issuer: "Google Cloud" },
    { title: "Design and Analysis of Algorithms", issuer: "SWAYAM - NPTEL" },
  ],
};

export const NAV_LINKS = [
  { label: "About", href: "#about", number: "01" },
  { label: "Experience", href: "#experience", number: "02" },
  { label: "Projects", href: "#projects", number: "03" },
  { label: "Research", href: "#research", number: "04" },
  { label: "Contact", href: "#contact", number: "05" },
];
