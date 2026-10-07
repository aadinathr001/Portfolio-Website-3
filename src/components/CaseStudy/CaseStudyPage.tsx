import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Github,
  Activity,
} from "lucide-react";
import { PROJECTS_DATA } from "../../data/portfolioData";
import { CASE_STUDIES } from "../../data/caseStudies";
import { backToProjects, goHome, navigate, projectPath, projectSlug } from "../../utils/router";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "approach", label: "Approach" },
  { id: "architecture", label: "Architecture" },
  { id: "challenges", label: "Challenges & Solutions" },
  { id: "results", label: "Results" },
  { id: "reflections", label: "Reflections" },
];

const Section: React.FC<{ id: string; index: number; children: React.ReactNode }> = ({
  id,
  index,
  children,
}) => {
  const meta = SECTIONS[index];
  return (
    <section
      id={`cs-${id}`}
      className="scroll-mt-28 py-12 border-t border-[#e6e6e1] first:border-t-0 first:pt-0"
    >
      <div className="text-[11px] font-mono uppercase tracking-widest text-[#c26d52] font-semibold mb-2">
        {String(index + 1).padStart(2, "0")} // {meta.label}
      </div>
      <h2 className="font-['Manrope'] font-bold text-2xl sm:text-3xl text-[#121212] tracking-tight mb-6">
        {meta.label}
      </h2>
      {children}
    </section>
  );
};

const Dash: React.FC = () => (
  <span className="text-[#c26d52] font-mono text-xs mt-1 select-none font-bold">—</span>
);

