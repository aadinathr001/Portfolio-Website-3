import React, { useState } from "react";
import { EDUCATION_DATA } from "../../data/portfolioData";
import { EducationItem } from "./EducationItem";

export const EducationTimeline: React.FC = () => {
  // Allow independent collapse/expand for each education item (item 0 open by default)
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

  const handleToggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="relative">
      {EDUCATION_DATA.map((item, index) => (
        <EducationItem
          key={`${item.institution}-${index}`}
          education={item}
          index={index}
          isOpen={openIndices.has(index)}
          onToggle={() => handleToggle(index)}
          isLast={index === EDUCATION_DATA.length - 1}
        />
      ))}
    </div>
  );
};
