"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { KmewLogo } from "@/components/common/KmewLogo";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Users,
  Shield,
  LogOut,
  ExternalLink,
  Lock,
  AlertTriangle
} from "lucide-react";

export type PortalRole = "MEMBER" | "ASSOCIATE" | "ADMIN";

interface PortalShellProps {
  currentRole: PortalRole;
  children: React.ReactNode;
}

export function PortalShell({
  currentRole,
  children,
}: PortalShellProps) {
  const router = useRouter();
  const { currentUser, isLoading, logout } = useAuth();

  const roleConfigs = {
    MEMBER: {
      title: "Member Portal",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      accentBg: "bg-emerald-600",
      icon: <User className="w-4 h-4" />,
    },
    ASSOCIATE: {
      title: "Associate Field Portal",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
      accentBg: "bg-blue-600",
      icon: <Users className="w-4 h-4" />,
    },
    ADMIN: {
      title: "Admin Central Management",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
      accentBg: "bg-purple-700",
      icon: <Shield className="w-4 h-4" />,
    },
  };

  const currentConfig = roleConfigs[currentRole];

  // Protected Gate
  if (!isLoading) {
    if (!currentUser) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">Protected Workspace</h2>
              <p className="text-xs text-slate-600">
                You must sign in with your verified email and password to access the {currentConfig.title}.
              </p>
            </div>
            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-[#0e705b] hover:bg-[#0a544b] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs"
            >
              Sign In to Continue
            </Button>
          </div>
        </div>
      );
    }

    if (currentUser.role !== currentRole) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <Badge variant="destructive">Access Restricted</Badge>
              <h2 className="text-xl font-black text-slate-900">Isolated Workspace</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                You are currently signed in as <strong>{currentUser.name}</strong> ({currentUser.role}). This workspace requires {currentRole} credentials.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentUser.role === "MEMBER") router.push("/member");
                  else if (currentUser.role === "ASSOCIATE") router.push("/associate");
                  else if (currentUser.role === "ADMIN") router.push("/admin");
                }}
                className="flex-1 text-xs font-bold"
              >
                Go to My Workspace
              </Button>
              <Button
                onClick={logout}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Switch Account
              </Button>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Bar for Switcher & Profile */}
      <header className="sticky top-0 z-40 bg-[#073531] text-white border-b border-[#0e5c50] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <KmewLogo />
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-emerald-800/80">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border uppercase tracking-wider ${currentConfig.badgeColor}`}>
                {currentConfig.title}
              </span>
            </div>
          </div>

          {/* Secure User Profile & Logout Bar */}
          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="flex items-center gap-2.5 bg-white/5 py-1.5 px-3 rounded-xl border border-white/10">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs ring-2 ring-emerald-500/50">
                  {currentUser.avatarLetter}
                </div>
                <div className="text-left text-xs leading-tight">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{currentUser.name}</span>
                    <Badge variant="outline" className="text-[10px] py-0 px-1.5 bg-emerald-400/20 text-emerald-200 border-emerald-400/40 font-mono">
                      {currentUser.role}
                    </Badge>
                  </div>
                  <div className="text-[10px] text-emerald-300 font-mono">{currentUser.email}</div>
                </div>
              </div>
            )}

            {/* Exit to Public Website */}
            <Link
              href="/"
              className="p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Return to Public Website"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden xl:inline">Public Site</span>
            </Link>

            {/* Safe Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-rose-300 hover:text-white hover:bg-rose-900/40 p-2 h-auto"
              title="Sign Out of Session"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-semibold ml-1">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </div>
  );
}
