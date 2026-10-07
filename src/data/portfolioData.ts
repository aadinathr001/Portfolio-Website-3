/**
 * Portfolio Data Configuration
 * Easily customize these variables to personalize your portfolio.
 */

export interface PortfolioConfig {
  NAME: string;
  ROLE: string;
  SHORT_INTRO: string;
  PROFILE_IMAGE: string;
  RESUME_LINK: string;
  LOCATION: string;
  STATUS: string;
  EMAIL: string;
  GITHUB: string;
  LINKEDIN: string;
  TWITTER: string;
  HUGGINGFACE: string;
}

export const PORTFOLIO_CONFIG: PortfolioConfig = {
  NAME: "Aadinath R",
  ROLE: "AI/ML Engineer & Full-Stack Developer",
  SHORT_INTRO: "I engineer distributed neural architectures, autonomous agent workflows, and resilient full-stack systems. Passionate about turning complex multimodal research into simple, high-impact products.",
  PROFILE_IMAGE: "/src/assets/images/profile_avatar_1791209194369.jpg",
  RESUME_LINK: "#resume",
  LOCATION: "Bengaluru, India",
  STATUS: "",
  EMAIL: "aadinath.r2004@gmail.com",
  GITHUB: "https://github.com/aadinath-r",
  LINKEDIN: "https://linkedin.com/in/aadinath-r",
  TWITTER: "https://x.com/aadinath_dev",
  HUGGINGFACE: "https://huggingface.co/aadinath-r"
};

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  impact: string;
  category: "AI / ML" | "Computer Vision" | "Agentic Systems" | "Full-Stack";
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl: string;
  isFeatured?: boolean;
  metrics?: { label: string; value: string }[];
}

export const FEATURED_PROJECT: ProjectItem = {
  id: "project-omni-vision",
  title: "OmniPercept Neural Engine",
  subtitle: "Real-time Edge Multimodal Perception & Spatial Reasoning",
  description: "A low-latency vision-language model serving system designed for real-time robotic telemetry and zero-shot visual question answering, operating at sub-35ms inference latency.",
  impact: "Achieved 4.2x throughput increase and 47% reduction in GPU VRAM consumption across 1.2M daily visual tokens.",
  category: "Computer Vision",
  technologies: ["PyTorch", "TensorRT", "CUDA", "FastAPI", "WebRTC", "React"],
  imageUrl: "/src/assets/images/project_featured_neural_1791209209904.jpg",
  liveUrl: "https://omni-percept-demo.vercel.app",
  githubUrl: "https://github.com/aadinath-r/omni-percept-engine",
  isFeatured: true,
  metrics: [
    { label: "Inference Latency", value: "32ms" },
    { label: "Throughput Gain", value: "+320%" },
    { label: "Daily Queries", value: "1.2M" }
  ]
};

