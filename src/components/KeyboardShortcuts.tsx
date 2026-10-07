import React, { useState, useEffect } from "react";
import { X, Command } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface KeyboardShortcutsProps {
  onOpenChatbot: () => void;
  onOpenResume?: () => void;
}

interface ShortcutItem {
  key: string;
  label: string;
  description: string;
  action: () => void;
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  onOpenChatbot,
  onOpenResume
}) => {
  const [hudMessage, setHudMessage] = useState<{ key: string; text: string } | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const scrollTo = (id: string, label: string, keyNumber: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      showHud(keyNumber, `JUMPED TO ${label.toUpperCase()}`);
    }
  };

  const showHud = (key: string, text: string) => {
    setHudMessage({ key, text });
  };

  useEffect(() => {
    if (!hudMessage) return;
    const timer = setTimeout(() => {
      setHudMessage(null);
    }, 1800);
    return () => clearTimeout(timer);
  }, [hudMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Never trigger if modifier keys are pressed
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      // 2. Check if the active element or event target is an interactive form input
      const target = e.target as HTMLElement | null;
      const activeEl = document.activeElement as HTMLElement | null;

      const isInput = (el: HTMLElement | null) => {
        if (!el) return false;
        const tag = el.tagName.toLowerCase();
        return (
          tag === "input" ||
          tag === "textarea" ||
          tag === "select" ||
          el.isContentEditable ||
          el.getAttribute("role") === "textbox"
        );
      };

      if (isInput(target) || isInput(activeEl)) {
        return;
      }

      // 3. Handle '1' through '7' section jump shortcuts
      switch (e.key) {
        case "1":
          e.preventDefault();
          scrollTo("about", "About", "1");
          break;
        case "2":
          e.preventDefault();
          scrollTo("projects", "Projects", "2");
          break;
        case "3":
          e.preventDefault();
          scrollTo("experience", "Experience", "3");
          break;
        case "4":
          e.preventDefault();
          scrollTo("education", "Education", "4");
          break;
        case "5":
          e.preventDefault();
          scrollTo("certificates", "Certificates", "5");
          break;
        case "6":
          e.preventDefault();
          scrollTo("stack", "Tech Stack", "6");
          break;
        case "7":
          e.preventDefault();
          scrollTo("contact", "Contact", "7");
          break;
        case "c":
        case "C":
          e.preventDefault();
          onOpenChatbot();
          showHud("C", "AI ASSISTANT ENGAGED");
          break;
        case "?":
          e.preventDefault();
          setIsHelpOpen((prev) => !prev);
          break;
        case "Escape":
          if (isHelpOpen) {
            e.preventDefault();
            setIsHelpOpen(false);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHelpOpen, onOpenChatbot]);

  const shortcutsList: ShortcutItem[] = [
    { key: "1", label: "ABOUT", description: "Hero dossier & introduction", action: () => scrollTo("about", "About", "1") },
    { key: "2", label: "PROJECTS", description: "Selected systems & case studies", action: () => scrollTo("projects", "Projects", "2") },
    { key: "3", label: "EXPERIENCE", description: "Chronological industry ledger", action: () => scrollTo("experience", "Experience", "3") },
    { key: "4", label: "EDUCATION", description: "Academic & institutional background", action: () => scrollTo("education", "Education", "4") },
    { key: "5", label: "CERTIFICATES", description: "Accreditation register", action: () => scrollTo("certificates", "Certificates", "5") },
    { key: "6", label: "TECH STACK", description: "Indexed tooling apparatus", action: () => scrollTo("stack", "Tech Stack", "6") },
    { key: "7", label: "CONTACT", description: "Transmission & direct coordinates", action: () => scrollTo("contact", "Contact", "7") },
    {
      key: "C",
      label: "AI ASSISTANT",
      description: "Interactive dossier intelligence",
      action: () => {
        onOpenChatbot();
        showHud("C", "AI ASSISTANT ENGAGED");
      }
    },
    { key: "?", label: "KEYBOARD GUIDE", description: "Toggle this navigation guide", action: () => setIsHelpOpen((prev) => !prev) }
  ];

  return (
    <>
      {/* Bottom-Left Quick Indicator (Collapsed to left edge, expands & focuses on hover) */}
      <div className="hidden lg:block fixed bottom-6 left-0 sm:bottom-8 sm:left-0 z-40">
        <button
          onClick={() => setIsHelpOpen(true)}
          title="View Keyboard Navigation Guide (Press ?)"
          className="group relative flex items-center gap-2 px-3 py-2 border-y border-r border-[#d6d6ce] bg-[#fbfbf9]/95 backdrop-blur-md shadow-sm text-[11px] font-mono tracking-wider uppercase text-[#121212] cursor-pointer transition-all duration-300 ease-out -translate-x-[calc(100%-36px)] hover:translate-x-0 opacity-60 hover:opacity-100 hover:border-[#121212] hover:bg-white hover:shadow-md"
        >
          {/* Content revealed on hover */}
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="text-[#c26d52] font-semibold">1–7</span>
            <span className="text-[#7a7a72]">NAV</span>
            <span className="text-[#d0d0c8]">·</span>
            <span>SHORTCUTS</span>
          </div>

          {/* Visible collapsed tab anchor keycap */}
          <kbd className="px-1.5 py-0.5 border border-[#d6d6ce] group-hover:border-[#121212] bg-white text-[10px] text-[#121212] font-mono font-bold shrink-0 ml-1">
            ?
          </kbd>
        </button>
      </div>


      {/* Floating HUD Toast Notification on key press */}
      <AnimatePresence>
        {hudMessage && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="flex items-center gap-2.5 px-4 py-2 bg-[#121212] text-white border border-[#333330] shadow-xl text-xs font-mono uppercase tracking-wider">
              <span className="px-1.5 py-0.5 bg-white/10 text-[#c26d52] font-bold text-[11px]">
                {hudMessage.key}
              </span>
              <span>{hudMessage.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Cheat Sheet Modal (Swiss Editorial Architecture) */}
      <AnimatePresence>
        {isHelpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHelpOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-white border border-[#d0d0c8] p-7 sm:p-8 shadow-2xl overflow-hidden z-10 text-[#121212]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#e6e6e1] mb-6">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#c26d52] font-semibold mb-1">
                    INDEX // NAVIGATION SHORTCUTS
                  </div>
                  <h3 className="font-['Manrope'] font-bold text-lg text-[#121212]">
                    Architectural Keyboard Commands
                  </h3>
                </div>

                <button
                  onClick={() => setIsHelpOpen(false)}
                  className="p-1.5 border border-[#dcdcd4] hover:border-[#121212] text-[#121212] transition-colors cursor-pointer"
                  aria-label="Close shortcuts guide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Shortcuts List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {shortcutsList.map((shortcut) => (
                  <button
                    key={shortcut.key}
                    onClick={() => {
                      setIsHelpOpen(false);
                      shortcut.action();
                    }}
                    className="flex items-center justify-between p-2.5 border border-[#e6e6e1] hover:border-[#121212] bg-[#fbfbf9] hover:bg-white text-left transition-colors group cursor-pointer"
                  >
                    <div className="pr-2">
                      <div className="text-xs font-mono font-semibold text-[#121212] group-hover:text-[#c26d52] transition-colors">
                        {shortcut.label}
                      </div>
                      <div className="text-[10px] text-[#70706a] truncate max-w-[140px]">
                        {shortcut.description}
                      </div>
                    </div>

                    <kbd className="flex items-center justify-center min-w-[22px] h-5 px-1.5 bg-white border border-[#d0d0c8] text-xs font-mono font-bold text-[#121212] shrink-0">
                      {shortcut.key}
                    </kbd>
                  </button>
                ))}
              </div>

              {/* Footer Note */}
              <div className="pt-4 border-t border-[#e6e6e1] flex items-center justify-between text-[10px] font-mono uppercase text-[#787870]">
                <span>SAFE INSIDE ALL FORM INPUTS</span>
                <span>
                  PRESS <kbd className="px-1 py-0.5 border border-[#d0d0c8] bg-white text-[9px] text-[#121212]">ESC</kbd> TO CLOSE
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
