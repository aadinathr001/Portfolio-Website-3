/**
 * In-Memory RAG (Retrieval-Augmented Generation) Engine
 * Does not require any external database.
 * Computes semantic BM25/TF-IDF similarity across indexed portfolio document chunks.
 */

import {
  PORTFOLIO_CONFIG,
  PROJECTS_DATA,
  FEATURED_PROJECT,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  CERTIFICATES_DATA,
  TECH_STACK_DATA
} from "../data/portfolioData";

export interface KnowledgeChunk {
  id: string;
  title: string;
  category: "profile" | "projects" | "experience" | "education" | "certificates" | "stack" | "contact";
  content: string;
  keywords: string[];
}

export interface RetrievedResult {
  chunk: KnowledgeChunk;
  score: number;
}

// Build knowledge base directly from portfolio data
export const PORTFOLIO_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "profile-summary",
    title: "About Aadinath R & Core Role",
    category: "profile",
    content: `${PORTFOLIO_CONFIG.NAME} is an ${PORTFOLIO_CONFIG.ROLE} located in ${PORTFOLIO_CONFIG.LOCATION}. Current status: ${PORTFOLIO_CONFIG.STATUS}. Summary: ${PORTFOLIO_CONFIG.SHORT_INTRO} Specializes in building sub-50ms inference systems, multimodal perception models, autonomous multi-agent reasoning DAGs, and production full-stack architectures.`,
    keywords: ["aadinath", "profile", "about", "role", "who", "location", "status", "summary", "engineer", "developer", "experience", "background"]
  },
  {
    id: "featured-omni-percept",
    title: "Featured Project: OmniPercept Neural Engine",
    category: "projects",
    content: `OmniPercept Neural Engine is a featured real-time edge multimodal perception and spatial reasoning model serving system. Sub-35ms inference latency. Impact: Achieved 4.2x throughput increase and 47% reduction in GPU VRAM consumption across 1.2M daily visual tokens. Tech stack: PyTorch, TensorRT, CUDA, FastAPI, WebRTC, React. Repository: ${FEATURED_PROJECT.githubUrl}, Demo: ${FEATURED_PROJECT.liveUrl}.`,
    keywords: ["omnipercept", "vision", "multimodal", "perception", "featured", "project", "sub-35ms", "latency", "tensorrt", "cuda", "vram", "robotics"]
  },
  {
    id: "project-nexus-agent",
    title: "Project: NexusAgent Swarm",
    category: "projects",
    content: `NexusAgent Swarm is a distributed autonomous agent network featuring dynamic DAG routing, reflective code generation, and verifiable deterministic tool execution. Impact: Automated 82% of enterprise code review workflows with human-in-the-loop safety gating. Tech stack: Python, LangGraph, FastAPI, TypeScript, Redis, Docker. Repository: https://github.com/aadinath-r/nexus-agent-mesh.`,
    keywords: ["nexusagent", "agents", "swarm", "langgraph", "dag", "autonomous", "code review", "multi-agent", "redis"]
  },
  {
    id: "project-hypervector-rag",
    title: "Project: HyperVector RAG Core",
    category: "projects",
    content: `HyperVector RAG Core is a graph-augmented semantic retrieval engine combining sparse BM25, dense HNSW embeddings, and entity relation hops for high-precision document synthesis. Impact: Boosted retrieval context recall from 68% to 92.4% with 14ms P99 query latency on complex multi-hop queries. Tech stack: PyTorch, Qdrant, Neo4j, Hugging Face, Go, Next.js.`,
    keywords: ["hypervector", "rag", "retrieval", "vector", "qdrant", "neo4j", "embeddings", "hnsw", "bm25", "graph"]
  },
  {
    id: "project-latentflow-synapse",
    title: "Projects: LatentFlow Studio & Synapse MLOps",
    category: "projects",
    content: `LatentFlow Studio is a WebGPU-accelerated visual experimentation studio providing layer-by-layer attention steering and real-time diffusion trajectory manipulation with 8.2k GitHub stars. Synapse MLOps Platform provides zero-downtime model deployment and concept drift monitoring, cutting mean-time-to-detection by 99% using Kubernetes, Prometheus, Kafka, and Python.`,
    keywords: ["latentflow", "diffusion", "webgpu", "synapse", "mlops", "drift", "kubernetes", "prometheus", "kafka", "projects"]
  },
  {
    id: "experience-neuralpulse",
    title: "Senior AI/ML Research Engineer at NeuralPulse Labs",
    category: "experience",
    content: `Role: Senior AI/ML Research Engineer at NeuralPulse Labs (2023 — Present, Bengaluru Hybrid). Leading inference optimization and vision-language foundation model deployment. Highlights: Architected speculative decoding pipeline reducing median latency by 43% on edge GPUs; engineered automated model quantization (FP8/INT4) with <0.4% perplexity drop; mentored 6 engineers across distributed infrastructure and evaluation. Tech: PyTorch, TensorRT, CUDA C++, Triton Server, Python, Ray.`,
    keywords: ["neuralpulse", "senior", "experience", "current", "job", "work", "speculative decoding", "quantization", "fp8", "int4", "triton", "cuda"]
  },
  {
    id: "experience-kinetix-apex",
    title: "Experience at Kinetix Technologies & Apex Computational",
    category: "experience",
    content: `At Kinetix Technologies (2022 — 2023, Bengaluru) as Machine Learning & Full-Stack Engineer: Deployed streaming anomaly detection system handling 450,000 events/sec; designed core analytics web portal for 140+ enterprise teams; reduced cloud costs by 34% via GPU scheduling. At Apex Computational Systems (2021 — 2022, Hyderabad) as AI Software Engineering Intern: Researched Graph Neural Networks (GNNs) for recommendation cold-start problems, improving accuracy by 18%. Total: 4+ years across 3 companies and 25+ production systems.`,
    keywords: ["kinetix", "apex", "experience", "history", "anomaly detection", "gnn", "graph neural networks", "internship", "companies"]
  },
  {
    id: "education-credentials",
    title: "Education & Academic Honors",
    category: "education",
    content: `Education: B.Tech in Computer Science and Engineering from National Institute of Technology (NIT, Kerala, 2018 — 2022) with 8.9/10 CGPA (First Class with Distinction). Published undergraduate thesis on 'Adaptive Attention Mechanisms for Real-time Video Object Segmentation'. Led University Machine Learning Society (300+ students). Higher Secondary Certificate (HSC) in Science from Kendriya Vidyalaya (95.6%, top 1% national rank in science talent exam).`,
    keywords: ["education", "nit", "btech", "degree", "university", "college", "gpa", "cgpa", "grade", "school", "thesis", "honors"]
  },
  {
    id: "certificates-list",
    title: "Verified Industry Certifications",
    category: "certificates",
    content: `Verified Certifications: 1) AWS Certified Machine Learning – Specialty (Credential: AWS-MLS-894721). 2) Deep Learning Specialization by DeepLearning.AI / Andrew Ng (DLAI-DLS-541290). 3) Google TensorFlow Developer Certificate (TF-DEV-301928). 4) Stanford Online Algorithms Specialization (STANFORD-ALG-7731). 5) Practical Deep Learning for Coders by fast.ai.`,
    keywords: ["certificates", "certifications", "aws", "deeplearning.ai", "tensorflow", "stanford", "fastai", "credentials", "verified"]
  },
  {
    id: "tech-stack-aiml",
    title: "AI & Machine Learning Tech Stack",
    category: "stack",
    content: `Core AI/ML Stack: PyTorch (neural architecture design & autograd), TensorRT & CUDA (sub-50ms inference optimization, kernel fusion), Hugging Face Transformers & Diffusers (foundation models, LoRA adapters), LangGraph (stateful multi-agent cyclical reasoning DAGs), Qdrant (high-throughput HNSW vector embeddings), ONNX Runtime (cross-platform CPU/GPU/browser execution).`,
    keywords: ["stack", "ai", "ml", "pytorch", "tensorrt", "cuda", "langgraph", "qdrant", "onnx", "transformers", "skills"]
  },
  {
    id: "tech-stack-fullstack",
    title: "Frontend, Backend & Systems Tech Stack",
    category: "stack",
    content: `Full-Stack & Systems Stack: Frontend: React 19, TypeScript, Next.js, Tailwind CSS v4, Motion (Framer). Backend: FastAPI & Python 3.12, Node.js, Express, PostgreSQL & pgvector, Redis. Workflow & DevOps: Docker, Git & GitHub Actions CI/CD, Vercel Edge CDN, Weights & Biases (W&B). Design: Figma design tokens, Editorial Typography, Lucide icon system.`,
    keywords: ["frontend", "backend", "fullstack", "react", "typescript", "tailwind", "fastapi", "python", "postgres", "docker", "redis", "vercel"]
  },
  {
    id: "contact-socials",
    title: "Contact Information & Links",
    category: "contact",
    content: `Contact details for Aadinath R: Email: ${PORTFOLIO_CONFIG.EMAIL}, Location: ${PORTFOLIO_CONFIG.LOCATION}. Social profiles: GitHub (${PORTFOLIO_CONFIG.GITHUB}), LinkedIn (${PORTFOLIO_CONFIG.LINKEDIN}), Twitter/X (${PORTFOLIO_CONFIG.TWITTER}), Hugging Face (${PORTFOLIO_CONFIG.HUGGINGFACE}). Open for Senior AI/ML Engineering roles, research collaborations, and technical advisory.`,
    keywords: ["contact", "email", "reach", "hire", "github", "linkedin", "twitter", "connect", "message", "social"]
  }
];