export const PROJECTS_DATA: ProjectItem[] = [
  FEATURED_PROJECT,
  {
    id: "project-nexus-agents",
    title: "NexusAgent Swarm",
    subtitle: "Hierarchical Multi-Agent Task Orchestration",
    description: "Distributed autonomous agent network featuring dynamic DAG routing, reflective code generation, and verifiable deterministic tool execution.",
    impact: "Automated 82% of enterprise code review workflows with human-in-the-loop safety gating.",
    category: "Agentic Systems",
    technologies: ["Python", "LangGraph", "FastAPI", "TypeScript", "Redis", "Docker"],
    imageUrl: "/src/assets/images/project_agent_flow_1791209224739.jpg",
    liveUrl: "https://nexus-agent-mesh.vercel.app",
    githubUrl: "https://github.com/aadinath-r/nexus-agent-mesh",
    metrics: [
      { label: "Autonomous Success", value: "94.6%" },
      { label: "DAG Depth", value: "12 nodes" }
    ]
  },
  {
    id: "project-vector-hypergraph",
    title: "HyperVector RAG Core",
    subtitle: "Graph-Augmented Semantic Retrieval Engine",
    description: "Hybrid vector + graph knowledge retrieval framework combining sparse BM25, dense HNSW embeddings, and entity relation hops for high-precision document synthesis.",
    impact: "Boosted retrieval context recall from 68% to 92.4% on complex multi-hop technical documentation queries.",
    category: "AI / ML",
    technologies: ["PyTorch", "Qdrant", "Neo4j", "Hugging Face", "Go", "Next.js"],
    imageUrl: "/src/assets/images/project_rag_engine_1791209236235.jpg",
    liveUrl: "https://hypervector-rag.vercel.app",
    githubUrl: "https://github.com/aadinath-r/hypervector-rag-core",
    metrics: [
      { label: "Context Recall", value: "92.4%" },
      { label: "P99 Query Time", value: "14ms" }
    ]
  },
  {
    id: "project-diffusion-canvas",
    title: "LatentFlow Studio",
    subtitle: "Interactive Latent Space Visual Synthesis Canvas",
    description: "WebGPU-accelerated visual experimentation studio providing layer-by-layer attention mask steering and real-time diffusion trajectory manipulation.",
    impact: "Over 8,000 community research stars and deployed as a teaching sandbox in academic machine learning labs.",
    category: "Computer Vision",
    technologies: ["TypeScript", "WebGPU", "PyTorch", "Diffusers", "Tailwind CSS", "Vite"],
    imageUrl: "/src/assets/images/project_featured_neural_1791209209904.jpg",
    liveUrl: "https://latentflow-studio.vercel.app",
    githubUrl: "https://github.com/aadinath-r/latentflow-studio",
    metrics: [
      { label: "WebGPU FPS", value: "60 FPS" },
      { label: "GitHub Stars", value: "8.2k" }
    ]
  },
  {
    id: "project-cloud-mlops",
    title: "Synapse MLOps Platform",
    subtitle: "Zero-Downtime Model Deployment & Drift Sentinel",
    description: "Production observability pipeline tracking statistical concept drift, automated canary rollouts, and shadow inferencing for deep learning models at scale.",
    impact: "Eliminated silent production model degradation, cutting mean-time-to-detection from 4 days to 8 minutes.",
    category: "Full-Stack",
    technologies: ["Kubernetes", "Prometheus", "Kafka", "Python", "React", "PostgreSQL"],
    imageUrl: "/src/assets/images/project_agent_flow_1791209224739.jpg",
    liveUrl: "https://synapse-mlops.vercel.app",
    githubUrl: "https://github.com/aadinath-r/synapse-mlops",
    metrics: [
      { label: "MTTD Reduction", value: "99%" },
      { label: "Cluster Uptime", value: "99.99%" }
    ]
  }
];

