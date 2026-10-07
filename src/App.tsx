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


export default function App() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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
    <div className="relative min-h-screen bg-architectural-grid text-[#121212] selection:bg-[#c26d52]/15 selection:text-[#121212]">
      {/* Dynamic Glassmorphism Fixed Navigation Bar */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        activeSection={activeSection}
      />


      {/* Main Portfolio Sections */}
      <main className="relative z-10">
        {/* Two-Column Hero with Profile Image & 3 CTAs */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Selected Projects: Featured Case Study + 4-Card Grid + Filterable View */}
        <Projects />

        {/* Interactive Experience Timeline with Summary Statistics */}
        <Experience />

        {/* Interactive Education Timeline with Academic Details */}
        <Education />

        {/* Verified Industry Certifications */}
        <Certificates />

        {/* My Tech Stack: Two-Column Explorer & Interactive Details Panel */}
        <TechStack />

        {/* Contact Terminal & Direct Channels */}
        <Contact />
      </main>

      {/* Editorial Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Structured Printable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Floating In-Memory RAG Chatbot */}
      <Chatbot
        isOpen={isChatbotOpen}
        onOpenChange={setIsChatbotOpen}
      />

      {/* Global Keyboard Navigation (1-7 jump, C for chat, ? for help) */}
      <KeyboardShortcuts
        onOpenChatbot={() => setIsChatbotOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />
    </div>
  );
}



