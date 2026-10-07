import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  // // Live real-time clock for Bangalore / local time zone
  // useEffect(() => {
  //   const updateTime = () => {
  //     const now = new Date();
  //     // IST / Bangalore time format: BLR HH:MM
  //     const formatted = now.toLocaleTimeString("en-GB", {
  //       timeZone: "Asia/Kolkata",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       hour12: false
  //     });
  //     setTimeStr(`BLR ${formatted}`);
  //   };

  //   updateTime();
  //   const interval = setInterval(updateTime, 1000 * 30);
  //   return () => clearInterval(interval);
  // }, []);

const navItems = [
  { num: "01", label: "ABOUT", href: "#about" },
  { num: "02", label: "PROJECTS", href: "#projects" },
  { num: "03", label: "EXPERIENCE", href: "#experience" },
  { num: "04", label: "EDUCATION", href: "#education" },
  { num: "05", label: "CERTIFICATES", href: "#certificates" },
  { num: "06", label: "STACK", href: "#stack" },
  { num: "07", label: "CONTACT", href: "#contact" }
];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fbfbf9]/92 backdrop-blur-md border-b border-[#e6e6e1] transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Swiss Monogram & Year Badge */}
        <a
          href="#about"
          className="group flex items-baseline gap-1 text-[#121212] hover:opacity-80 transition-opacity"
          aria-label="Home"
        >
          <span className="font-['Manrope'] font-extrabold text-base tracking-tighter text-[#121212]">
            AR
          </span>
          <span className="text-[10px] font-mono text-[#8c8c85] tracking-tight">
            ©26
          </span>
        </a>

        {/* Center: Swiss Editorial Navigation with Terracotta Numeric Indicators */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`group relative py-1 text-[11px] font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "text-[#121212] font-semibold"
                    : "text-[#72726c] hover:text-[#121212]"
                }`}
              >
                {/* Terracotta index number */}
                <span
                  className={`text-[10px] font-mono transition-colors ${
                    isActive ? "text-[#c26d52] font-bold" : "text-[#c26d52]/70 group-hover:text-[#c26d52]"
                  }`}
                >
                  {item.num}
                </span>

                {/* Section title */}
                <span>{item.label}</span>

                {/* Understated hairline indicator */}
                {isActive && (
                  <span
                    className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-[#121212]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Architectural Boxed Resume Button & Monospace Clock */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onOpenResume}
            className="px-3.5 py-1 text-[11px] font-mono tracking-wider uppercase text-[#121212] border border-[#d6d6ce] hover:border-[#121212] hover:bg-[#121212]/[0.03] transition-all cursor-pointer"
          >
            RESUME
          </button>

          {/* Timezone / Live Clock
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#8a8a82]">
            <span>{timeStr || "BLR 15:47"}</span>
          </div> */}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#121212] hover:bg-neutral-100 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#121212]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-[#fbfbf9] border-b border-[#e6e6e1] px-6 py-6 shadow-lg">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center gap-2.5 text-xs font-mono tracking-wider py-1.5 border-b border-[#f0f0eb] ${
                    isActive ? "text-[#121212] font-bold" : "text-[#70706a]"
                  }`}
                >
                  <span className="text-[#c26d52] font-mono text-[10px]">{item.num}</span>
                  <span>{item.label}</span>
                </a>
              );
            })}

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#888880]">
              {/* <span>TIME: {timeStr}</span> */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="px-3 py-1 text-[11px] font-mono uppercase border border-[#121212] text-[#121212]"
              >
                OPEN RESUME
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
