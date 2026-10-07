import React from "react";
import { ExperienceTimeline } from "./ExperienceTimeline";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 border-b border-[#e6e6e1] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 border-b border-[#e6e6e1] pb-6">
          <h2 className="font-['Manrope'] font-bold text-3xl sm:text-5xl text-[#121212] tracking-tight">
            Work Experience.
          </h2>
        </div>


        {/* Clean Interactive Timeline matching reference screenshot */}
        <div className="max-w-6xl mx-auto">
          <ExperienceTimeline />
        </div>
      </div>
    </section>
  );
};
