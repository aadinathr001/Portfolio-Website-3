import React from "react";
import { ArrowDown, Mail, FileText, ArrowRight, CornerDownRight } from "lucide-react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import { motion } from "motion/react";

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { NAME, ROLE, SHORT_INTRO } = PORTFOLIO_CONFIG;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="relative pt-32 pb-20 sm:pt-36 sm:pb-28 border-b border-[#e6e6e1]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Technical Kicker Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-[#e6e6e1] text-[11px] font-mono tracking-widest uppercase text-[#7a7a72]">
          <div className="flex items-center gap-2">
            {/* <span className="w-1.5 h-1.5 rounded-full bg-[#c26d52]" /> */}
            {/* <span className="text-[#121212] font-semibold">DOSSIER REF: AR-2026</span> */}
            {/* <span className="text-[#c0c0b8]">/</span> */}
            {/* <span>SYSTEMS & ML ENGINEERING</span> */}
          </div>
          <div className="hidden md:flex items-center gap-4 text-[#8a8a82]">
            {/* <span>COORD: 12.9716° N, 77.5946° E</span> */}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Oversized Grotesk Typography & Narrative */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            {/* Display Headline with Hi, I'm Aadinath */}
            <h1 className="font-['Manrope'] tracking-tighter text-[#121212] leading-[1.02] text-balance mb-6">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#6e6e68] block mb-2 font-['Manrope']">
                Hi, I'm
              </span>
              <span className="text-5xl sm:text-7xl lg:text-[84px] font-extrabold block">
                {NAME}.
              </span>
            </h1>

            {/* Role Header */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs sm:text-sm font-mono tracking-wider uppercase text-[#c26d52] font-semibold">
                {ROLE}
              </span>
              <span className="text-[#d0d0c8]">/</span>
              <span className="text-xs sm:text-sm font-mono text-[#787870]">
                Neural Systems & Distributed Platforms
              </span>
            </div>

            {/* Primary Narrative Prose: Inter 400 (17-18px) */}
            <p className="font-['Inter'] font-normal text-base sm:text-[18px] text-[#383835] leading-[1.7] max-w-2xl mb-10 text-balance">
              {SHORT_INTRO}
            </p>

            {/* Technical Specifications Grid / Hairline Divider */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-[#e6e6e1] w-full mb-10 text-[11px] font-mono uppercase">
              <div>
                <div className="text-[#8e8e86] mb-1">LOCATION</div>
                <div className="text-[#121212] font-semibold">{PORTFOLIO_CONFIG.LOCATION}</div>
              </div>
              <div>
                <div className="text-[#8e8e86] mb-1">SPECIALIZATION</div>
                <div className="text-[#121212] font-semibold">NEURAL ARCHITECTURES</div>
              </div>
              <div>
                <div className="text-[#8e8e86] mb-1">ENGINEERING</div>
                <div className="text-[#121212] font-semibold">DISTRIBUTED & AGENTIC</div>
              </div>
              <div>
                <div className="text-[#8e8e86] mb-1">AVAILABILITY</div>
                <div className="text-[#c26d52] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c26d52]" />
                  <span>ACTIVE / 2026</span>
                </div>
              </div>
            </div>

            {/* Swiss Architectural Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#121212] hover:bg-[#2a2a28] text-white text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>EXPLORE SELECTED SYSTEMS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-[#cfcfc7] hover:border-[#121212] hover:bg-neutral-100/50 text-[#121212] text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>GET IN TOUCH</span>
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-[#cfcfc7] hover:border-[#121212] hover:bg-neutral-100/50 text-[#121212] text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>TECHNICAL CV</span>
                <CornerDownRight className="w-3.5 h-3.5 text-[#888880]" />
              </button>
            </div>
          </div>


          {/* Right Column: Architectural Field Specimen (Profile Image) */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
            <div className="relative w-full max-w-[340px] bg-white border border-[#e6e6e1] p-3 shadow-sm">
              {/* Corner crosshairs */}
              <span className="absolute -top-1.5 -left-1.5 text-xs font-mono text-[#a8a8a0] select-none">+</span>
              <span className="absolute -top-1.5 -right-1.5 text-xs font-mono text-[#a8a8a0] select-none">+</span>
              <span className="absolute -bottom-1.5 -left-1.5 text-xs font-mono text-[#a8a8a0] select-none">+</span>
              <span className="absolute -bottom-1.5 -right-1.5 text-xs font-mono text-[#a8a8a0] select-none">+</span>

              {/* Photo Frame */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f0f0eb] border border-[#e6e6e1]">
                <img
                  src="/aadinath_photo.png"
                  alt={NAME}
                  className="w-full h-full object-cover object-center grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-700"
                />

              </div>

              {/* Specimen Caption */}
              <div className="pt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#7a7a72]">
                <span>FIG 01.1 // ARCHITECT DOSSIER</span>
                <span className="text-[#c26d52]">INDEX 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
