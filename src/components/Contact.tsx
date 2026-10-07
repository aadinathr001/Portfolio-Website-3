import React, { useState } from "react";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONFIG.EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 border-b border-[#e6e6e1] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 border-b border-[#e6e6e1] pb-6">
          <h2 className="font-['Manrope'] font-bold text-3xl sm:text-5xl text-[#121212] tracking-tight">
            Let's Connect.
          </h2>
        </div>

        <div className="max-w-3xl">
          <div className="p-8 bg-white border border-[#e6e6e1] shadow-sm">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#72726c] mb-2 font-medium">
              DIRECT INBOX
            </div>
            <h3 className="font-['Manrope'] font-bold text-2xl text-[#121212] mb-3 leading-snug">
              Have an ambitious idea?
            </h3>
            <p className="font-['Inter'] font-normal text-sm sm:text-base text-[#464642] leading-relaxed mb-6">
              Whether you have questions about vision model optimization, agent frameworks, or potential engineering roles, I respond promptly to concise inquiries.
            </p>

            {/* Copy Email Box */}
            <div className="flex items-center justify-between p-3.5 bg-[#fbfbf9] border border-[#e6e6e1] mb-6">
              <div className="flex items-center gap-3 overflow-hidden">
                <Mail className="w-4 h-4 text-[#c26d52] shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-[#121212] truncate">
                  {PORTFOLIO_CONFIG.EMAIL}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-2.5 py-1 text-[11px] font-mono uppercase border border-[#d6d6ce] hover:border-[#121212] text-[#121212] transition-colors ml-2 shrink-0 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <span className="text-[#c26d52] font-bold">COPIED</span>
                ) : (
                  <span>COPY</span>
                )}
              </button>
            </div>

            {/* Social Profiles */}
            <div className="pt-5 border-t border-[#e6e6e1]">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#82827a] mb-3">
                DIGITAL COORDINATES
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={PORTFOLIO_CONFIG.GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#dcdcd4] hover:border-[#121212] text-xs font-mono uppercase text-[#333330] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GITHUB</span>
                </a>
                <a
                  href={PORTFOLIO_CONFIG.LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#dcdcd4] hover:border-[#121212] text-xs font-mono uppercase text-[#333330] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LINKEDIN</span>
                </a>
                <a
                  href={PORTFOLIO_CONFIG.TWITTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#dcdcd4] hover:border-[#121212] text-xs font-mono uppercase text-[#333330] transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>TWITTER/X</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};