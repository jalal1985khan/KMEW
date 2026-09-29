import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LifeAtKmew() {
  const photos = [
    { title: "Classroom Study", image: "/gallery/g1.png" },
    { title: "Smiling Children", image: "/gallery/g2.png" },
    { title: "Community Assembly", image: "/gallery/g3.png" },
    { title: "Health & Welfare Camp", image: "/gallery/g4.png" },
    { title: "School Child", image: "/gallery/g5.png" },
    { title: "Outdoor Activities", image: "/gallery/g6.png" },
    { title: "Seedling Growth", image: "/gallery/g7.png" },
  ];

  return (
    <section className="py-4 sm:py-4 bg-white border-b border-slate-100" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-wide uppercase">
              LIFE AT KMEW
            </h2>
            <span className="text-xs sm:text-sm text-slate-500 font-normal">
              Moments that inspire change.
            </span>
          </div>

          <Link
            href="/gallery"
            className="text-xs sm:text-sm font-bold text-[#0e705b] hover:text-[#0a544b] flex items-center gap-1 group shrink-0"
          >
            <span>View Gallery</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 7 Horizontal Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {photos.map((item, idx) => (
            <Link
              key={idx}
              href="/gallery"
              className="rounded-xl overflow-hidden aspect-[4/3] relative group bg-slate-100 border border-slate-100 shadow-2xs hover:shadow-md transition-all block"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
