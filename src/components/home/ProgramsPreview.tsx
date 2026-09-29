"use client";

import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Users,
  Building,
  Briefcase,
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export function ProgramsPreview() {
  const programs = [
    {
      id: "scholarships",
      title: "Scholarships",
      description: "Providing educational assistance to deserving students.",
      image: "/programs/scholarships.png",
      icon: <GraduationCap className="w-4 h-4 text-amber-700" />,
      iconBg: "bg-amber-100",
      href: "/programs#scholarships"
    },
    {
      id: "education",
      title: "Education",
      description: "Supporting quality education for brighter futures.",
      image: "/programs/education.png",
      icon: <BookOpen className="w-4 h-4 text-blue-700" />,
      iconBg: "bg-blue-100",
      href: "/programs#education"
    },
    {
      id: "community-classes",
      title: "Community Classes",
      description: "Learning opportunities for children and youth in the community.",
      image: "/programs/community-classes.png",
      icon: <Users className="w-4 h-4 text-emerald-700" />,
      iconBg: "bg-emerald-100",
      href: "/programs#community-classes"
    },
    {
      id: "school-support",
      title: "School Support",
      description: "Providing essential resources for school education.",
      image: "/programs/school-support.png",
      icon: <Building className="w-4 h-4 text-teal-700" />,
      iconBg: "bg-teal-100",
      href: "/programs#school-support"
    },
    {
      id: "skill-development",
      title: "Skill Development",
      description: "Building skills for better employment opportunities.",
      image: "/programs/skill-development.png",
      icon: <Briefcase className="w-4 h-4 text-amber-800" />,
      iconBg: "bg-amber-100",
      href: "/programs#skill-development"
    },
    {
      id: "health-welfare",
      title: "Health & Welfare",
      description: "Supporting health camps and welfare initiatives.",
      image: "/programs/health.png",
      icon: <Heart className="w-4 h-4 text-rose-600" />,
      iconBg: "bg-rose-100",
      href: "/programs#health-welfare"
    },
  ];

  return (
    <section className="py-4 bg-[#fafcfb] border-b border-slate-100" id="programs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0e705b]">
              OUR PROGRAMS
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-[#163832] mt-1.5"
              style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
            >
              Focused Initiatives for a Stronger Tomorrow
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/programs"
              className="text-xs sm:text-sm font-bold text-[#0e705b] hover:text-[#0a544b] flex items-center gap-1"
            >
              <span>View All Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-1.5 ml-2">
              <button
                type="button"
                aria-label="Previous programs"
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next programs"
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 6 Programs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {programs.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col group relative"
            >
              {/* Image & floating round icon */}
              <div className="relative w-full">
                <div className="h-32 sm:h-34 w-full overflow-hidden rounded-t-2xl bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-4 left-3.5 sm:left-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-100 ring-2 ring-white">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${p.iconBg} flex items-center justify-center`}>
                    {p.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 pt-6 flex-1 flex flex-col justify-between rounded-b-2xl bg-white">
                <div>
                  <h3
                    className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0e705b] transition-colors"
                    style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-snug line-clamp-3">
                    {p.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100">
                  <Link
                    href={p.href}
                    className="text-[11px] font-bold text-[#0e705b] hover:text-[#0a544b] inline-flex items-center gap-1 group-hover:underline"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
