import { ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Register Online",
      description: "Create your account as a member.",
      bg: "bg-[#0e705b]",
      textColor: "text-white"
    },
    {
      number: "02",
      title: "Review by KMEW",
      description: "Your application is reviewed.",
      bg: "bg-[#2563eb]",
      textColor: "text-white"
    },
    {
      number: "03",
      title: "Associate Assigned",
      description: "KMEW assigns a dedicated associate.",
      bg: "bg-[#f59e0b]",
      textColor: "text-white"
    },
    {
      number: "04",
      title: "Connect with Member",
      description: "Your associate connects with you.",
      bg: "bg-[#8b5cf6]",
      textColor: "text-white"
    },
    {
      number: "05",
      title: "Manage Contributions",
      description: "Easily track and manage your contributions.",
      bg: "bg-[#ef4444]",
      textColor: "text-white"
    },
    {
      number: "06",
      title: "Verified by KMEW",
      description: "Final verification by our admin team.",
      bg: "bg-[#10b981]",
      textColor: "text-white"
    }
  ];

  return (
    <section className="py-8 bg-white border-b border-slate-100" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0e705b]">
            HOW IT WORKS
          </span>
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-[#163832]"
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
          >
            Your Journey With KMEW
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A simple and transparent process to connect, support and create impact.
          </p>
        </div>

        {/* 6 Step Nodes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex flex-col items-center text-center relative group">
              {/* Connector Arrow (except last step) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-8 -translate-y-1/2 left-1/2 w-[calc(100%+1.5rem)] items-center justify-center z-0 pointer-events-none">
                  <ArrowRight className="w-5 h-5 text-slate-400 stroke-[1.75]" />
                </div>
              )}

              {/* Number Circle Badge */}
              <div
                className={`w-16 h-16 rounded-full ${step.bg} ${step.textColor} flex items-center justify-center font-bold text-lg shadow-sm mb-3 relative z-10`}
              >
                {step.number}
              </div>

              {/* Step Title & Subtext */}
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {step.title}
              </h3>
              <p className="text-[12px] text-slate-500 mt-1 max-w-[140px] leading-tight">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