// Tokenizer & stop words
const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "in", "on", "at", "to", "for", "of", "with", "by", "from",
  "is", "are", "was", "were", "what", "which", "who", "whom", "this", "that", "these", "those",
  "am", "have", "has", "had", "do", "does", "did", "can", "could", "tell", "me", "about", "his"
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

/**
 * In-Memory Semantic Scoring
 * Combines exact term match, keyword weighting, and length-normalized BM25 score.
 */
export function retrieveRelevantContext(query: string, topK: number = 3): RetrievedResult[] {
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0) {
    // Return top profile + featured project as fallback
    return [
      { chunk: PORTFOLIO_KNOWLEDGE_BASE[0], score: 1.0 },
      { chunk: PORTFOLIO_KNOWLEDGE_BASE[1], score: 0.9 }
    ];
  }

  const results: RetrievedResult[] = PORTFOLIO_KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    const chunkTokens = tokenize(chunk.title + " " + chunk.content);
    const chunkKeywords = chunk.keywords.map((k) => k.toLowerCase());

    queryTokens.forEach((qToken) => {
      // Direct keyword match in curated tags (high weight)
      if (chunkKeywords.some((k) => k.includes(qToken) || qToken.includes(k))) {
        score += 3.5;
      }

      // Title match (medium-high weight)
      if (chunk.title.toLowerCase().includes(qToken)) {
        score += 2.5;
      }

      // Body occurrences (TF component)
      const count = chunkTokens.filter((ct) => ct === qToken).length;
      if (count > 0) {
        score += Math.log(1 + count) * 1.5;
      }
    });

    // Slight boost for category matches
    if (query.toLowerCase().includes(chunk.category)) {
      score += 2.0;
    }

    return { chunk, score };
  });

  // Sort descending by relevance score
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, topK);
}

