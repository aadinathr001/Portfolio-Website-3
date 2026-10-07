import React from "react";
import { Plus, Minus } from "lucide-react";
import { ExperienceItemData } from "../../data/portfolioData";

interface ExperienceItemProps {
  experience: ExperienceItemData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  experience,
  index,
  isOpen,
  onToggle,
  isLast,
}) => {
  const isCurrent = index === 0;

  // Split period into year and range if applicable
  const periodParts = experience.period.split("—");
  const startYear = periodParts[0]?.trim() || experience.period;
  const endYear = periodParts[1]?.trim() || (isCurrent ? "PRESENT" : "");

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pb-12 last:pb-4 group">
      {/* Column 1 & 2: Timeline Guide + Years (Left) */}
      <div className="md:col-span-3 flex items-start gap-4 sm:gap-5 relative">
        {/* Node & High-Contrast Continuous Vertical Spine */}
        <div className="relative flex flex-col items-center shrink-0 w-5 self-stretch">
          {!isLast && (
            <div
              className="w-[2px] bg-[#121212] absolute top-4 bottom-0 md:bottom-[-3.75rem] left-[9px] z-0"
              aria-hidden="true"
            />
          )}

          {/* High-Contrast Node with Paper Clearance Ring */}
          <div
            className={`relative z-10 w-4 h-4 rounded-full mt-1 flex items-center justify-center transition-all ${
              isCurrent
                ? "bg-[#c26d52] ring-4 ring-[#fbfbf9] shadow-sm"
                : "bg-white border-2 border-[#121212] ring-4 ring-[#fbfbf9] shadow-sm"
            }`}
          >
            {isCurrent ? (
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-[#121212]" />
            )}
          </div>
        </div>

        {/* Date Monospace Stack */}
        <div className="text-[12px] font-mono tracking-wider text-[#4a4a44] uppercase leading-tight pt-1">
          <div className="font-semibold text-[#121212]">{startYear}</div>
          {endYear && <div className="text-[#787870] font-normal">— {endYear}</div>}
        </div>
      </div>

      {/* Column 3: Role, Company Meta, Expandable Content (Center) */}
      <div className="md:col-span-8 flex flex-col">
        {/* Clickable Header Area */}
        <button
          type="button"
          onClick={onToggle}
          className="text-left cursor-pointer group/title focus:outline-none select-text"
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${experience.role} details`}
        >
          {/* Role Title (Manrope 700) */}
          <h3 className="font-['Manrope'] font-bold text-2xl sm:text-[28px] text-[#121212] group-hover/title:text-[#c26d52] tracking-tight leading-snug mb-2 transition-colors flex items-center gap-2">
            <span>{experience.role}</span>
          </h3>

          {/* Company & Location Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-[#555550] mb-2">
            <span className="font-semibold text-[#121212]">{experience.company}</span>
            <span className="text-[#b5b5ac]">·</span>
            <span className="font-mono uppercase text-[11px] tracking-wider text-[#7a7a72]">
              {experience.location}
            </span>
            {isCurrent && (
              <>
                <span className="text-[#b5b5ac]">·</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#c26d52] font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c26d52]" />
                  CURRENT
                </span>
              </>
            )}
          </div>
        </button>

        {/* Collapsible Details Area */}
        {isOpen && (
          <div className="pt-3 animate-fadeIn">
            {/* Body narrative description (Inter 400, 16-18px) */}
            <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] text-[#3e3e3b] leading-[1.68] mb-5 max-w-2xl">
              {experience.description}
            </p>

            {/* Crisp Hairline Boxed Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="border border-[#d6d6ce] bg-white/70 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#484844] hover:border-[#121212] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Architectural Deliverables & Highlights */}
            {experience.highlights && experience.highlights.length > 0 && (
              <div className="pt-5 border-t border-[#e6e6e1]">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#72726c] mb-3 font-medium">
                  ARCHITECTURAL DELIVERABLES & HIGHLIGHTS
                </div>
                <ul className="space-y-2.5">
                  {experience.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-sm text-[#444440] leading-relaxed">
                      <span className="text-[#c26d52] font-mono text-xs mt-0.5 select-none font-bold">—</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Column 4: Minimalist Square Toggle Button (Far Right) */}
      <div className="md:col-span-1 flex justify-end items-start pt-1">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Collapse details" : "Expand details"}
          className={`w-8 h-8 border transition-all flex items-center justify-center cursor-pointer ${
            isOpen
              ? "border-[#121212] bg-[#121212] text-white"
              : "border-[#d6d6ce] hover:border-[#121212] bg-white text-[#121212] hover:bg-neutral-100/60"
          }`}
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 stroke-[2]" />
          ) : (
            <Plus className="w-3.5 h-3.5 stroke-[2]" />
          )}
        </button>
      </div>
    </div>
  );
};
