"use client";

import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  FileText,
  Download,
  IndianRupee,
  GraduationCap,
  Users,
  Building,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { IMPACT_METRICS, SUCCESS_STORIES } from "@/lib/data/kmewData";

export default function ImpactPage() {
  const fundBreakdown = [
    { title: "Direct Student Scholarships & Tuition Grants", percent: 64, color: "bg-blue-600" },
    { title: "Community Learning Centers & Evening Coaching", percent: 18, color: "bg-amber-500" },
    { title: "Women Skill Development & Equipment Kits", percent: 9, color: "bg-emerald-600" },
    { title: "Health Diagnostic Camps & Medicine Distribution", percent: 5, color: "bg-rose-500" },
    { title: "Administration, Audit, and Compliance", percent: 4, color: "bg-slate-400" },
  ];

  const auditReports = [
    { year: "Financial Year 2025-26", title: "Statutory Auditor's Report & 12A/80G Filing", size: "2.4 MB" },
    { year: "Financial Year 2024-25", title: "Annual Impact & Member Milestone Evaluation", size: "3.1 MB" },
    { year: "Financial Year 2023-24", title: "Comprehensive Social Audit & Utilization Certificate", size: "1.8 MB" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Verifiable Results</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Our Measurable Impact & Transparency
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every rupee entrusted to KMEW is tracked with utmost fidelity. We believe true educational welfare requires unyielding public transparency and continuous auditing.
          </p>
        </div>

        {/* Big Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {IMPACT_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight block">
                  {metric.value}
                </span>
                <h3 className="text-base font-bold text-blue-900 mt-2">
                  {metric.label}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Fund Utilization Transparency */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Financial Integrity Pledge
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Where Your Contributions & Grants Go
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              96% of all received funds are deployed directly into beneficiary programs, learning infrastructure, and student grants. Administrative overhead is capped at 4%.
            </p>
          </div>

          <div className="space-y-4">
            {fundBreakdown.map((item) => (
              <div key={item.title} className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-800">
                  <span>{item.title}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Independent audits conducted annually by certified Chartered Accountants.</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Quarterly utilization reports reviewed by the Academic & Welfare Advisory Board.</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>100% digital receipts generated for every installment and voluntary donor contribution.</span>
            </div>
          </div>
        </div>

        {/* Downloadable Annual Reports */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white">Public Audit Disclosures & Reports</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Download certified annual returns, audited balance sheets, and social impact audit records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {auditReports.map((report, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-400/50 transition-colors flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {report.year}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">
                    {report.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 mt-2 block">
                    PDF Document • {report.size}
                  </span>
                </div>

                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Simulated download: ${report.title}`);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Report</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
