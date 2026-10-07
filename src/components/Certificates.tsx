import React from "react";
import { ExternalLink, Check } from "lucide-react";
import { CERTIFICATES_DATA } from "../data/portfolioData";

export const Certificates: React.FC = () => {
  return (
    <section id="certificates" className="py-24 border-b border-[#e6e6e1] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 border-b border-[#e6e6e1] pb-6">
          <h2 className="font-['Manrope'] font-bold text-3xl sm:text-5xl text-[#121212] tracking-tight">
            Certificates.
          </h2>
        </div>


        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES_DATA.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-[#e6e6e1] hover:border-[#121212] p-6 flex flex-col justify-between transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#82827a] uppercase mb-3">
                  <span className="text-[#c26d52] font-semibold">{cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>

                <h3 className="font-['Manrope'] font-bold text-lg sm:text-xl text-[#121212] tracking-tight mb-2 leading-snug">
                  {cert.title}
                </h3>

                <div className="text-xs font-mono text-[#686862] mb-4 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#c26d52]" />
                  <span>CREDENTIAL ID: {cert.credentialId}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[10px] font-mono uppercase border border-[#e0e0d8] text-[#555550]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#e6e6e1]">
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#121212] hover:text-[#c26d52] font-semibold"
                >
                  <span>VERIFY CREDENTIAL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