export interface ExperienceItemData {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

export const EXPERIENCE_DATA: ExperienceItemData[] = [
  {
    role: "Senior AI/ML Research Engineer",
    company: "NeuralPulse Labs",
    location: "Bengaluru, India (Hybrid)",
    period: "2023 — Present",
    description: "Leading the core inference optimization and vision-language foundation model deployment team for enterprise edge applications.",
    technologies: ["PyTorch", "TensorRT", "CUDA C++", "Triton Server", "Python", "FastAPI", "Ray"],
    highlights: [
      "Architected speculative decoding pipeline for multimodal models, reducing median latency by 43% on edge GPUs.",
      "Engineered automated model quantization (FP8/INT4) workflows with minimal perplexity degradation (<0.4%).",
      "Mentored a team of 6 engineers across distributed training infrastructure and model evaluation benchmarks."
    ]
  },
  {
    role: "Machine Learning & Full-Stack Engineer",
    company: "Kinetix Technologies",
    location: "Bengaluru, India",
    period: "2022 — 2023",
    description: "Built end-to-end predictive telemetry pipelines, autonomous agent decision graphs, and interactive client-facing dashboards.",
    technologies: ["Python", "TensorFlow", "React", "Node.js", "Docker", "PostgreSQL", "Kafka"],
    highlights: [
      "Deployed streaming anomaly detection system handling 450,000 events/sec with sub-second alerting.",
      "Designed and delivered the core analytics web portal used daily by 140+ enterprise operations teams.",
      "Reduced cloud computing costs by 34% through proactive GPU instance scheduling and auto-scaling pods."
    ]
  },
  {
    role: "AI Software Engineering Intern",
    company: "Apex Computational Systems",
    location: "Hyderabad, India",
    period: "2021 — 2022",
    description: "Researched graph neural networks (GNNs) for recommendation systems and developed microservices in Python and TypeScript.",
    technologies: ["Python", "PyTorch Geometric", "FastAPI", "TypeScript", "Redis"],
    highlights: [
      "Implemented heterogeneous graph convolutions that improved cold-start recommendation accuracy by 18%.",
      "Co-authored internal technical documentation and open-source benchmark suites for vector search."
    ]
  }
];

export interface EducationItemData {
  degree: string;
  institution: string;
  location: string;
  period: string;
  field: string;
  grade?: string;
  description: string;
  skills: string[];
  highlights: string[];
}

export const EDUCATION_DATA: EducationItemData[] = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "National Institute of Technology (NIT)",
    location: "Kerala, India",
    period: "2018 — 2022",
    field: "Computer Science & Artificial Intelligence",
    grade: "8.9 / 10 CGPA",
    description: "Comprehensive curriculum spanning deep learning, distributed algorithms, data structures, and computer vision systems.",
    skills: ["Data Structures & Algorithms", "Deep Learning", "Operating Systems", "Distributed Computing", "Linear Algebra", "Database Management"],
    highlights: [
      "Graduated First Class with Distinction; recipient of Academic Merit Scholarship.",
      "Published undergraduate thesis on 'Adaptive Attention Mechanisms for Real-time Video Object Segmentation'.",
      "Led the University Machine Learning & Algorithmic Society, mentoring over 300 junior students."
    ]
  },
  {
    degree: "Higher Secondary Certificate (HSC) in Science",
    institution: "Kendriya Vidyalaya",
    location: "Kerala, India",
    period: "2016 — 2018",
    field: "Physics, Chemistry, Mathematics, Computer Science",
    grade: "95.6%",
    description: "Foundational studies in higher mathematics, analytical physics, and early algorithmic programming in C++ and Python.",
    skills: ["Calculus", "Probability & Statistics", "Analytical Mechanics", "C++", "Python Fundamentals"],
    highlights: [
      "Ranked in top 1% nationally in national competitive science talent examination.",
      "Won 1st prize at State Level Science Olympiad for algorithmic solar path tracking simulation."
    ]
  }
];

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  skills: string[];
  verificationUrl: string;
}

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "cert-aws-ml",
    title: "AWS Certified Machine Learning – Specialty",
    issuer: "Amazon Web Services (AWS)",
    date: "2024",
    credentialId: "AWS-MLS-894721",
    skills: ["SageMaker", "Model Tuning", "MLOps", "Distributed Training"],
    verificationUrl: "https://aws.amazon.com/verification"
  },
  {
    id: "cert-deeplearning-ai",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    date: "2023",
    credentialId: "DLAI-DLS-541290",
    skills: ["Neural Networks", "CNNs", "Sequence Models", "Hyperparameter Optimization"],
    verificationUrl: "https://coursera.org/verify/specialization"
  },
  {
    id: "cert-tf-dev",
    title: "TensorFlow Developer Certificate",
    issuer: "Google Developers",
    date: "2023",
    credentialId: "TF-DEV-301928",
    skills: ["TensorFlow 2.x", "Computer Vision", "NLP", "Time Series Analysis"],
    verificationUrl: "https://www.credential.net"
  },
  {
    id: "cert-stanford-algo",
    title: "Algorithms Specialization",
    issuer: "Stanford Online",
    date: "2022",
    credentialId: "STANFORD-ALG-7731",
    skills: ["Divide & Conquer", "Graph Search", "Greedy Algorithms", "Dynamic Programming"],
    verificationUrl: "https://online.stanford.edu/verify"
  },
  {
    id: "cert-fastai",
    title: "Practical Deep Learning for Coders",
    issuer: "fast.ai",
    date: "2022",
    credentialId: "FASTAI-2022-DL",
    skills: ["PyTorch", "Transfer Learning", "Modern Vision Architectures", "Diffusion Models"],
    verificationUrl: "https://fast.ai"
  }
];

export interface TechItem {
  id: string;
  name: string;
  initials: string;
  category: "AI & ML" | "Frontend" | "Backend" | "Design" | "Workflow";
  type: string;
  description: string;
  goodFor: string;
  docsUrl: string;
}

export const TECH_CATEGORIES = [
  "AI & ML",
  "Frontend",
  "Backend",
  "Design",
  "Workflow"
] as const;

export type TechCategoryType = (typeof TECH_CATEGORIES)[number];

