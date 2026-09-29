import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background Photography of School Children in Sunset */}
      <div className="absolute inset-0 z-0">
        <img
          src="/support-banner.png"
          alt="Children walking toward a brighter future"
          className="w-full h-full object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="max-w-xl space-y-4">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
          >
            Your Support Can Change a Life
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Every contribution helps us create opportunities, strengthen communities and support those who need it most.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/donate"
              className="px-6 py-3 rounded-lg text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-md flex items-center gap-2 transition-all"
            >
              <span>Support KMEW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/register/member"
              className="px-6 py-3 rounded-lg text-xs sm:text-sm font-bold text-white bg-transparent hover:bg-white/10 border border-white/80 transition-all flex items-center gap-2"
            >
              <span>Become a Member</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