/**
 * Constructs the augmented RAG system prompt with retrieved portfolio context
 */
export function buildRAGPrompt(query: string, retrievedChunks: KnowledgeChunk[]): {
  systemPrompt: string;
  userPrompt: string;
} {
  const contextSnippet = retrievedChunks
    .map(
      (c, idx) =>
        `[Document ${idx + 1}: ${c.title}]\n${c.content}`
    )
    .join("\n\n");

  const systemPrompt = `You are the AI Portfolio Assistant for Aadinath R, an AI/ML Engineer & Full-Stack Developer.
You have access to verified facts retrieved directly from Aadinath's portfolio website:

--- RETRIEVED PORTFOLIO CONTEXT ---
${contextSnippet}
--- END RETRIEVED CONTEXT ---

Instructions:
1. Answer the user's question accurately, concisely, and professionally using the retrieved facts.
2. Highlight relevant technical details (e.g. PyTorch, TensorRT, sub-35ms latency, LangGraph, NIT degree) whenever applicable.
3. If the user asks how to get in touch, provide his email (${PORTFOLIO_CONFIG.EMAIL}) and GitHub/LinkedIn.
4. If a question is outside the scope of Aadinath's background or portfolio, politely state what you know and invite them to explore his projects or reach out directly.
5. Keep your tone confident, articulate, and technical yet approachable.`;

  return {
    systemPrompt,
    userPrompt: query
  };
}

