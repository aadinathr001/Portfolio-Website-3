import React, { useState } from "react";
import { Mail, Copy, Check, Send, Github, Linkedin, Twitter, MessageSquare, ArrowRight } from "lucide-react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONFIG.EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 400);
  };

  return (
    <section id="contact" className="py-24 border-b border-[#e6e6e1] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 border-b border-[#e6e6e1] pb-6">
          <h2 className="font-['Manrope'] font-bold text-3xl sm:text-5xl text-[#121212] tracking-tight">
            Let's Connect.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct channels and social profiles */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="p-8 bg-white border border-[#e6e6e1] shadow-sm">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#72726c] mb-2 font-medium">
                DIRECT INBOX
              </div>
              <h3 className="font-['Manrope'] font-bold text-2xl text-[#121212] mb-3 leading-snug">
                Have an ambitious idea?
              </h3>
              <p className="font-['Inter'] font-normal text-sm sm:text-base text-[#464642] leading-relaxed mb-6">
                Whether you have questions about vision model optimization, agent frameworks, or potential engineering roles, I respond promptly to concise inquiries.
              </p>

              {/* Copy Email Box */}
              <div className="flex items-center justify-between p-3.5 bg-[#fbfbf9] border border-[#e6e6e1] mb-6">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#c26d52] shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-[#121212] truncate">
                    {PORTFOLIO_CONFIG.EMAIL}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 text-[11px] font-mono uppercase border border-[#d6d6ce] hover:border-[#121212] text-[#121212] transition-colors ml-2 shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <span className="text-[#c26d52] font-bold">COPIED</span>
                  ) : (
                    <span>COPY</span>
                  )}
                </button>
              </div>

              {/* Social Profiles */}
              <div className="pt-5 border-t border-[#e6e6e1]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#82827a] mb-3">
                  DIGITAL COORDINATES
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={PORTFOLIO_CONFIG.GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#dcdcd4] hover:border-[#121212] text-xs font-mono uppercase text-[#333330] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                  <a
                    href={PORTFOLIO_CONFIG.LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#dcdcd4] hover:border-[#121212] text-xs font-mono uppercase text-[#333330] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LINKEDIN</span>
                  </a>
                  <a
                    href={PORTFOLIO_CONFIG.TWITTER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#dcdcd4] hover:border-[#121212] text-xs font-mono uppercase text-[#333330] transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    <span>TWITTER/X</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 bg-white border border-[#e6e6e1] shadow-sm">
              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 border border-[#c26d52] bg-[#fbfbf9] flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-[#c26d52]" />
                  </div>
                  <h3 className="font-['Manrope'] font-bold text-2xl text-[#121212] mb-2">
                    Message Sent
                  </h3>
                  <p className="font-['Inter'] font-normal text-sm sm:text-base text-[#464642] max-w-md mb-6 leading-relaxed">
                    Thank you for reaching out, <span className="font-semibold text-[#121212]">{formData.name}</span>. Your message has been sent to {PORTFOLIO_CONFIG.EMAIL}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="px-5 py-2.5 text-xs font-mono uppercase border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white transition-colors cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-[11px] font-mono text-[#72726c] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c26d52]" />
                    <span>DIRECT INQUIRY FORM</span>
                  </div>


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-[11px] font-mono text-[#686862] uppercase mb-1.5">
                        NAME // SENDER *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name or organization"
                        className="w-full px-3.5 py-2.5 border border-[#d8d8d0] focus:border-[#121212] focus:outline-none text-sm text-[#121212] bg-[#fbfbf9] placeholder:text-[#9c9c94] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] font-mono text-[#686862] uppercase mb-1.5">
                        EMAIL // RETURN ADDRESS *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@domain.com"
                        className="w-full px-3.5 py-2.5 border border-[#d8d8d0] focus:border-[#121212] focus:outline-none text-sm text-[#121212] bg-[#fbfbf9] placeholder:text-[#9c9c94] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-[11px] font-mono text-[#686862] uppercase mb-1.5">
                      SUBJECT // TOPIC *
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Distributed Model Serving or Collaboration"
                      className="w-full px-3.5 py-2.5 border border-[#d8d8d0] focus:border-[#121212] focus:outline-none text-sm text-[#121212] bg-[#fbfbf9] placeholder:text-[#9c9c94] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[11px] font-mono text-[#686862] uppercase mb-1.5">
                      DISPATCH // MESSAGE *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project, context, timeline, or engineering inquiry..."
                      className="w-full px-3.5 py-2.5 border border-[#d8d8d0] focus:border-[#121212] focus:outline-none text-sm text-[#121212] bg-[#fbfbf9] placeholder:text-[#9c9c94] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#121212] hover:bg-[#282826] text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>SEND MESSAGE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
