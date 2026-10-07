import React from "react";
import { Plus, Minus } from "lucide-react";
import { EducationItemData } from "../../data/portfolioData";

interface EducationItemProps {
  education: EducationItemData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}

export const EducationItem: React.FC<EducationItemProps> = ({
  education,
  index,
  isOpen,
  onToggle,
  isLast,
}) => {
  const isFirst = index === 0;
  const periodParts = education.period.split("—");
  const startYear = periodParts[0]?.trim() || education.period;
  const endYear = periodParts[1]?.trim() || "";

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pb-12 last:pb-4 group">
      {/* Column 1 & 2: Timeline Guide + Years */}
      <div className="md:col-span-3 flex items-start gap-4 sm:gap-5 relative">
        {/* Node & High-Contrast Continuous Vertical Spine */}
        <div className="relative flex flex-col items-center shrink-0 w-5">
          {!isLast && (
            <div
              className="w-[2px] bg-[#121212] absolute top-4 bottom-[-3rem] left-[9px] z-0"
              aria-hidden="true"
            />
          )}

          <div
            className={`relative z-10 w-4 h-4 rounded-full mt-1 flex items-center justify-center transition-all ${
              isFirst
                ? "bg-[#c26d52] ring-4 ring-[#fbfbf9] shadow-sm"
                : "bg-white border-2 border-[#121212] ring-4 ring-[#fbfbf9] shadow-sm"
            }`}
          >
            {isFirst ? (
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-[#121212]" />
            )}
          </div>
        </div>

        <div className="text-[12px] font-mono tracking-wider text-[#4a4a44] uppercase leading-tight pt-1">
          <div className="font-semibold text-[#121212]">{startYear}</div>
          {endYear && <div className="text-[#787870] font-normal">— {endYear}</div>}
        </div>
      </div>

      {/* Column 3: Degree Title, Institution, Expandable Details */}
      <div className="md:col-span-8 flex flex-col">
        {/* Clickable Header Area */}
        <button
          type="button"
          onClick={onToggle}
          className="text-left cursor-pointer group/title focus:outline-none select-text"
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${education.degree} details`}
        >
          <h3 className="font-['Manrope'] font-bold text-2xl sm:text-[28px] text-[#121212] group-hover/title:text-[#c26d52] tracking-tight leading-snug mb-2 transition-colors">
            {education.degree}
          </h3>

          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-[#555550] mb-2">
            <span className="font-semibold text-[#121212]">{education.institution}</span>
            <span className="text-[#b5b5ac]">·</span>
            <span className="font-mono uppercase text-[11px] tracking-wider text-[#7a7a72]">
              {education.location}
            </span>
            {education.grade && (
              <>
                <span className="text-[#b5b5ac]">·</span>
                <span className="font-mono text-[11px] text-[#c26d52] font-semibold tracking-wider">
                  {education.grade}
                </span>
              </>
            )}
          </div>
        </button>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="pt-3 animate-fadeIn">
            <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] text-[#3e3e3b] leading-[1.68] mb-5 max-w-2xl">
              {education.description}
            </p>

            {/* Coursework Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {education.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-[#d6d6ce] bg-white/70 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#484844] hover:border-[#121212] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Academic Highlights */}
            {education.highlights && education.highlights.length > 0 && (
              <div className="pt-5 border-t border-[#e6e6e1]">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#72726c] mb-3 font-medium">
                  ACADEMIC HONORS & SPECIALIZATIONS
                </div>
                <ul className="space-y-2.5">
                  {education.highlights.map((highlight, hIdx) => (
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

      {/* Column 4: Toggle Button */}
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