export const TECH_STACK_DATA: Record<TechCategoryType, TechItem[]> = {
  "AI & ML": [
    {
      id: "pytorch",
      name: "PyTorch",
      initials: "PT",
      category: "AI & ML",
      type: "Deep Learning Framework",
      description: "Primary foundation for developing custom neural architectures, loss formulations, and distributed model experimentation with native autograd support.",
      goodFor: "Custom neural network research, tensor computations, and fine-tuning foundation models.",
      docsUrl: "https://pytorch.org/docs"
    },
    {
      id: "tensorrt",
      name: "TensorRT & CUDA",
      initials: "TR",
      category: "AI & ML",
      type: "High-Performance Inference",
      description: "Low-level acceleration toolkit maximizing throughput on NVIDIA GPUs through kernel fusion, weight quantization, and memory buffer optimization.",
      goodFor: "Sub-50ms real-time vision, speech, and generative model deployment.",
      docsUrl: "https://developer.nvidia.com/tensorrt"
    },
    {
      id: "huggingface",
      name: "Transformers & Diffusers",
      initials: "HF",
      category: "AI & ML",
      type: "Model Ecosystem",
      description: "Industry standard repository and runtime for state-of-the-art vision-language, diffusion, and transformer checkpoints.",
      goodFor: "Rapid checkpoint loading, LoRA adapters, tokenization, and pipeline orchestration.",
      docsUrl: "https://huggingface.co/docs"
    },
    {
      id: "langgraph",
      name: "LangGraph & Agents",
      initials: "LG",
      category: "AI & ML",
      type: "Agent Orchestration",
      description: "Graph-based cyclical orchestration engine for stateful, multi-actor AI agent networks with checkpointing and human-in-the-loop validation.",
      goodFor: "Complex multi-step decision loops, tool-calling agents, and self-correcting pipelines.",
      docsUrl: "https://langchain-ai.github.io/langgraph"
    },
    {
      id: "vector-dbs",
      name: "Qdrant & Vector DBs",
      initials: "QD",
      category: "AI & ML",
      type: "High-Dimension Similarity Search",
      description: "High-throughput vector search engines utilizing HNSW graphs and payload filtering for production-scale retrieval augmented generation (RAG).",
      goodFor: "Sub-millisecond similarity search across millions of dense embedding vectors.",
      docsUrl: "https://qdrant.tech/documentation"
    },
    {
      id: "onnx",
      name: "ONNX Runtime",
      initials: "OX",
      category: "AI & ML",
      type: "Cross-Platform Execution",
      description: "Universal intermediate model representation enabling cross-platform model execution across CPU, edge devices, and WebAssembly in the browser.",
      goodFor: "Hardware-agnostic deployment and client-side browser inferencing.",
      docsUrl: "https://onnxruntime.ai/docs"
    }
  ],
  "Frontend": [
    {
      id: "react",
      name: "React 19 & Next.js",
      initials: "RC",
      category: "Frontend",
      type: "UI Architecture",
      description: "Component-driven paradigm powering reactive client interfaces, server components, and responsive state machines with smooth transitions.",
      goodFor: "High-performance reactive user experiences, data dashboards, and interactive canvases.",
      docsUrl: "https://react.dev"
    },
    {
      id: "typescript",
      name: "TypeScript",
      initials: "TS",
      category: "Frontend",
      type: "Type-Safe Systems",
      description: "Strict static typing layer delivering rock-solid compile-time guarantees, API contract validation, and ergonomic DX across full-stack applications.",
      goodFor: "Refactoring safety, predictable API integrations, and scalable codebases.",
      docsUrl: "https://www.typescriptlang.org/docs"
    },
    {
      id: "tailwind",
      name: "Tailwind CSS v4",
      initials: "TW",
      category: "Frontend",
      type: "Utility Styling Engine",
      description: "Modern CSS engine enabling precision typography scales, micro-interactions, dark mode elevation, and zero-runtime CSS footprint.",
      goodFor: "Rapid, consistent design token implementation and sophisticated glassmorphism.",
      docsUrl: "https://tailwindcss.com/docs"
    },
    {
      id: "framer-motion",
      name: "Motion (Framer)",
      initials: "FM",
      category: "Frontend",
      type: "Fluid Motion Physics",
      description: "Physics-driven animation library providing gesture control, layout transitions, exit animations, and hardware-accelerated transforms.",
      goodFor: "Buttery-smooth UI transitions, tab indicators, and timeline expansions.",
      docsUrl: "https://motion.dev"
    }
  ],
  "Backend": [
    {
      id: "python",
      name: "FastAPI & Python 3.12",
      initials: "FA",
      category: "Backend",
      type: "High-Speed Async API",
      description: "Asynchronous ASGI framework with Pydantic data schemas, automatic OpenAPI documentation, and native async concurrency.",
      goodFor: "AI microservices, model serving endpoints, and high-concurrency websocket streams.",
      docsUrl: "https://fastapi.tiangolo.com"
    },
    {
      id: "nodejs",
      name: "Node.js & Express",
      initials: "ND",
      category: "Backend",
      type: "Runtime Environment",
      description: "High-throughput non-blocking event-driven runtime ideal for real-time collaboration servers, authentication proxies, and cloud functions.",
      goodFor: "Full-stack server APIs, OAuth handshakes, and event stream proxies.",
      docsUrl: "https://nodejs.org/docs"
    },
    {
      id: "postgres",
      name: "PostgreSQL & Drizzle",
      initials: "PG",
      category: "Backend",
      type: "Relational Storage",
      description: "ACID-compliant relational database engine augmented with JSONB, pgvector extensions, and type-safe schema migrations.",
      goodFor: "Relational data modeling, vector-embedded search, and transactional integrity.",
      docsUrl: "https://www.postgresql.org/docs"
    },
    {
      id: "redis",
      name: "Redis & Upstash",
      initials: "RD",
      category: "Backend",
      type: "In-Memory Data Grid",
      description: "Ultra-low latency in-memory key-value store for distributed caching, session state management, Pub/Sub channels, and rate limiting.",
      goodFor: "Fast session tokens, inference result caching, and realtime message broker.",
      docsUrl: "https://redis.io/docs"
    }
  ],
  "Design": [
    {
      id: "figma",
      name: "Figma & Tokens",
      initials: "FG",
      category: "Design",
      type: "Interface Architecture",
      description: "Collaborative design environment used for component variant design, responsive layouts, design token mapping, and interactive prototypes.",
      goodFor: "Systematic UI layout planning, interactive wireframing, and SVG asset refinement.",
      docsUrl: "https://help.figma.com"
    },
    {
      id: "lucide",
      name: "Lucide Icons",
      initials: "LC",
      category: "Design",
      type: "Iconography System",
      description: "Clean, consistent 24px grid iconography crafted with geometric clarity and adaptable stroke weights for dark and light surfaces.",
      goodFor: "Clean functional affordances, navigation icons, and status badges.",
      docsUrl: "https://lucide.dev"
    },
    {
      id: "typography",
      name: "Editorial Typography",
      initials: "TY",
      category: "Design",
      type: "Font Pairings & Scale",
      description: "Disciplined pairing of authoritative display type (Manrope 800/700) with highly legible neutral body prose (Inter 400/500) and tabular monospaces.",

      goodFor: "Creating distinctive visual presence without relying on generic AI styling.",
      docsUrl: "https://fonts.google.com"
    }
  ],
  "Workflow": [
    {
      id: "docker",
      name: "Docker & Containers",
      initials: "DK",
      category: "Workflow",
      type: "Containerization",
      description: "Reproducible runtime environments isolating CUDA dependencies, Python virtualenvs, and production microservices across cloud targets.",
      goodFor: "Hermetic machine learning builds and frictionless local-to-cloud parity.",
      docsUrl: "https://docs.docker.com"
    },
    {
      id: "git",
      name: "Git & GitHub CI/CD",
      initials: "GH",
      category: "Workflow",
      type: "Version Control & Automation",
      description: "Automated test suites, model verification checks, linting pipelines, and trunk-based deployment workflows.",
      goodFor: "Continuous integration, automated preview deployments, and code quality gating.",
      docsUrl: "https://docs.github.com"
    },
    {
      id: "vercel",
      name: "Vercel & Edge CDN",
      initials: "VC",
      category: "Workflow",
      type: "Cloud Edge Hosting",
      description: "Zero-configuration continuous deployment platform with global edge caching, instant preview links, and serverless compute.",
      goodFor: "Deploying high-speed production portfolios, frontend web apps, and edge redirects.",
      docsUrl: "https://vercel.com/docs"
    },
    {
      id: "wandb",
      name: "Weights & Biases",
      initials: "WB",
      category: "Workflow",
      type: "ML Experiment Tracking",
      description: "Centralized experimentation dashboard recording loss curves, hyperparameter sweeps, model artifacts, and hardware GPU utilization.",
      goodFor: "Rigorous ML experiment tracking and reproducible research milestones.",
      docsUrl: "https://docs.wandb.ai"
    }
  ]
};
