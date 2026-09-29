import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleTranslate } from "@/components/common/GoogleTranslate";
import { AppLayoutWrapper } from "@/components/layout/AppLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a1f3d",
};

export const metadata: Metadata = {
  title: "KMEW — Kulti Maharaja Educational Welfare Organization",
  description:
    "Official portal of Kulti Maharaja Educational Welfare Organization (KMEW). Empowering youth, students, and communities through higher education scholarships, remedial tuition centers, women vocational training, and transparent member welfare management.",
  keywords: [
    "KMEW",
    "Kulti Maharaja Educational Welfare Organization",
    "Education NGO Bengal",
    "Merit cum Means Scholarship Kulti",
    "Asansol Educational Welfare",
    "Member Management NGO",
    "80G Tax Exemption NGO"
  ],
  authors: [{ name: "KMEW Organization" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-900">
        <GoogleTranslate />
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}
