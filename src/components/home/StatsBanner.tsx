export function StatsBanner() {
  return (
    <section className="bg-[#062d27] text-white py-10 lg:py-14 relative overflow-hidden">
      {/* Background image & gradient overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Plant and cupping hands positioned on the left-center */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[75%] lg:w-[62%] overflow-hidden">
          <img
            src="/our-impact.png"
            alt=""
            className="w-full h-full object-cover object-[62%_center]"
          />
          {/* Smooth fade to dark green on the right of the image */}
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-[#062d27]" />
        </div>

        {/* Green tint overlays for high contrast and seamless integration */}
        <div className="absolute inset-0 bg-[#062d27]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062d27]/85 via-transparent to-[#062d27]/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left: Section Header */}
          <div className="lg:col-span-4 space-y-2 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
            >
              Our Impact
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-sm mx-auto lg:mx-0">
              Creating meaningful change in communities across regions.
            </p>
          </div>

          {/* Right: 4 Metrics with Icons */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">

            {/* Metric 1: Members Supported */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-2.5 text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  {/* Center person */}
                  <circle cx="12" cy="7" r="3" />
                  <path d="M7 16c0-2.8 2.2-5 5-5s5 2.2 5 5v1.5H7V16z" />
                  {/* Left person */}
                  <circle cx="6" cy="9" r="2.2" />
                  <path d="M2.5 17c0-2 1.6-3.8 3.5-3.8.7 0 1.4.2 2 .6-.6.8-1 1.8-1 3v.7H2.5V17z" />
                  {/* Right person */}
                  <circle cx="18" cy="9" r="2.2" />
                  <path d="M17 14.4c.6-.4 1.3-.6 2-.6 1.9 0 3.5 1.8 3.5 3.8v.5H18v-.7c0-1.2-.4-2.2-1-3z" />
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                10,000+
              </span>
              <span className="text-xs sm:text-sm text-white/80 font-normal mt-1">
                Members Supported
              </span>
            </div>

            {/* Metric 2: Families Reached */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-2.5 text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  {/* Left parent */}
                  <circle cx="6.5" cy="6" r="2.2" />
                  <path d="M4 10.5C4 9.7 4.7 9 5.5 9h2c.8 0 1.5.7 1.5 1.5V17c0 .6-.4 1-1 1H7.5v5h-2v-5H5c-.6 0-1-.4-1-1v-6.5z" />
                  {/* Right parent */}
                  <circle cx="17.5" cy="6" r="2.2" />
                  <path d="M15 10.5c0-.8.7-1.5 1.5-1.5h2c.8 0 1.5.7 1.5 1.5V17c0 .6-.4 1-1 1h-.5v5h-2v-5h-.5c-.6 0-1-.4-1-1v-6.5z" />
                  {/* Center child */}
                  <circle cx="12" cy="11.5" r="1.8" />
                  <path d="M10.2 15c0-.6.5-1.1 1.1-1.1h1.4c.6 0 1.1.5 1.1 1.1V19c0 .4-.3.8-.8.8h-.2v3.2h-1.6v-3.2h-.2c-.4 0-.8-.4-.8-.8V15z" />
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                500+
              </span>
              <span className="text-xs sm:text-sm text-white/80 font-normal mt-1">
                Families Reached
              </span>
            </div>

            {/* Metric 3: Programs Conducted */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-2.5 text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 6.5c-1.8-1.4-4.2-1.8-6.5-1.5C4.3 5.1 3.5 6 3.5 7v11.2c0 .9.9 1.6 1.8 1.4 2-.3 4.2 0 5.7 1.2.6.5 1.4.5 2 0 1.5-1.2 3.7-1.5 5.7-1.2.9.2 1.8-.5 1.8-1.4V7c0-1-.8-1.9-2-2-2.3-.3-4.7.1-6.5 1.5zm-1 11.2c-1.6-.9-3.5-1.2-5.3-1V7.1c1.6-.2 3.4 0 4.8.8l.5.3v9.5zm9.8-1.4c-1.8-.2-3.7.1-5.3 1V8.2l.5-.3c1.4-.8 3.2-1 4.8-.8v9.3z" />
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                25+
              </span>
              <span className="text-xs sm:text-sm text-white/80 font-normal mt-1">
                Programs Conducted
              </span>
            </div>

            {/* Metric 4: Contributions Managed */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-2.5 text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  {/* Left shorter stack */}
                  <ellipse cx="6" cy="14" rx="4" ry="1.6" />
                  <path d="M2 14v2c0 .9 1.8 1.6 4 1.6s4-.7 4-1.6v-2c-.7.6-2.2 1-4 1s-3.3-.4-4-1z" />
                  <path d="M2 16.5v2c0 .9 1.8 1.6 4 1.6s4-.7 4-1.6v-2c-.7.6-2.2 1-4 1s-3.3-.4-4-1z" />
                  {/* Right taller stack */}
                  <ellipse cx="17" cy="8" rx="4.5" ry="1.8" />
                  <path d="M12.5 8v2.2c0 1 2 1.8 4.5 1.8s4.5-.8 4.5-1.8V8c-.8.7-2.4 1.2-4.5 1.2s-3.7-.5-4.5-1.2z" />
                  <path d="M12.5 10.5v2.2c0 1 2 1.8 4.5 1.8s4.5-.8 4.5-1.8v-2.2c-.8.7-2.4 1.2-4.5 1.2s-3.7-.5-4.5-1.2z" />
                  <path d="M12.5 13v2.2c0 1 2 1.8 4.5 1.8s4.5-.8 4.5-1.8V13c-.8.7-2.4 1.2-4.5 1.2s-3.7-.5-4.5-1.2z" />
                  <path d="M12.5 15.5v2.2c0 1 2 1.8 4.5 1.8s4.5-.8 4.5-1.8v-2.2c-.8.7-2.4 1.2-4.5 1.2s-3.7-.5-4.5-1.2z" />
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                ₹XX L+
              </span>
              <span className="text-xs sm:text-sm text-white/80 font-normal mt-1">
                Contributions Managed
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
