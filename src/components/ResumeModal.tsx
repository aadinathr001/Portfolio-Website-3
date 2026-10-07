import React from "react";
import { X, Printer, Mail, MapPin, ExternalLink } from "lucide-react";
import {
  PORTFOLIO_CONFIG,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  CERTIFICATES_DATA,
  PROJECTS_DATA
} from "../data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/45 backdrop-blur-sm overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-4xl bg-white border border-[#d6d6ce] shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#e6e6e1] bg-[#fbfbf9] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#c26d52]" />
            <h2 id="resume-title" className="text-xs font-mono font-semibold uppercase tracking-wider text-[#121212]">
              CURRICULUM VITAE // {PORTFOLIO_CONFIG.NAME.toUpperCase()}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#d4d4cc] hover:border-[#121212] text-xs font-mono uppercase tracking-wider text-[#121212] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#c26d52]" />
              <span>PRINT / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 border border-[#d4d4cc] hover:border-[#121212] text-[#121212] transition-colors cursor-pointer"
              aria-label="Close resume modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className="overflow-y-auto p-8 sm:p-12 space-y-8 text-[#121212] bg-white">
          {/* Resume Header */}
          <div className="border-b border-[#e6e6e1] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-['Manrope'] font-extrabold text-[#121212] tracking-tight">
                {PORTFOLIO_CONFIG.NAME}
              </h1>
              <div className="text-xs font-mono uppercase tracking-wider text-[#c26d52] font-semibold mt-1">
                {PORTFOLIO_CONFIG.ROLE}
              </div>
            </div>

            <div className="text-xs font-mono text-[#686862] space-y-1 sm:text-right">
              <div>{PORTFOLIO_CONFIG.EMAIL}</div>
              <div>{PORTFOLIO_CONFIG.LOCATION}</div>
              <div className="text-[#999990]">{PORTFOLIO_CONFIG.GITHUB.replace("https://", "")}</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#72726c] mb-2 font-semibold">
              EXECUTIVE PROFILE
            </div>
            <p className="text-sm leading-relaxed text-[#383835]">
              {PORTFOLIO_CONFIG.SHORT_INTRO} Specializing in high-throughput computer vision inference, neural pipeline optimization, multi-agent frameworks, and distributed full-stack architectures.
            </p>

          </div>

          {/* Experience Section */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#72726c] mb-4 font-semibold pb-1 border-b border-[#e6e6e1]">
              INDUSTRY EXPERIENCE
            </div>
            <div className="space-y-6">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="font-['Manrope'] font-bold text-base text-[#121212]">
                      {exp.role} · <span className="font-normal text-[#585854]">{exp.company}</span>
                    </div>
                    <div className="text-xs font-mono text-[#82827a] uppercase">
                      {exp.period} · {exp.location}
                    </div>
                  </div>
                  <p className="text-xs text-[#444440] leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="list-disc list-inside text-xs text-[#555550] space-y-1 pl-1">
                    {exp.highlights.slice(0, 2).map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {exp.technologies.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 text-[10px] font-mono uppercase border border-[#e0e0d8] text-[#555550]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#72726c] mb-4 font-semibold pb-1 border-b border-[#e6e6e1]">
              ACADEMIC BACKGROUND
            </div>
            <div className="space-y-4">
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="font-['Manrope'] font-bold text-sm text-[#121212]">
                      {edu.degree} — {edu.institution}
                    </div>
                    <div className="text-xs font-mono text-[#82827a]">
                      {edu.period} · {edu.location}
                    </div>
                  </div>
                  <div className="text-xs text-[#555550] mt-1">
                    Field: {edu.field} {edu.grade ? `· Grade: ${edu.grade}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Systems */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#72726c] mb-4 font-semibold pb-1 border-b border-[#e6e6e1]">
              SELECTED PRODUCTION SYSTEMS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS_DATA.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3 border border-[#e6e6e1] bg-[#fbfbf9]">
                  <div className="font-bold text-xs text-[#121212] mb-1">{p.title}</div>
                  <div className="text-[11px] text-[#555550] leading-snug mb-1">{p.description}</div>
                  <div className="text-[10px] font-mono text-[#c26d52] font-semibold">{p.impact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#e6e6e1] bg-[#fbfbf9] flex items-center justify-between text-xs font-mono text-[#787870] shrink-0">
          <span>VERIFIED DOSSIER // ISSUE 2026</span>
          <span>BENGALURU, IN</span>
        </div>
      </div>
    </div>
  );
};
