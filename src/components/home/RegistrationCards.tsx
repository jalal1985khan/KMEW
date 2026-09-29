import Link from "next/link";
import { UserCheck, Users, Check, ArrowRight } from "lucide-react";

export function RegistrationCards() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

          {/* Left Card: Become a KMEW Member */}
          <div className="bg-[#f0faf7] border border-[#bbf7d0] rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0e705b]/15 text-[#0e705b] flex items-center justify-center shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#163832]"
                    style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
                  >
                    Become a KMEW Member
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Join a growing community and become part of KMEW&apos;s mission to support education, welfare and community development.
                  </p>
                </div>
              </div>

              {/* 4 Checkmarks in 2 columns */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 pl-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-[#0e705b] shrink-0 stroke-[2.5]" />
                  <span>Access Programs</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-[#0e705b] shrink-0 stroke-[2.5]" />
                  <span>Get Associate Support</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-[#0e705b] shrink-0 stroke-[2.5]" />
                  <span>Manage Contributions</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-[#0e705b] shrink-0 stroke-[2.5]" />
                  <span>Stay Connected</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/register/member"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-bold text-white bg-[#0e705b] hover:bg-[#0a544b] shadow-xs transition-colors"
              >
                <span>Register as Member</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-xs text-slate-500">
                Already registered?{" "}
                <Link href="/login" className="text-[#0e705b] font-bold hover:underline">
                  Login →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Card: Become a KMEW Associate */}
          <div className="bg-[#f0f6fe] border border-[#bfdbfe] rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/15 text-blue-700 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className="text-xl sm:text-2xl font-bold text-slate-900"
                    style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
                  >
                    Become a KMEW Associate
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Associates play an important role in connecting KMEW with members and supporting them at the community level.
                  </p>
                </div>
              </div>

              {/* 4 Checkmarks in 2 columns */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 pl-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 stroke-[2.5]" />
                  <span>Connect with Members</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 stroke-[2.5]" />
                  <span>Support Initiatives</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 stroke-[2.5]" />
                  <span>Manage Contributions</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 stroke-[2.5]" />
                  <span>Build Community Impact</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/register/associate"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-bold text-white bg-[#0e705b] hover:bg-[#0a544b] shadow-xs transition-colors"
              >
                <span>Register as Associate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-xs text-slate-500">
                Already registered?{" "}
                <Link href="/login" className="text-[#0e705b] font-bold hover:underline">
                  Login →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