export const CaseStudyPage: React.FC<{ slug: string }> = ({ slug }) => {
  const index = PROJECTS_DATA.findIndex((p) => projectSlug(p.id) === slug);
  const project = PROJECTS_DATA[index];
  const cs = project ? CASE_STUDIES[project.id] : undefined;
  const [active, setActive] = useState("overview");

  // Page title
  useEffect(() => {
    if (!project) return;
    const prev = document.title;
    document.title = `${project.title} — Case Study | Aadinath R`;
    return () => {
      document.title = prev;
    };
  }, [project]);

  // Scroll-spy for the table of contents
  useEffect(() => {
    if (!cs) return;
    const els = SECTIONS.map((s) => document.getElementById(`cs-${s.id}`)).filter(
      Boolean
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace("cs-", ""));
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [cs, slug]);

  if (!project || !cs) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#c26d52] mb-3">
          404 // CASE STUDY NOT FOUND
        </div>
        <h1 className="font-['Manrope'] font-bold text-3xl text-[#121212] mb-6">
          That project doesn't exist.
        </h1>
        <button
          onClick={backToProjects}
          className="px-5 py-3 bg-[#121212] text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
        >
          BACK TO PROJECTS
        </button>
      </div>
    );
  }

  const prev = PROJECTS_DATA[(index - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];
  const next = PROJECTS_DATA[(index + 1) % PROJECTS_DATA.length];

  const jumpTo = (id: string) => {
    document.getElementById(`cs-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  const meta = [
    { label: "ROLE", value: cs.role },
    { label: "TIMELINE", value: cs.timeline },
    { label: "TEAM", value: cs.team },
    { label: "STATUS", value: cs.status },
  ];

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fbfbf9]/92 backdrop-blur-md border-b border-[#e6e6e1]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          <button
            onClick={backToProjects}
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#121212] hover:text-[#c26d52] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL PROJECTS</span>
          </button>

          <div className="hidden sm:block text-[11px] font-mono uppercase tracking-widest text-[#8a8a82]">
            CASE STUDY {String(index + 1).padStart(2, "0")} / {String(PROJECTS_DATA.length).padStart(2, "0")}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(projectPath(prev.id))}
              aria-label={`Previous: ${prev.title}`}
              title={prev.title}
              className="p-1.5 border border-[#d6d6ce] hover:border-[#121212] text-[#121212] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate(projectPath(next.id))}
              aria-label={`Next: ${next.title}`}
              title={next.title}
              className="p-1.5 border border-[#d6d6ce] hover:border-[#121212] text-[#121212] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => goHome("contact")}
              className="ml-2 px-3.5 py-1 text-[11px] font-mono tracking-wider uppercase text-[#121212] border border-[#d6d6ce] hover:border-[#121212] transition-colors cursor-pointer"
            >
              CONTACT
            </button>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Title block */}
          <div className="max-w-4xl mb-12">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c26d52]" />
              <span className="text-[#c26d52] font-semibold">{project.category}</span>
              <span className="text-[#c0c0b8]">/</span>
              <span className="text-[#7a7a72]">CASE STUDY</span>
            </div>
            <h1 className="font-['Manrope'] font-extrabold text-4xl sm:text-6xl text-[#121212] tracking-tighter leading-[1.05] mb-4">
              {project.title}
            </h1>
            <p className="font-['Inter'] text-lg sm:text-xl text-[#4a4a46] leading-relaxed max-w-3xl">
              {project.subtitle}. {project.description}
            </p>
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-y border-[#e6e6e1] mb-12 text-[11px] font-mono uppercase">
            {meta.map((m) => (
              <div key={m.label}>
                <div className="text-[#8e8e86] mb-1 tracking-wider">{m.label}</div>
                <div className="text-[#121212] font-semibold normal-case text-[13px] font-sans leading-snug">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Hero image */}
          <div className="relative border border-[#e6e6e1] bg-white p-3 mb-12 shadow-sm">
            <div className="aspect-[16/8] overflow-hidden bg-[#f0f0eb] border border-[#e6e6e1]">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover grayscale-[0.2]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
            <div className="absolute top-6 left-6 bg-[#fbfbf9]/95 border border-[#e6e6e1] px-2.5 py-1 text-[10px] font-mono tracking-wider text-[#121212] uppercase">
              SYS.REF // {String(index + 1).padStart(2, "0")} · {project.category}
            </div>
          </div>

          {/* Metrics strip */}
          {project.metrics && project.metrics.length > 0 && (
            <div
              className="grid gap-px bg-[#e6e6e1] border border-[#e6e6e1] mb-16"
              style={{ gridTemplateColumns: `repeat(${Math.min(project.metrics.length, 3)}, minmax(0, 1fr))` }}
            >
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-white p-6 sm:p-8">
                  <div className="font-['Manrope'] font-extrabold text-3xl sm:text-5xl text-[#121212] tracking-tight mb-2">
                    {m.value}
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#72726c]">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Body: sticky TOC + sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <aside className="hidden lg:block lg:col-span-3">
              <nav className="sticky top-28" aria-label="Case study sections">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#82827a] mb-4">
                  CONTENTS
                </div>
                <ul className="space-y-1 border-l border-[#e6e6e1]">
                  {SECTIONS.map((s, i) => {
                    const isActive = active === s.id;
                    return (
                      <li key={s.id}>
                        <button
                          onClick={() => jumpTo(s.id)}
                          className={`-ml-px pl-4 py-1.5 border-l text-left text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                            isActive
                              ? "border-[#121212] text-[#121212] font-semibold"
                              : "border-transparent text-[#72726c] hover:text-[#121212]"
                          }`}
                        >
                          <span className={isActive ? "text-[#c26d52]" : "text-[#c26d52]/70"}>
                            {String(i + 1).padStart(2, "0")}
                          </span>{" "}
                          {s.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 pt-6 border-t border-[#e6e6e1] flex flex-col gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#121212] hover:bg-[#282826] text-white px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors"
                    >
                      <span>LIVE SYSTEM</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-[#d0d0c8] hover:border-[#121212] text-[#121212] px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>REPOSITORY</span>
                  </a>
                </div>
              </nav>
            </aside>

            <div className="lg:col-span-9 max-w-3xl">
              <Section id="overview" index={0}>
                <p className="font-['Inter'] text-[17px] text-[#383835] leading-[1.75] mb-8">
                  {cs.overview}
                </p>
                <div className="p-5 bg-white border border-[#e6e6e1]">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#72726c] mb-3">
                    PROJECT GOALS
                  </div>
                  <ul className="space-y-2.5">
                    {cs.goals.map((g) => (
                      <li key={g} className="flex items-start gap-2.5 text-sm text-[#444440] leading-relaxed">
                        <Dash />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>

              <Section id="problem" index={1}>
                <p className="font-['Inter'] text-[17px] text-[#383835] leading-[1.75] mb-6">
                  {cs.problem.summary}
                </p>
                <ul className="space-y-3">
                  {cs.problem.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[15px] text-[#444440] leading-relaxed">
                      <Dash />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="approach" index={2}>
                <ol className="space-y-0 border-t border-[#e6e6e1]">
                  {cs.approach.map((step, i) => (
                    <li
                      key={step.title}
                      className="grid grid-cols-[3rem_1fr] gap-4 py-5 border-b border-[#e6e6e1]"
                    >
                      <span className="font-mono text-sm text-[#c26d52] font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-['Manrope'] font-bold text-lg text-[#121212] mb-1">
                          {step.title}
                        </h3>
                        <p className="text-[15px] text-[#4a4a46] leading-relaxed">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Section>

              <Section id="architecture" index={3}>
                <div className="border border-[#e6e6e1] bg-white divide-y divide-[#e6e6e1]">
                  {cs.architecture.map((a, i) => (
                    <div key={a.layer} className="grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-1 sm:gap-6 p-4 sm:p-5">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#121212] font-semibold">
                        <span className="text-[#c26d52] mr-2">L{i + 1}</span>
                        {a.layer}
                      </div>
                      <div className="text-sm text-[#4a4a46] leading-relaxed">{a.detail}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#82827a] mb-2">
                    TECHNOLOGIES
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[11px] font-mono uppercase border border-[#d8d8d0] bg-white text-[#484844]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Section>

              <Section id="challenges" index={4}>
                <div className="space-y-4">
                  {cs.challenges.map((c) => (
                    <div key={c.challenge} className="grid grid-cols-1 sm:grid-cols-2 border border-[#e6e6e1] bg-white">
                      <div className="p-5 sm:border-r border-b sm:border-b-0 border-[#e6e6e1]">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#c26d52] font-semibold mb-2">
                          CHALLENGE
                        </div>
                        <p className="text-sm text-[#121212] font-medium leading-relaxed">{c.challenge}</p>
                      </div>
                      <div className="p-5 bg-[#fbfbf9]">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#72726c] mb-2">
                          SOLUTION
                        </div>
                        <p className="text-sm text-[#4a4a46] leading-relaxed">{c.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="results" index={5}>
                <div className="p-5 bg-white border border-[#e6e6e1] mb-6">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#72726c] mb-1 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#c26d52]" />
                    <span>HEADLINE IMPACT</span>
                  </div>
                  <div className="text-base font-medium text-[#121212] leading-relaxed">{project.impact}</div>
                </div>
                <ul className="space-y-3">
                  {cs.results.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-[15px] text-[#444440] leading-relaxed">
                      <Dash />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="reflections" index={6}>
                <ul className="space-y-3">
                  {cs.learnings.map((l) => (
                    <li key={l} className="flex items-start gap-2.5 text-[15px] text-[#444440] leading-relaxed">
                      <Dash />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Mobile links (sidebar is hidden below lg) */}
              <div className="lg:hidden flex flex-wrap gap-3 pt-6 border-t border-[#e6e6e1]">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#121212] text-white px-4 py-2 text-xs font-mono uppercase tracking-wider"
                  >
                    <span>LIVE SYSTEM</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#d0d0c8] text-[#121212] px-4 py-2 text-xs font-mono uppercase tracking-wider"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>REPOSITORY</span>
                </a>
              </div>
            </div>
          </div>

          {/* Next project */}
          <div className="mt-20 pt-10 border-t border-[#e6e6e1]">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#72726c] mb-4">
              NEXT CASE STUDY
            </div>
            <button
              onClick={() => navigate(projectPath(next.id))}
              className="group w-full text-left p-6 sm:p-8 bg-white border border-[#e6e6e1] hover:border-[#121212] shadow-sm transition-colors cursor-pointer flex items-center justify-between gap-6"
            >
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#c26d52] font-semibold mb-2">
                  {next.category}
                </div>
                <h3 className="font-['Manrope'] font-bold text-2xl sm:text-3xl text-[#121212] tracking-tight mb-1">
                  {next.title}
                </h3>
                <p className="text-sm text-[#60605a]">{next.subtitle}</p>
              </div>
              <ArrowRight className="w-6 h-6 text-[#121212] shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};