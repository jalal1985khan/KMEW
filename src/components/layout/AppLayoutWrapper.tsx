"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { AuthProvider } from "@/lib/auth/AuthContext";

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/member") ||
    pathname.startsWith("/associate");

  return (
    <AuthProvider>
      {isPortal ? (
        <main className="flex-1 w-full">{children}</main>
      ) : (
        <>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </>
      )}
    </AuthProvider>
  );
}
