import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-4 sm:py-8 lg:py-8 bg-white border-b border-slate-100" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Story & Values */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <div>
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0e705b]">
                ABOUT KMEW
              </span>
              <h2
                className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-bold text-[#163832] mt-1.5 tracking-tight leading-[1.18]"
                style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
              >
                A Stronger Community<br className="hidden sm:inline" /> for a Brighter Tomorrow
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Kulti Maharaja Educational Welfare Organization (KMEW) is a registered non-profit organization committed to empowering underprivileged and marginalized communities through education, welfare and community development.
            </p>

            <div className="pt-0.5">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#0e705b] hover:bg-[#0a544b] transition-all shadow-xs hover:shadow"
              >
                <span>Learn More About KMEW</span>
                <span className="text-base font-bold ml-0.5">→</span>
              </Link>
            </div>

            {/* 3 Value Pillars matching exact horizontal design and text line placement */}
            <div className="pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-3.5 xl:gap-4">
              {/* Mission */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-[#fef6e0] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#0e705b" strokeWidth="2.2" />
                    <circle cx="12" cy="12" r="5" stroke="#0e705b" strokeWidth="2" />
                    <circle cx="12" cy="12" r="2" fill="#d97706" />
                    <path d="M19 5l-5.5 5.5" stroke="#d97706" strokeWidth="2.4" strokeLinecap="round" />
                    <path d="M19 5h-3.5" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
                    <path d="M19 5v3.5" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">Our Mission</h3>
                  <p className="text-[11px] text-slate-500 font-normal leading-snug mt-1">
                    To empower through education and welfare initiatives.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-[#eaf7f2] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#0e705b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3.2" fill="#0e705b" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">Our Vision</h3>
                  <p className="text-[11px] text-slate-500 font-normal leading-snug mt-1">
                    A stronger, healthier and more equitable community.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-[#eaf7f2] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#0e705b]" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="8" r="3.2" />
                    <path d="M6 19c0-3.3 2.7-6 6-6s6 2.7 6 6H6z" />
                    <circle cx="5.5" cy="10" r="2.3" />
                    <path d="M1 19c0-2.5 2-4.5 4.5-4.5.7 0 1.3.15 1.9.42-.5.8-.8 1.8-.8 2.88V19H1z" />
                    <circle cx="18.5" cy="10" r="2.3" />
                    <path d="M23 19c0-2.5-2-4.5-4.5-4.5-.7 0-1.3.15-1.9.42.5.8.8 1.8.8 2.88V19H23z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">Our Values</h3>
                  <p className="text-[11px] text-slate-500 font-normal leading-snug mt-1">
                    Education, integrity, inclusion and community development.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Banner matching exact design */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <img
              src="/community-banner.png"
              alt="KMEW Community - Education transforms lives and communities"
              className="w-full max-w-xl lg:max-w-none h-auto object-contain drop-shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
