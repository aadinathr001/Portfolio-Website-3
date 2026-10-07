import React from "react";
import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#e6e6e1] bg-[#fbfbf9] pt-12 pb-24 sm:pb-20 text-[#60605a]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#e6e6e1]">
          {/* Colophon Left */}
          <div>
            <div className="font-['Manrope'] font-extrabold text-lg tracking-tight text-[#121212] mb-1">
              {PORTFOLIO_CONFIG.NAME}
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#82827a]">
              {/* SWISS EDITORIAL PORTFOLIO // ISSUE 2026 · ALL RIGHTS RESERVED */}
            </div>
          </div>

          {/* Quick Links in monospace */}
          <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono uppercase tracking-wider">
            <a href="#about" className="hover:text-[#121212] transition-colors">01 ABOUT</a>
            <a href="#projects" className="hover:text-[#121212] transition-colors">02 PROJECTS</a>
            <a href="#experience" className="hover:text-[#121212] transition-colors">03 EXPERIENCE</a>
            <a href="#education" className="hover:text-[#121212] transition-colors">04 EDUCATION</a>
            <a href="#certificates" className="hover:text-[#121212] transition-colors">05 CERTIFICATES</a>
            <a href="#stack" className="hover:text-[#121212] transition-colors">06 STACK</a>
            <a href="#contact" className="hover:text-[#121212] transition-colors">07 CONTACT</a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 border border-[#d6d6ce] hover:border-[#121212] text-xs font-mono uppercase text-[#121212] transition-colors cursor-pointer"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Technical Colophon Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-wider text-[#92928a]">
          <div>
            TYPOGRAPHY: MANROPE 800/700 & INTER 400 · JETBRAINS MONO
          </div>
          <div>
            ARCHITECTURAL SPECIFICATION · NO GRADIENTS · HAIRLINE GRID
          </div>
        </div>
      </div>
    </footer>
  );
};
