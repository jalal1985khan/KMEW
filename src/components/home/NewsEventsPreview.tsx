import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export function NewsEventsPreview() {
  const newsItems = [
    {
      id: "edu-program",
      date: "25 Sep 2026",
      title: "Education Program for Underprivileged Children",
      image: "/news/edu.png",
      href: "/news#edu-program"
    },
    {
      id: "health-camp",
      date: "18 Sep 2026",
      title: "Community Health Camp Organized",
      image: "/news/health.png",
      href: "/news#health-camp"
    },
    {
      id: "scholarship-drive",
      date: "10 Sep 2026",
      title: "Scholarship Drive for Deserving Students",
      image: "/news/scholarship.png",
      href: "/news#scholarship-drive"
    },
  ];

  return (
    <section className="py-4 sm:py-4 bg-white border-b border-slate-100" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-[#163832]"
              style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
            >
              LATEST NEWS &amp; EVENTS
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Stay updated with our latest activities, events and announcements.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/news"
              className="text-xs sm:text-sm font-bold text-[#0e705b] hover:text-[#0a544b] flex items-center gap-1 group"
            >
              <span>View All News</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous news"
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next news"
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Horizontal News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-2xs hover:shadow-md transition-all flex flex-row items-center gap-4 group"
            >
              {/* Thumbnail image on left */}
              <div className="w-28 h-20 sm:w-32 sm:h-22 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Text content on right */}
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <span className="text-[11px] font-semibold text-slate-400">
                  {item.date}
                </span>

                <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#0e705b] transition-colors leading-snug line-clamp-2 mt-1">
                  {item.title}
                </h3>

                <div className="mt-2">
                  <Link
                    href={item.href}
                    className="text-xs font-bold text-[#0e705b] hover:text-[#0a544b] inline-flex items-center gap-1 group-hover:underline"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
