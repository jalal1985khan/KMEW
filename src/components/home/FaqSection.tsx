"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("q1");

  const leftFaqs = [
    {
      id: "q1",
      question: "Who can become a KMEW member?",
      answer: "Any individual, student, or community member seeking educational assistance, scholarship grants, tuition support, or participation in community development can become a member."
    },
    {
      id: "q2",
      question: "How do I register?",
      answer: "You can register online through our digital Member Registration form by providing your basic details, government ID, student status, and bank account information for direct disbursements."
    },
    {
      id: "q3",
      question: "How long does membership approval take?",
      answer: "KMEW Central Administration typically reviews and verifies submitted member applications within 2 to 3 business days."
    },
    {
      id: "q4",
      question: "How is an Associate assigned?",
      answer: "Upon initial application approval, KMEW administration assigns a verified field associate operating in your local municipality or ward to mentor and assist you."
    }
  ];

  const rightFaqs = [
    {
      id: "q5",
      question: "How can I make a contribution?",
      answer: "Contributions can be made securely via UPI, direct bank NEFT/IMPS transfer, or through your assigned Associate. All contributions are 100% tax exempt under Section 80G."
    },
    {
      id: "q6",
      question: "How can I view my contribution history?",
      answer: "You can log in to your Member Portal anytime to track scheduled installments, payment dates, submission receipts, and verification stamps."
    },
    {
      id: "q7",
      question: "How can I contact my Associate?",
      answer: "Your assigned Associate's name, verified mobile number, and local office details are directly visible on your Member Portal dashboard upon login."
    },
    {
      id: "q8",
      question: "How can I update my member information?",
      answer: "You can edit your profile details, contact number, or upload updated identity documents directly inside the Member Portal or request your Associate to assist."
    }
  ];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 bg-[#fafcfb]" id="faqs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0e705b]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Find answers to common questions about membership, contributions and our programs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="text-xs sm:text-sm font-bold text-[#0e705b] hover:text-[#0a544b] flex items-center gap-1"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-1.5 ml-2">
              <button
                type="button"
                aria-label="Previous faqs"
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next faqs"
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
          {/* Left Column */}
          <div className="space-y-3">
            {leftFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50/50"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {faq.question}
                    </span>
                    <span className="text-slate-400 font-bold shrink-0">
                      {isOpen ? <Minus className="w-4 h-4 text-[#0e705b]" /> : <Plus className="w-4 h-4 text-slate-500" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {rightFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50/50"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {faq.question}
                    </span>
                    <span className="text-slate-400 font-bold shrink-0">
                      {isOpen ? <Minus className="w-4 h-4 text-[#0e705b]" /> : <Plus className="w-4 h-4 text-slate-500" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
