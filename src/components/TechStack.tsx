import React, { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, Orbit } from "lucide-react";
import {
  TECH_CATEGORIES,
  TechCategoryType,
  TECH_STACK_DATA,
  TechItem
} from "../data/portfolioData";

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TechCategoryType>("AI & ML");
  const [selectedTech, setSelectedTech] = useState<TechItem>(TECH_STACK_DATA["AI & ML"][0]);

  const handleCategoryChange = (cat: TechCategoryType) => {
    setActiveCategory(cat);
    const firstItem = TECH_STACK_DATA[cat][0];
    if (firstItem) {
      setSelectedTech(firstItem);
    }
  };

  useEffect(() => {
    const currentList = TECH_STACK_DATA[activeCategory];
    if (currentList && !currentList.some((item) => item.id === selectedTech?.id)) {
      setSelectedTech(currentList[0]);
    }
  }, [activeCategory, selectedTech]);

  const activeTechList = TECH_STACK_DATA[activeCategory] || [];
  const selectedIndex = activeTechList.findIndex((t) => t.id === selectedTech?.id);
  const formattedIndex = String((selectedIndex >= 0 ? selectedIndex : 0) + 1).padStart(2, "0");

  return (
    <section id="stack" className="py-24 border-b border-[#e6e6e1] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 border-b border-[#e6e6e1] pb-6">
          <h2 className="font-['Manrope'] font-bold text-3xl sm:text-5xl text-[#121212] tracking-tight">
            Tech Stack.
          </h2>
        </div>


        {/* Category Navigation Bar */}
        <div className="mb-12 border-b border-[#e6e6e1]">
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto pb-3 scrollbar-none">
            {TECH_CATEGORIES.map((category, idx) => {
              const isActive = activeCategory === category;
              const count = TECH_STACK_DATA[category]?.length || 0;
              const numStr = String(idx + 1).padStart(2, "0");

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`group relative pb-3 px-1 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    isActive ? "text-[#121212] font-semibold" : "text-[#767670] hover:text-[#121212]"
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono ${
                      isActive ? "text-[#c26d52] font-bold" : "text-[#c26d52]/70"
                    }`}
                  >
                    {numStr}
                  </span>
                  <span>{category}</span>
                  <span className="text-[10px] text-[#9a9a92]">({count})</span>

                  {isActive && (
                    <span
                      className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#121212]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Grid of Tools */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeTechList.map((item, idx) => {
                const isSelected = selectedTech?.id === item.id;
                const rowNum = String(idx + 1).padStart(2, "0");

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTech(item)}
                    type="button"
                    className={`p-4 border transition-all text-left flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "border-[#121212] bg-white shadow-sm"
                        : "border-[#e6e6e1] bg-[#fbfbf9] hover:border-[#b8b8b0] hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className="text-[10px] font-mono text-[#8a8a82] w-5">
                        {rowNum}
                      </span>
                      <div className="w-7 h-7 border border-[#dcdcd4] bg-white flex items-center justify-center font-mono text-[10px] text-[#121212] font-bold shrink-0">
                        {item.initials}
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-medium tracking-tight truncate ${
                          isSelected ? "text-[#121212] font-bold" : "text-[#444440]"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected
                          ? "text-[#121212] translate-x-0"
                          : "text-[#b0b0a8] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Architectural Specification Panel */}
          <div className="lg:col-span-5">
            {selectedTech && (
              <div className="p-7 sm:p-8 bg-white border border-[#e6e6e1] shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-[#e6e6e1] mb-6 text-[11px] font-mono uppercase tracking-wider text-[#7a7a72]">
                  <span>SPEC // {formattedIndex} · {selectedTech.category}</span>
                  <span className="text-[#c26d52] font-semibold">{selectedTech.type}</span>
                </div>

                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-10 h-10 border border-[#121212] bg-[#fbfbf9] flex items-center justify-center font-mono text-xs font-bold text-[#121212] shrink-0">
                    {selectedTech.initials}
                  </div>
                  <div>
                    <h3 className="font-['Manrope'] font-bold text-2xl text-[#121212] tracking-tight">
                      {selectedTech.name}
                    </h3>
                  </div>
                </div>

                <p className="font-['Inter'] font-normal text-sm sm:text-[15px] text-[#42423e] leading-relaxed mb-6">
                  {selectedTech.description}
                </p>

                <div className="p-4 bg-[#fbfbf9] border border-[#e6e6e1] mb-6">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#72726c] mb-1">
                    PRODUCTION USE CASE
                  </div>
                  <div className="text-xs font-medium text-[#121212] leading-relaxed">
                    {selectedTech.goodFor}
                  </div>
                </div>

                {selectedTech.docsUrl && (
                  <a
                    href={selectedTech.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#121212] hover:text-[#c26d52] font-semibold"
                  >
                    <span>OFFICIAL DOCUMENTATION</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
