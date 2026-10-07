import React from "react";
import { Briefcase, Building2, FolderGit2 } from "lucide-react";

interface ExperienceSummaryProps {
  yearsExperience: string;
  companiesCount: number;
  projectsCount: string | number;
}

export const ExperienceSummary: React.FC<ExperienceSummaryProps> = ({
  yearsExperience,
  companiesCount,
  projectsCount,
}) => {
  const stats = [
    {
      label: "Years of Experience",
      value: yearsExperience,
      icon: Briefcase,
    },
    {
      label: "Companies & Labs",
      value: companiesCount,
      icon: Building2,
    },
    {
      label: "Production Systems",
      value: projectsCount,
      icon: FolderGit2,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="flex items-center gap-4 p-5 rounded-xl bg-slate-900/40 backdrop-blur-sm border border-white/[0.08] hover:border-cyan-400/30 transition-colors"
          >
            <div className="w-11 h-11 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-['Manrope'] font-bold text-white tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-slate-400">

                {stat.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
