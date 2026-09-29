import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white border-b border-slate-100">
      {/* Hero Banner with Background Image */}
      <div
        className="relative w-full bg-cover bg-right md:bg-center"
        style={{
          backgroundImage: "url('/homepage-hero-banner.png')",
        }}
      >
        {/* Soft white gradient on left to guarantee crisp text readability across all desktop viewports */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none lg:w-3/5 z-0" />
        {/* Mobile/Tablet readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/70 lg:hidden pointer-events-none z-0" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-10 pb-8 sm:pb-10 lg:pb-9 w-full flex flex-col justify-between min-h-[460px] lg:min-h-[490px]">
          
          {/* Top Half: Headline & Subheading */}
          <div className="max-w-xl lg:max-w-2xl xl:max-w-[620px] space-y-3.5">
            <h1
              className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold tracking-tight text-[#163832] leading-[1.15]"
              style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
            >
              Empowering Communities Through Education, Welfare & Development
            </h1>

            <p className="text-sm sm:text-[15px] text-slate-700 lg:text-slate-600 leading-relaxed font-medium lg:font-normal">
              KMEW works to create a brighter future for children, families and communities through education, welfare initiatives, financial support and grassroots development.
            </p>
          </div>

          {/* Bottom Row: Exactly matching uploaded image (Buttons + Avatars on Left, Stat Card on Right) */}
          <div className="pt-6 sm:pt-8 flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-8">
            
            {/* Left Block: Action Buttons & Avatar Stack */}
            <div className="space-y-3.5 shrink-0">
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/register/member"
                  className="px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#0e705b] hover:bg-[#0a544b] shadow-xs flex items-center gap-1.5 transition-all hover:shadow"
                >
                  <span>Become a Member</span>
                  <span className="text-base font-bold ml-0.5">→</span>
                </Link>

                <Link
                  href="/programs"
                  className="px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-[#0e705b] bg-white hover:bg-slate-50 border border-[#0e705b] shadow-xs flex items-center transition-all"
                >
                  <span>Explore Our Programs</span>
                </Link>
              </div>

              {/* Social Proof / Avatar Stack - 4 avatars matching client design */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden shrink-0">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="/stories/rina.png"
                    alt="Member"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="/stories/amit.png"
                    alt="Member"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="/stories/shabana.png"
                    alt="Member"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="/gallery/g5.png"
                    alt="Member"
                  />
                </div>
                <p className="text-[11.5px] sm:text-xs text-slate-600 font-medium leading-tight">
                  Join thousands of members<br />building stronger communities.
                </p>
              </div>
            </div>

            {/* Right Block: Floating Stat Card matching exact client design */}
            <div className="w-full lg:w-auto shrink-0 lg:ml-auto">
              <div className="bg-white rounded-2xl px-3 py-3 sm:px-5 sm:py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 max-w-xl">
                <div className="grid grid-cols-4 divide-x divide-slate-100 text-center items-center">
                  
                  {/* Metric 1: Members Supported */}
                  <div className="px-2 sm:px-3.5 py-0.5 flex flex-col items-center justify-center">
                    <div className="h-7 sm:h-8 flex items-center justify-center mb-1">
                      <img
                        src="/icons/icon-members.png"
                        alt="Members Supported"
                        className="h-6 sm:h-7 w-auto object-contain"
                      />
                    </div>
                    <span className="text-sm sm:text-base lg:text-[17px] font-black text-slate-900 leading-tight">
                      10,000+
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight mt-1">
                      Members<br />Supported
                    </span>
                  </div>

                  {/* Metric 2: Families Reached */}
                  <div className="px-2 sm:px-3.5 py-0.5 flex flex-col items-center justify-center">
                    <div className="h-7 sm:h-8 flex items-center justify-center mb-1">
                      <img
                        src="/icons/icon-families.png"
                        alt="Families Reached"
                        className="h-6 sm:h-7 w-auto object-contain"
                      />
                    </div>
                    <span className="text-sm sm:text-base lg:text-[17px] font-black text-slate-900 leading-tight">
                      500+
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight mt-1">
                      Families<br />Reached
                    </span>
                  </div>

                  {/* Metric 3: Programs Conducted */}
                  <div className="px-2 sm:px-3.5 py-0.5 flex flex-col items-center justify-center">
                    <div className="h-7 sm:h-8 flex items-center justify-center mb-1">
                      <img
                        src="/icons/icon-programs.png"
                        alt="Programs Conducted"
                        className="h-6 sm:h-7 w-auto object-contain"
                      />
                    </div>
                    <span className="text-sm sm:text-base lg:text-[17px] font-black text-slate-900 leading-tight">
                      25+
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight mt-1">
                      Programs<br />Conducted
                    </span>
                  </div>

                  {/* Metric 4: Contributions Managed */}
                  <div className="px-2 sm:px-3.5 py-0.5 flex flex-col items-center justify-center">
                    <div className="h-7 sm:h-8 flex items-center justify-center mb-1">
                      <img
                        src="/icons/icon-contributions.png"
                        alt="Contributions Managed"
                        className="h-6 sm:h-7 w-auto object-contain"
                      />
                    </div>
                    <span className="text-sm sm:text-base lg:text-[17px] font-black text-slate-900 leading-tight">
                      ₹XX L+
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight mt-1">
                      Contributions<br />Managed
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
