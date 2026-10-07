import React from "react";
import { EducationTimeline } from "./EducationTimeline";

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 border-b border-[#e6e6e1] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 border-b border-[#e6e6e1] pb-6">
          <h2 className="font-['Manrope'] font-bold text-3xl sm:text-5xl text-[#121212] tracking-tight">
            Education & Academics.
          </h2>
        </div>


        {/* Clean Interactive Timeline */}
        <div className="max-w-6xl mx-auto">
          <EducationTimeline />
        </div>
      </div>
    </section>
  );
};