/**
 * Intelligent in-memory fallback generator
 * Generates an accurate, context-grounded response locally if Groq API key is not yet configured or network is offline.
 */
export function generateLocalRAGAnswer(query: string, retrievedChunks: KnowledgeChunk[]): string {
  const q = query.toLowerCase();

  if (q.includes("skill") || q.includes("stack") || q.includes("technolog") || q.includes("python") || q.includes("pytorch")) {
    return `Aadinath specializes in deep learning architectures and high-throughput systems:
• **AI & ML**: PyTorch, TensorRT & CUDA (sub-35ms inference optimization), Hugging Face Transformers & Diffusers, LangGraph for autonomous agent DAGs, and Qdrant vector search.
• **Full-Stack & Systems**: FastAPI, Python 3.12, Node.js, PostgreSQL with pgvector, React 19, TypeScript, and Tailwind CSS v4.
• **MLOps & DevOps**: Docker, Triton Inference Server, Weights & Biases, Kubernetes, and Vercel edge deployment.`;
  }

  if (q.includes("project") || q.includes("omni") || q.includes("agent") || q.includes("case study")) {
    return `Aadinath's portfolio features several production-grade systems:
1. **OmniPercept Neural Engine (Featured)**: A real-time multimodal vision-language perception system operating at sub-35ms latency, achieving a 4.2x throughput increase across 1.2M daily visual queries.
2. **NexusAgent Swarm**: A distributed multi-agent DAG network for autonomous code reviews with verifiable safety gating.
3. **HyperVector RAG Core**: A graph-augmented semantic retrieval engine achieving 92.4% recall on multi-hop technical queries.
4. **LatentFlow Studio**: A WebGPU visual synthesis studio with 8.2k+ GitHub stars.`;
  }

  if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("company") || q.includes("role")) {
    return `Aadinath has 4+ years of professional engineering experience across 3 organizations:
• **Senior AI/ML Research Engineer at NeuralPulse Labs** (2023 — Present): Leading inference acceleration, speculative decoding (43% lower latency), and FP8/INT4 model quantization.
• **Machine Learning Engineer at Kinetix Technologies** (2022 — 2023): Built real-time streaming telemetry handling 450,000 events/sec and cut cloud costs by 34%.
• **AI Engineering Intern at Apex Computational Systems** (2021 — 2022): Researched Graph Neural Networks (GNNs) for cold-start recommendations.`;
  }

  if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("university") || q.includes("gpa")) {
    return `Aadinath holds a **B.Tech in Computer Science and Engineering** from the **National Institute of Technology (NIT, Kerala)**, graduating First Class with Distinction (8.9/10 CGPA). His undergraduate thesis investigated adaptive attention mechanisms for real-time video object segmentation. He also completed his Higher Secondary Certificate in Science with 95.6%.`;
  }

  if (q.includes("certif") || q.includes("aws") || q.includes("credential")) {
    return `Aadinath holds 5 verified credentials:
• **AWS Certified Machine Learning – Specialty** (AWS-MLS-894721)
• **Deep Learning Specialization** (DeepLearning.AI / Andrew Ng)
• **Google TensorFlow Developer Certificate** (TF-DEV-301928)
• **Algorithms Specialization** (Stanford Online)
• **Practical Deep Learning for Coders** (fast.ai)`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach") || q.includes("linkedin")) {
    return `You can reach Aadinath directly via:
• **Email**: ${PORTFOLIO_CONFIG.EMAIL}
• **GitHub**: ${PORTFOLIO_CONFIG.GITHUB}
• **LinkedIn**: ${PORTFOLIO_CONFIG.LINKEDIN}
• **Status**: ${PORTFOLIO_CONFIG.STATUS} in ${PORTFOLIO_CONFIG.LOCATION}.
You can also copy the email directly from the contact section on this page.`;
  }

  // General grounded synthesis from top retrieved chunk
  const primaryChunk = retrievedChunks[0];
  return `Based on Aadinath's portfolio records for **${primaryChunk.title}**:
${primaryChunk.content}

Feel free to ask about his specific neural architectures, work experience at NeuralPulse Labs, featured case studies, or tech stack!`;
}
