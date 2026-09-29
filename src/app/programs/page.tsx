"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Search,
  CheckCircle2,
  FileCheck,
  Target,
  ArrowRight,
  Filter,
  Info
} from "lucide-react";
import { PROGRAMS_DATA, ProgramItem } from "@/lib/data/kmewData";

const PROGRAM_ALIASES: Record<string, string> = {
  "merit-cum-means-scholarship": "scholarships",
  "community-learning-centers": "education",
  "women-skill-vocational": "skill-development",
  "health-wellness-camps": "health-welfare",
  "school-readiness-kit": "school-support",
  "digital-literacy-youth": "community-classes"
};

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Scholarships", "Education", "Skill Development", "Health & Welfare", "School Support"];

  const filtered = PROGRAMS_DATA.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-blue-700" />
            <span>Comprehensive Directory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            KMEW Programs & Welfare Initiatives
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Explore our educational grants, vocational empowerment tracks, and community health camps. Members can apply directly online through our transparent portal.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs by keyword, scholarship, skill..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCategory === cat
                      ? "bg-blue-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Programs List */}
        <div className="space-y-8">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
              <Info className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-base font-bold text-slate-800">No programs match your search query.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-bold text-blue-900 underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filtered.map((program) => (
              <div
                key={program.id}
                id={program.id}
                className="relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12 scroll-mt-24"
              >
                {PROGRAM_ALIASES[program.id] && (
                  <span id={PROGRAM_ALIASES[program.id]} className="absolute -top-24 block" />
                )}
                {/* Left Image */}
                <div className="lg:col-span-5 relative h-64 lg:h-auto bg-slate-100">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-white text-blue-950 shadow-xs">
                      {program.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-slate-900/80 backdrop-blur-xs text-white">
                      {program.impactStats}
                    </span>
                  </div>
                </div>

                {/* Right Details */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                        Status: {program.status}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900">
                      {program.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {program.detailedDescription}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {/* Objectives */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-blue-700" /> Key Objectives
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {program.objectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Eligibility */}
                      <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/60 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5 text-amber-700" /> Eligibility
                        </h4>
                        <ul className="space-y-1.5 text-xs text-amber-950 font-medium">
                          {program.eligibility.map((el, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                              <span>{el}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-slate-500">
                      Installment support formulated by assigned Associate upon approval.
                    </span>

                    <Link
                      href={`/register/member?program=${program.id}`}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-900 hover:bg-blue-800 text-white shadow-md flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>Apply Online as Member</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
