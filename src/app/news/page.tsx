import Link from "next/link";
import { Calendar, MapPin, BellRing, ArrowRight, Clock } from "lucide-react";
import { NEWS_EVENTS } from "@/lib/data/kmewData";

export function generateMetadata() {
  return {
    title: "News & Events — KMEW",
    description: "Official notices, upcoming health camps, scholarship drives, and press releases from KMEW.",
  };
}

export default function NewsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <BellRing className="w-4 h-4 text-blue-700" />
            <span>Official Bulletins & Events</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            News, Announcements & Event Calendar
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Stay informed on upcoming community welfare drives, scholarship examination schedules, and regional education initiatives.
          </p>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_EVENTS.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-white text-blue-950 shadow-xs">
                    {item.category}
                  </span>
                </div>
                {item.isUpcoming && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-400 text-slate-950 shadow-xs animate-pulse">
                      Upcoming Event
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      {item.location}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {item.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Published by KMEW Media
                  </span>
                  <Link
                    href="/register/member"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 hover:text-blue-700 underline"
                  >
                    <span>Register to Participate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
