import React, { useEffect, useRef } from "react";
import { X, Printer, Download, ExternalLink } from "lucide-react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import resumeUrl from "../assets/aadinath_r_resume.pdf?url";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const fileName = `${PORTFOLIO_CONFIG.NAME.replace(/\s+/g, "_")}_Resume.pdf`;

  const handlePrint = () => {
    try {
      const frame = iframeRef.current?.contentWindow;
      if (!frame) throw new Error("no frame");
      frame.focus();
      frame.print();
    } catch {
      // Some browsers block printing from the embedded PDF viewer
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/45 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-4xl h-[92vh] bg-white border border-[#d6d6ce] shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#e6e6e1] bg-[#fbfbf9] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#c26d52] shrink-0" />
            <h2
              id="resume-title"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-[#121212] truncate"
            >
              RESUME // {PORTFOLIO_CONFIG.NAME.toUpperCase()}
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#d4d4cc] hover:border-[#121212] text-xs font-mono uppercase tracking-wider text-[#121212] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#c26d52]" />
              <span className="hidden sm:inline">PRINT</span>
            </button>

            <a
              href={resumeUrl}
              download={fileName}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#121212] bg-[#121212] hover:bg-[#282826] text-xs font-mono uppercase tracking-wider text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">DOWNLOAD</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 border border-[#d4d4cc] hover:border-[#121212] text-[#121212] transition-colors cursor-pointer"
              aria-label="Close resume modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-[#f5f5f0] min-h-0">
          <iframe
            ref={iframeRef}
            src={resumeUrl}
            title={`${PORTFOLIO_CONFIG.NAME} Resume`}
            className="w-full h-full border-0"
          />
        </div>

        {/* Footer (fallback for browsers that can't embed PDFs, e.g. many mobile browsers) */}
        <div className="px-4 py-2.5 border-t border-[#e6e6e1] bg-[#fbfbf9] flex items-center justify-between text-[11px] font-mono text-[#787870] shrink-0">
          <span>PDF NOT SHOWING?</span>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 uppercase tracking-wider text-[#121212] hover:text-[#c26d52] font-semibold"
          >
            <span>OPEN IN NEW TAB</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};