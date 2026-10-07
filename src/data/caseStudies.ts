export interface CaseStudy {
  role: string;
  timeline: string;
  team: string;
  status: string;
  overview: string;
  goals: string[];
  problem: { summary: string; points: string[] };
  approach: { title: string; detail: string }[];
  architecture: { layer: string; detail: string }[];
  challenges: { challenge: string; solution: string }[];
  results: string[];
  learnings: string[];
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "project-omni-vision": {
    role: "Lead Engineer, Inference & Serving",
    timeline: "2023 — 2024",
    team: "Small cross-functional team",
    status: "In production",
    overview:
      "OmniPercept serves a vision-language model at the edge so robots can answer spatial questions about what they see, in real time. The work was mostly about making a large multimodal model fast and small enough to sit inside a robot's control loop.",
    goals: [
      "Sub-35ms end-to-end inference latency",
      "Reduce GPU VRAM consumption without hurting answer quality",
      "Stream frames and answers live to a browser dashboard",
    ],
    problem: {
      summary:
        "Closed-loop robotics needs answers within a tight latency budget. Standard VLM serving was far too slow and too memory-hungry for edge GPUs.",
      points: [
        "Per-frame latency was well above what real-time control can tolerate.",
        "Edge GPU memory limited batch size and the models that could be deployed.",
        "At 1.2M visual tokens a day, small per-token inefficiencies added up quickly.",
      ],
    },
    approach: [
      { title: "Profile before optimizing", detail: "Broke latency down by stage (vision encoder, attention, host-device transfer) so effort went where the time actually was." },
      { title: "Compile and fuse", detail: "Exported to TensorRT engines and fused hot kernels in CUDA to cut memory traffic and launch overhead." },
      { title: "Quantize with guardrails", detail: "Applied reduced precision layer by layer, validating each step against an evaluation set before accepting it." },
      { title: "Pipeline the serving path", detail: "Overlapped capture, preprocessing, and inference, and streamed results over WebRTC to the client." },
    ],
    architecture: [
      { layer: "Capture & transport", detail: "WebRTC streams frames in and answers out with low overhead." },
      { layer: "Serving API", detail: "FastAPI handles sessions, request validation, and backpressure." },
      { layer: "Inference runtime", detail: "TensorRT engines on CUDA with pinned memory and async streams." },
      { layer: "Model", detail: "PyTorch vision-language model, exported and optimized for the edge." },
      { layer: "Client", detail: "React dashboard showing live frames, answers, and latency." },
    ],
    challenges: [
      { challenge: "Latency spikes from host-device copies", solution: "Used pinned memory and asynchronous CUDA streams to overlap transfers with compute." },
      { challenge: "Accuracy loss after quantization", solution: "Ran per-layer sensitivity checks and kept the most sensitive layers at higher precision." },
      { challenge: "Jitter under variable load", solution: "Added a bounded queue that drops stale frames so answers always reflect the latest view." },
    ],
    results: [
      "Inference latency of 32ms, inside the sub-35ms target.",
      "4.2x throughput increase over the baseline serving setup.",
      "47% reduction in GPU VRAM consumption.",
      "Sustains 1.2M daily visual tokens in production.",
    ],
    learnings: [
      "Measure first: the bottleneck was rarely where intuition said it was.",
      "A latency budget is a product decision, so agree on it before optimizing.",
      "Every precision reduction needs an evaluation gate, not just a benchmark.",
    ],
  },

  "project-nexus-agents": {
    role: "Architect & Lead Engineer",
    timeline: "2023 — 2024",
    team: "Small engineering team",
    status: "In production",
    overview:
      "NexusAgent Swarm coordinates specialist AI agents through a dynamic task graph to review code at enterprise scale. Safety was a core design constraint: every risky action passes through verifiable tools and a human gate.",
    goals: [
      "Automate the bulk of routine code review work",
      "Keep every tool action deterministic and verifiable",
      "Keep humans in control of high-risk decisions",
    ],
    problem: {
      summary:
        "Code review is a bottleneck. A single LLM prompt isn't reliable enough for it, and unconstrained agents are too risky to trust with real repositories.",
      points: [
        "Review work is repetitive but needs context across files and services.",
        "Free-form agent loops are hard to debug and can drift off task.",
        "Teams need an audit trail and clear points where a human can intervene.",
      ],
    },
    approach: [
      { title: "Model work as a graph", detail: "Represented reviews as a LangGraph DAG so each step has a clear role, input, and output." },
      { title: "Route dynamically", detail: "A planner agent picks which specialist nodes run based on what the change touches." },
      { title: "Constrain tools", detail: "Agents act only through deterministic, verifiable tool calls, never raw shell access." },
      { title: "Gate risky actions", detail: "Human-in-the-loop checkpoints sit in front of anything with side effects." },
    ],
    architecture: [
      { layer: "Orchestration", detail: "LangGraph manages state, routing, and checkpointing across the DAG." },
      { layer: "Agent services", detail: "Python and FastAPI services host the specialist reviewers." },
      { layer: "State & queues", detail: "Redis holds run state and coordinates work between nodes." },
      { layer: "Interface", detail: "TypeScript front end for run inspection and approvals." },
      { layer: "Runtime", detail: "Docker keeps agent environments isolated and reproducible." },
    ],
    challenges: [
      { challenge: "Agents looping or drifting off task", solution: "Bounded graph depth and added reflection steps with explicit exit conditions." },
      { challenge: "Non-reproducible runs", solution: "Checkpointed state at every node so any run can be replayed and inspected." },
      { challenge: "Trust in automated output", solution: "Required human approval for high-impact actions and logged every decision." },
    ],
    results: [
      "Automated 82% of enterprise code review workflows.",
      "94.6% autonomous success rate on routine reviews.",
      "Graphs up to 12 nodes deep, with human gating retained for risky steps.",
    ],
    learnings: [
      "Structure beats autonomy: explicit graphs are easier to trust than open-ended loops.",
      "Checkpointing pays for itself the first time something goes wrong.",
      "Human gates are a feature that makes adoption possible.",
    ],
  },

  "project-vector-hypergraph": {
    role: "Lead Engineer, Retrieval",
    timeline: "2023",
    team: "Small team",
    status: "In production",
    overview:
      "HyperVector RAG Core is a retrieval engine that blends keyword search, dense embeddings, and a knowledge graph. It is built for technical questions that need facts from several documents at once.",
    goals: [
      "Raise retrieval recall on multi-hop questions",
      "Keep query latency low enough for interactive use",
      "Make answers traceable to source documents",
    ],
    problem: {
      summary:
        "Plain vector search finds similar passages but misses answers that require connecting facts across documents.",
      points: [
        "Dense retrieval alone missed exact terms such as identifiers and version numbers.",
        "Keyword search alone missed paraphrased or conceptual matches.",
        "Multi-hop questions needed relationships between entities, not just similar text.",
      ],
    },
    approach: [
      { title: "Hybrid first stage", detail: "Combined sparse BM25 with dense HNSW embeddings to cover both exact and semantic matches." },
      { title: "Add a graph layer", detail: "Extracted entities and relations into Neo4j so retrieval can hop between connected concepts." },
      { title: "Fuse and rerank", detail: "Merged candidates from all three sources and reranked them for precision." },
      { title: "Tune on real queries", detail: "Built an evaluation set of multi-hop questions and iterated against recall." },
    ],
    architecture: [
      { layer: "Ingestion", detail: "Documents are chunked, embedded with Hugging Face models, and entity-extracted." },
      { layer: "Dense index", detail: "Qdrant serves HNSW vector search with payload filtering." },
      { layer: "Graph store", detail: "Neo4j holds entities and relations for multi-hop expansion." },
      { layer: "Query service", detail: "A Go service fans out, fuses, and reranks results." },
      { layer: "Interface", detail: "Next.js front end with source-linked answers." },
    ],
    challenges: [
      { challenge: "Graph expansion adding noise", solution: "Limited hop depth and scored expansions by relation strength before merging." },
      { challenge: "Latency from fan-out to three stores", solution: "Ran lookups in parallel in Go and capped candidate sets before reranking." },
      { challenge: "Knowing whether changes helped", solution: "Used a fixed multi-hop evaluation set so every change was measured on recall." },
    ],
    results: [
      "Context recall rose from 68% to 92.4% on multi-hop technical queries.",
      "14ms P99 query latency.",
      "Every answer links back to its source chunks.",
    ],
    learnings: [
      "Hybrid retrieval is a safer default than any single method.",
      "Graphs help most when you cap their reach.",
      "An evaluation set is the most valuable asset in a RAG project.",
    ],
  },

  "project-diffusion-canvas": {
    role: "Creator & Lead Developer",
    timeline: "2023 — 2024",
    team: "Solo, with open-source contributors",
    status: "Open source",
    overview:
      "LatentFlow Studio is a browser-based canvas for exploring how diffusion models work. You can steer attention layer by layer and watch the generation trajectory change in real time, all on the GPU through WebGPU.",
    goals: [
      "Make diffusion internals visible and interactive",
      "Run smoothly in the browser with no backend GPU",
      "Be useful as a teaching tool",
    ],
    problem: {
      summary:
        "Diffusion models are usually black boxes. Researchers and students have few ways to see or manipulate what happens inside a generation.",
      points: [
        "Existing tools expose prompts and seeds but not internal attention.",
        "Experimentation needed notebooks and GPU servers, which slowed learning.",
        "Static visualizations don't convey a process that unfolds over time.",
      ],
    },
    approach: [
      { title: "Expose the internals", detail: "Surfaced attention maps and latent trajectories from Diffusers pipelines." },
      { title: "Move compute to WebGPU", detail: "Ran manipulation and rendering on the client GPU for instant feedback." },
      { title: "Design for play", detail: "Built direct-manipulation controls so users learn by dragging, not by reading." },
      { title: "Open source early", detail: "Shared it publicly and iterated on community feedback." },
    ],
    architecture: [
      { layer: "Model backend", detail: "PyTorch and Diffusers produce latents and attention data." },
      { layer: "GPU layer", detail: "WebGPU compute and render passes handle steering and visualization." },
      { layer: "Application", detail: "TypeScript app built with Vite for fast iteration." },
      { layer: "Interface", detail: "Tailwind-styled controls for masks, layers, and trajectories." },
    ],
    challenges: [
      { challenge: "Keeping the UI at interactive frame rates", solution: "Kept data on the GPU and minimized CPU-GPU round trips." },
      { challenge: "Making attention understandable", solution: "Used per-layer overlays and progressive reveal instead of dumping all maps at once." },
      { challenge: "WebGPU support differences", solution: "Feature-detected capabilities and degraded gracefully." },
    ],
    results: [
      "Runs at 60 FPS in the browser.",
      "8.2k GitHub stars from the research community.",
      "Used as a teaching sandbox in academic machine learning labs.",
    ],
    learnings: [
      "Interactivity teaches faster than explanation.",
      "Client-side GPU compute removes most of the setup friction.",
      "Open-source feedback shaped the product more than any plan.",
    ],
  },

  "project-cloud-mlops": {
    role: "Platform Engineer",
    timeline: "2022 — 2023",
    team: "Platform and ML teams",
    status: "In production",
    overview:
      "Synapse is an MLOps platform that deploys models with zero downtime and continuously watches them for drift, so silent degradation is caught in minutes instead of days.",
    goals: [
      "Deploy and roll back models without downtime",
      "Detect concept drift automatically",
      "Shorten the time from degradation to alert",
    ],
    problem: {
      summary:
        "Models degrade quietly as data changes. Teams often found out days later, from users or downstream metrics, after real damage was done.",
      points: [
        "No statistical monitoring existed on live model inputs and outputs.",
        "Releases were all-or-nothing, which made rollouts risky.",
        "New models couldn't be tested on real traffic without exposing users.",
      ],
    },
    approach: [
      { title: "Stream everything", detail: "Captured predictions and features through Kafka for near-real-time analysis." },
      { title: "Monitor statistically", detail: "Computed drift metrics continuously and exported them to Prometheus." },
      { title: "Roll out safely", detail: "Automated canary rollouts with automatic rollback on bad signals." },
      { title: "Shadow new models", detail: "Ran candidates on live traffic in shadow mode before promotion." },
    ],
    architecture: [
      { layer: "Event stream", detail: "Kafka carries prediction and feature events." },
      { layer: "Drift engine", detail: "Python services compute statistical drift on sliding windows." },
      { layer: "Metrics & alerts", detail: "Prometheus stores metrics and triggers alerts." },
      { layer: "Deployment", detail: "Kubernetes runs canary and shadow deployments." },
      { layer: "Console", detail: "React dashboard on PostgreSQL for model health and rollout state." },
    ],
    challenges: [
      { challenge: "Alert fatigue from noisy drift signals", solution: "Tuned thresholds per feature and required sustained drift before alerting." },
      { challenge: "Shadow traffic doubling infrastructure load", solution: "Sampled traffic and autoscaled shadow pods independently." },
      { challenge: "Safe automated rollback", solution: "Defined health gates up front so a rollback needs no human judgment call." },
    ],
    results: [
      "Mean time to detection dropped from 4 days to 8 minutes (a 99% reduction).",
      "99.99% cluster uptime.",
      "Eliminated silent production model degradation.",
    ],
    learnings: [
      "Monitoring models is a different problem from monitoring services.",
      "Automation needs explicit, testable health gates.",
      "Shadow deployments catch problems that offline evaluation can't.",
    ],
  },
};