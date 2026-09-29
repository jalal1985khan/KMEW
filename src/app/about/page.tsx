import Link from "next/link";
import {
  GraduationCap,
  ShieldCheck,
  Target,
  Eye,
  Heart,
  Award,
  Users2,
  FileCheck2,
  Building,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { LEADERSHIP_TEAM } from "@/lib/data/kmewData";

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 to-blue-950 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <span>Our Foundation & Purpose</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            About KMEW
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Kulti Maharaja Educational Welfare Organization (KMEW) is an independent non-profit institution founded to build equitable educational pathways, foster vocational self-reliance, and provide transparent welfare assistance.
          </p>
        </div>
      </section>

      {/* History & Story */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Our Journey Since 2012
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-snug">
              Rooted in the Industrial Heart of Bengal, Committed to Generational Change
            </h2>
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                KMEW was established in 2012 by a collective of veteran educators, community elders, and social workers in Kulti (Paschim Bardhaman). Witnessing bright students from foundry worker and marginalized families discontinue their education after secondary school due to economic strain, our founders resolved to create a sustainable safety net.
              </p>
              <p>
                What began as a single evening coaching shelter with 25 students has today evolved into a comprehensive digital welfare network spanning over 45 learning centers, thousands of annual scholarship recipients, and hundreds of verified community Associates.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-slate-800">
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Govt. Regd. Society S/1L/89241</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>80G & 12A Certified</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 aspect-4/3">
              <img
                src="/news/scholarship.png"
                alt="KMEW Classrooms"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-bold text-sm">Empowering merited students since 2012</p>
                <p className="text-xs text-slate-300">Annual scholarship assembly at Kulti Central Auditorium</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, and Values */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-slate-900">Mission, Vision & Core Values</h2>
            <p className="text-sm text-slate-600 mt-2">
              The foundational principles steering every program, audit, and community interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To eliminate financial barriers to higher education, nurture academic excellence through structured installment plans, and build vocational self-reliance for youth and women in underserved communities.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A society where every child and youth has uninterrupted access to quality education and career opportunities, regardless of socio-economic limitations or geography.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Core Values</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span><strong>Uncompromising Transparency:</strong> Verifiable multi-tier audit ledger.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span><strong>Grassroots Dignity:</strong> Respectful, mentorship-driven aid delivery.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span><strong>Accountability:</strong> Zero compromise on financial integrity.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Board of Trustees */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="team">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            Governance & Stewards
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-1">
            Board of Trustees & Leadership
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Experienced academic leaders, social workers, and chartered administrators guiding KMEW.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEADERSHIP_TEAM.map((leader, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col items-center text-center group"
            >
              <img
                src={leader.image}
                alt={leader.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 group-hover:border-amber-400 transition-colors mb-4"
              />
              <h3 className="text-base font-bold text-slate-900">{leader.name}</h3>
              <p className="text-xs font-semibold text-blue-900 mt-0.5">{leader.role}</p>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                {leader.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Legal & Regulatory Section (id="legal") */}
      <section className="py-16 bg-slate-900 text-white" id="legal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Legal, Compliance & Redressal
            </span>
            <h2 className="text-3xl font-black text-white">
              Organizational Credentials & Policies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <h3 className="text-sm font-bold text-amber-400">Society Registration & Acts</h3>
              <p className="leading-relaxed">
                Registered under the West Bengal Societies Registration Act, XXVI of 1961 (Registration No. S/1L/89241). Annual general meetings, executive board elections, and independent audits are conducted punctually as mandated by law.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <h3 className="text-sm font-bold text-emerald-400">Tax Exemption Certification</h3>
              <p className="leading-relaxed">
                KMEW holds valid 12A registration and 80G approval under the Income Tax Act, 1961. Donations from Indian taxpayers are eligible for a 50% tax deduction under Section 80G. Digital tax receipts are issued automatically upon receipt.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <h3 className="text-sm font-bold text-blue-400">Data Privacy & Protection</h3>
              <p className="leading-relaxed">
                Member records, Government ID numbers, and bank details are treated with strict confidentiality. Files are stored in private object storage, and access is governed strictly by Role-Based Access Control (RBAC).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <h3 className="text-sm font-bold text-pink-400">Grievance & Audit Helpline</h3>
              <p className="leading-relaxed">
                For queries, concerns regarding associate interactions, or financial discrepancies, contact our Grievance Redressal Committee at <strong>grievance@kmew.org.in</strong> or helpline <strong>+91 98765 43210</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
