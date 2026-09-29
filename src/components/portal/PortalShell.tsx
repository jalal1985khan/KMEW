"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { KmewLogo } from "@/components/common/KmewLogo";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  User,
  Users,
  Shield,
  LogOut,
  ExternalLink,
  Lock,
  AlertTriangle,
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
      icon: <User className="size-4" />,
    },
    ASSOCIATE: {
      title: "Associate Field Portal",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
      accentBg: "bg-blue-600",
      icon: <Users className="size-4" />,
    },
    ADMIN: {
      title: "Admin Central Management",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
      accentBg: "bg-purple-700",
      icon: <Shield className="size-4" />,
    },
  };

  const currentConfig = roleConfigs[currentRole];

  // Protected Gate
  if (!isLoading) {
    if (!currentUser) {
      return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4 notranslate" translate="no">
          <Card className="max-w-md w-full shadow-lg border-border">
            <CardHeader className="text-center pb-2">
              <div className="size-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto mb-2">
                <Lock className="size-7" />
              </div>
              <CardTitle className="text-xl font-bold">Protected Workspace</CardTitle>
              <CardDescription className="text-xs">
                You must sign in with your verified email and password to access the {currentConfig.title}.
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-4">
              <Button
                onClick={() => router.push("/login")}
                className="w-full bg-[#0e705b] hover:bg-[#0a544b] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs"
              >
                Sign In to Continue
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    if (currentUser.role !== currentRole) {
      return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4 notranslate" translate="no">
          <Card className="max-w-md w-full shadow-lg border-border">
            <CardHeader className="text-center pb-2">
              <div className="size-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="size-7" />
              </div>
              <div className="flex justify-center mb-1">
                <Badge variant="destructive">Access Restricted</Badge>
              </div>
              <CardTitle className="text-xl font-bold">Isolated Workspace</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                You are currently signed in as <strong>{currentUser.name}</strong> ({currentUser.role}). This workspace requires {currentRole} credentials.
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-4 flex gap-2">
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
                variant="destructive"
                className="flex-1 text-xs font-bold"
              >
                Switch Account
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans notranslate" translate="no">
      {/* Top Bar with shadcn composition */}
      <header className="sticky top-0 z-40 bg-[#073531] text-white border-b border-[#0e5c50] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <KmewLogo />
            <Separator orientation="vertical" className="hidden sm:block h-6 bg-emerald-800/80" />
            <div className="hidden sm:flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border uppercase tracking-wider ${currentConfig.badgeColor}`}>
                {currentConfig.title}
              </span>
            </div>
          </div>

          {/* Secure User Profile & Logout Bar */}
          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="flex items-center gap-2.5 bg-white/5 py-1.5 px-3 rounded-xl border border-white/10">
                <Avatar size="sm" className="ring-2 ring-emerald-500/50">
                  <AvatarFallback className="bg-emerald-700 text-white font-bold text-xs">
                    {currentUser.avatarLetter}
                  </AvatarFallback>
                </Avatar>
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
              <ExternalLink className="size-4" />
              <span className="hidden xl:inline">Public Site</span>
            </Link>

            <Separator orientation="vertical" className="hidden sm:block h-6 bg-emerald-800/60" />

            {/* Safe Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-rose-300 hover:text-white hover:bg-rose-900/40 p-2 h-auto"
              title="Sign Out of Session"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline text-xs font-semibold ml-1">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}

