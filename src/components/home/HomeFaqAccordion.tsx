"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

interface HomeFaqAccordionProps {
  items: FaqItem[];
}

export function HomeFaqAccordion({ items }: HomeFaqAccordionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
          <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Everything you need to know about OmniCraft
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Answers to common questions regarding privacy, security, and tool capabilities.
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openFaq === idx;
          const buttonId = `faq-btn-${idx}`;
          const panelId = `faq-panel-${idx}`;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c1322]/70 backdrop-blur-md overflow-hidden transition-all duration-200 shadow-xs"
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-xs leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-white/5 pt-3"
                >
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
