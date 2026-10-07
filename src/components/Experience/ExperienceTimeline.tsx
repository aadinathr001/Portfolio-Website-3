import React, { useState } from "react";
import { EXPERIENCE_DATA } from "../../data/portfolioData";
import { ExperienceItem } from "./ExperienceItem";

export const ExperienceTimeline: React.FC = () => {
  // Allow independent collapse/expand for each experience item (item 0 open by default)
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
      {EXPERIENCE_DATA.map((item, index) => (
        <ExperienceItem
          key={`${item.company}-${index}`}
          experience={item}
          index={index}
          isOpen={openIndices.has(index)}
          onToggle={() => handleToggle(index)}
          isLast={index === EXPERIENCE_DATA.length - 1}
        />
      ))}
    </div>
  );
};
