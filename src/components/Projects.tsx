import React, { useState } from "react";
import { Github, ArrowUpRight, Activity, ArrowRight } from "lucide-react";
import {
  FEATURED_PROJECT,
  PROJECTS_DATA,
  ProjectItem
} from "../data/portfolioData";

const ALL_PROJECTS: ProjectItem[] = PROJECTS_DATA;
const GRID_PROJECTS: ProjectItem[] = PROJECTS_DATA.slice(1, 5);
const PROJECT_CATEGORIES: string[] = ["All", "Computer Vision", "Agentic Systems", "AI / ML", "Full-Stack"];

export const Projects: React.FC = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p: ProjectItem) => p.category === selectedCategory);

  const categoriesWithCounts = PROJECT_CATEGORIES.map((cat: string) => {
    const count =
      cat === "All"
        ? ALL_PROJECTS.length
        : ALL_PROJECTS.filter((p: ProjectItem) => p.category === cat).length;
    return { name: cat, count };
  });


  return (
    <section id="projects" className="py-24 border-b border-[#e6e6e1] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 border-b border-[#e6e6e1] pb-6">
          <h2 className="font-['Manrope'] font-bold text-3xl sm:text-5xl text-[#121212] tracking-tight">
            Selected Projects.
          </h2>
        </div>


        {/* Featured Case Study: Architectural Dossier */}
        <div id="featured-project" className="mb-20">
          <div className="bg-white border border-[#e6e6e1] shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Image with Field Label */}
              <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[440px] bg-[#f5f5f0] border-b lg:border-b-0 lg:border-r border-[#e6e6e1] p-6 sm:p-8 flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden border border-[#e6e6e1] bg-white">
                  <img
                    src={FEATURED_PROJECT.imageUrl}
                    alt={FEATURED_PROJECT.title}
                    className="w-full h-full object-cover object-center grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  {/* Field Note Stamp */}
                  <div className="absolute top-3 left-3 bg-[#fbfbf9]/95 border border-[#e6e6e1] px-2.5 py-1 text-[10px] font-mono tracking-wider text-[#121212] uppercase">
                    SYS.REF // 01 · {FEATURED_PROJECT.category}
                  </div>
                </div>
              </div>

              {/* Right Column: Specifications & Narrative */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c26d52] uppercase tracking-wider mb-2 font-semibold">
                    <span>FLAGSHIP SYSTEM</span>
                    <span className="text-[#c5c5be]">·</span>
                    <span className="text-[#787870] font-normal">{FEATURED_PROJECT.subtitle}</span>
                  </div>

                  {/* Project Name (Manrope 700 H3) */}
                  <h3 className="font-['Manrope'] font-bold text-2xl sm:text-3xl text-[#121212] tracking-tight mb-4 leading-snug">
                    {FEATURED_PROJECT.title}
                  </h3>

                  {/* Narrative (Inter 400 Body) */}
                  <p className="font-['Inter'] font-normal text-base text-[#3e3e3b] leading-[1.68] mb-6">
                    {FEATURED_PROJECT.description}
                  </p>

                  {/* Measured Impact */}
                  <div className="p-4 bg-[#fbfbf9] border border-[#e6e6e1] mb-6">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#72726c] mb-1 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#c26d52]" />
                      <span>MEASURED PRODUCTION BENCHMARK</span>
                    </div>
                    <div className="text-sm font-medium text-[#121212]">
                      {FEATURED_PROJECT.impact}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <div className="text-[10px] font-mono text-[#82827a] uppercase tracking-wider mb-2">
                      CORE APPARATUS
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {FEATURED_PROJECT.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[11px] font-mono uppercase border border-[#d8d8d0] bg-white text-[#484844]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* External Actions */}
                <div className="flex items-center gap-4 pt-6 border-t border-[#e6e6e1]">
                  {FEATURED_PROJECT.liveUrl && (
                    <a
                      href={FEATURED_PROJECT.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#121212] hover:bg-[#282826] text-white px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors"
                    >
                      <span>LIVE SYSTEM</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={FEATURED_PROJECT.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#d0d0c8] hover:border-[#121212] text-[#121212] px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>REPOSITORY</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Grid View */}
        {!showAllProjects ? (
          <div>
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#e6e6e1]">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#72726c]">
                ADDITIONAL PRODUCTION DEPLOYMENTS
              </div>
              <button
                onClick={() => setShowAllProjects(true)}
                className="text-[11px] font-mono uppercase tracking-wider text-[#121212] hover:text-[#c26d52] flex items-center gap-1 cursor-pointer"
              >
                <span>VIEW FULL ARCHIVE ({ALL_PROJECTS.length})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {GRID_PROJECTS.map((project: ProjectItem, idx: number) => (
                <div
                  key={project.id}
                  className="bg-white border border-[#e6e6e1] hover:border-[#121212] p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#82827a] uppercase mb-4">
                      <span>REF // 0{idx + 2} · {project.category}</span>
                      <span className="text-[#c26d52] font-semibold">{project.subtitle}</span>
                    </div>

                    <h3 className="font-['Manrope'] font-bold text-xl sm:text-2xl text-[#121212] tracking-tight mb-3">
                      {project.title}
                    </h3>

                    <p className="font-['Inter'] font-normal text-sm sm:text-[15px] text-[#4a4a46] leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="p-3 bg-[#fbfbf9] border border-[#e6e6e1] text-xs font-medium text-[#121212] mb-6">
                      <span className="text-[#c26d52] font-mono text-[10px] uppercase block mb-0.5">BENCHMARK:</span>
                      {project.impact}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((t: string) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] font-mono uppercase border border-[#dcdcd4] text-[#555550]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#e6e6e1] text-xs font-mono">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#60605a] hover:text-[#121212] uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>CODE</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#121212] hover:text-[#c26d52] uppercase tracking-wider font-semibold flex items-center gap-1"
                      >
                        <span>DEPLOYMENT</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Filtered Full Catalog */
          <div>
            {/* Filter Segmented Control */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#e6e6e1]">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {categoriesWithCounts.map((cat: { name: string; count: number }) => {
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors border ${
                        isActive
                          ? "bg-[#121212] text-white border-[#121212]"
                          : "border-[#d8d8d0] text-[#60605a] hover:border-[#121212] hover:text-[#121212] bg-white"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <sup className="ml-1 text-[9px] opacity-75">{cat.count}</sup>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowAllProjects(false)}
                className="text-xs font-mono uppercase text-[#70706a] hover:text-[#121212] self-end sm:self-center cursor-pointer"
              >
                COLLAPSE CATALOG ↑
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project: ProjectItem) => (
                <div
                  key={project.id}
                  className="bg-white border border-[#e6e6e1] hover:border-[#121212] p-6 flex flex-col justify-between transition-colors shadow-sm"
                >
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#c26d52] font-semibold mb-2">
                      {project.category}
                    </div>

                    <h3 className="font-['Manrope'] font-bold text-lg sm:text-xl text-[#121212] tracking-tight mb-2">
                      {project.title}
                    </h3>

                    <p className="font-['Inter'] font-normal text-xs sm:text-sm text-[#50504c] leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="text-[11px] font-mono text-[#121212] bg-[#fbfbf9] p-2.5 border border-[#e6e6e1] mb-4">
                      {project.impact}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-6">
                      {project.technologies.map((t: string) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 text-[9.5px] font-mono uppercase border border-[#e0e0d8] text-[#555550]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>


                  <div className="flex items-center justify-between pt-3 border-t border-[#e6e6e1] text-xs font-mono">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#60605a] hover:text-[#121212] uppercase"
                    >
                      REPO
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#121212] font-semibold uppercase flex items-center gap-1"
                      >
                        <span>LIVE</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
