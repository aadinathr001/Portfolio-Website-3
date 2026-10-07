/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience/Experience";
import { Education } from "./components/Education/Education";
import { Certificates } from "./components/Certificates";
import { TechStack } from "./components/TechStack";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ResumeModal } from "./components/ResumeModal";
import { Chatbot } from "./components/Chatbot/Chatbot";
import { KeyboardShortcuts } from "./components/KeyboardShortcuts";
import { CaseStudyPage } from "./components/CaseStudy/CaseStudyPage";
import { usePathname, matchProjectRoute, restoreHomeScroll } from "./utils/router";
import { InteractiveBackground } from "./components/InteractiveBackground";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const pathname = usePathname();
  const projectSlugParam = matchProjectRoute(pathname);

  // On route change: case studies start at top, home restores where you were
  useEffect(() => {
    if (projectSlugParam) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    } else {
      restoreHomeScroll();
    }
  }, [projectSlugParam]);

  useEffect(() => {
    const sections = [
      "about",
      "projects",
      "experience",
      "education",
      "certificates",
      "stack",
      "contact"
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="isolate relative min-h-screen bg-architectural-grid text-[#121212] selection:bg-[#c26d52]/15 selection:text-[#121212]">
      <InteractiveBackground />
      {projectSlugParam ? (
        <CaseStudyPage slug={projectSlugParam} />
      ) : (
        <>
          <Navbar
            onOpenResume={() => setIsResumeOpen(true)}
            activeSection={activeSection}
          />

          <main className="relative z-10">
            <Hero onOpenResume={() => setIsResumeOpen(true)} />
            <Projects />
            <Experience />
            <Education />
            <Certificates />
            <TechStack />
            <Contact />
          </main>

          <div className="relative z-10">
            <Footer />
          </div>

          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />
        </>
      )}

      <Chatbot
        isOpen={isChatbotOpen}
        onOpenChange={setIsChatbotOpen}
      />

      <KeyboardShortcuts
        onOpenChatbot={() => setIsChatbotOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />
    </div>
  );
}