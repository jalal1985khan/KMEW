import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export function SuccessStories() {
  const stories = [
    {
      name: "Rina",
      role: "KMEW Member",
      quote: "Through KMEW, I was able to continue my education and dream bigger for my future.",
      image: "/stories/rina.png"
    },
    {
      name: "Amit",
      role: "Student",
      quote: "The support from KMEW helped me get the resources i needed for my studies.",
      image: "/stories/amit.png"
    },
    {
      name: "Shabana",
      role: "KMEW Associate",
      quote: "Being an associate with KMEW has allowed me to serve my community and make a difference.",
      image: "/stories/shabana.png"
    }
  ];

  return (
    <section className="py-4 sm:py-4 bg-[#fafcfb] border-b border-slate-100" id="stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0e705b]">
              SUCCESS STORIES
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-[#163832] mt-1"
              style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
            >
              Real People. Real Impact.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/impact"
              className="text-xs sm:text-sm font-bold text-[#0e705b] hover:text-[#0a544b] flex items-center gap-1 group"
            >
              <span>View All Stories</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous stories"
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next stories"
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.name}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-2xs hover:shadow-md transition-all flex flex-row items-center gap-4 sm:gap-5 group"
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 border border-slate-100"
              />

              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <p className="text-xs sm:text-[13px] text-slate-600 leading-snug">
                  &ldquo;{story.quote}&rdquo;
                </p>

                <div className="mt-3">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {story.name}
                  </h3>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-normal mt-0.5 block">
                    {story.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
