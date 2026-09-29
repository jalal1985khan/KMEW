import React from "react";
import Link from "next/link";

interface KmewLogoProps {
  variant?: "dark" | "light";
  showText?: boolean;
}

export function KmewLogo({ variant = "dark", showText = true }: KmewLogoProps) {
  const isLight = variant === "light";

  return (
    <Link href="/" className="flex items-center gap-3 group focus:outline-hidden">
      {/* Stylized Emblem matching client design */}
      <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left Leaf (Deep Green) */}
          <path
            d="M50 85 C30 75 12 55 20 28 C35 30 45 42 50 85 Z"
            fill="#0a544b"
          />
          {/* Middle Petal (Amber / Gold) */}
          <path
            d="M50 85 C42 50 40 25 50 15 C60 25 58 50 50 85 Z"
            fill="#f59e0b"
          />
          {/* Right Leaf (Bright Teal) */}
          <path
            d="M50 85 C70 75 88 55 80 28 C65 30 55 42 50 85 Z"
            fill="#10b981"
          />
          {/* Center seed dot */}
          <circle cx="50" cy="52" r="5" fill="#ffffff" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`text-2xl font-black tracking-tight leading-none ${
              isLight ? "text-white" : "text-[#0a4d44]"
            }`}
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
          >
            KMEW
          </span>
          <span
            className={`text-[10px] sm:text-[11px] font-medium tracking-tight mt-0.5 ${
              isLight ? "text-emerald-100/90" : "text-slate-600"
            }`}
          >
            Kulti Maharaja Educational Welfare Organization
          </span>
        </div>
      )}
    </Link>
  );
}
