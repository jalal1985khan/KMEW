"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  LogIn,
  UserCheck,
  Users,
  Shield,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  AlertCircle,
  KeyRound,
  CheckCircle2
} from "lucide-react";

type Role = "MEMBER" | "ASSOCIATE" | "ADMIN";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [selectedRole, setSelectedRole] = useState<Role>("MEMBER");
  const [emailOrPhone, setEmailOrPhone] = useState("rahul.sharma@kmew.org.in");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const demoAccounts: Record<
    Role,
    { email: string; name: string; roleLabel: string; note: string; path: string }
  > = {
    MEMBER: {
      email: "rahul.sharma@kmew.org.in",
      name: "Rahul Sharma (Member)",
      roleLabel: "Member Portal",
      note: "Only Rahul Sharma's application, installments, and assigned associate are accessible.",
      path: "/member",
    },
    ASSOCIATE: {
      email: "bikram.das@kmew.org.in",
      name: "Bikram Das (Associate #082)",
      roleLabel: "Associate Field Portal",
      note: "Only Bikram Das's assigned ward members and field collections are visible.",
      path: "/associate",
    },
    ADMIN: {
      email: "admin@kmew.org.in",
      name: "Rajeshwar Sharma (Admin)",
      roleLabel: "Central Admin Portal",
      note: "Central administrative console for organization-wide financial pipeline and approvals.",
      path: "/admin",
    },
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setEmailOrPhone(demoAccounts[role].email);
    setPassword("password123");
    setErrorMessage(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const result = await login(emailOrPhone, password);

    if (result.success) {
      setTimeout(() => {
        router.push(demoAccounts[selectedRole].path);
      }, 300);
    } else {
      setIsLoading(false);
      setErrorMessage(result.error || "Authentication failed. Please check credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#073531] text-emerald-300 flex items-center justify-center mx-auto shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            KMEW Secure Sign In
          </h1>
          <p className="text-xs text-slate-500">
            Account-isolated portal access. Each user can only view their authorized data.
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-200/80">
          <button
            type="button"
            onClick={() => handleRoleSelect("MEMBER")}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
              selectedRole === "MEMBER"
                ? "bg-white text-emerald-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Member</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect("ASSOCIATE")}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
              selectedRole === "ASSOCIATE"
                ? "bg-white text-blue-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Associate</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect("ADMIN")}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
              selectedRole === "ADMIN"
                ? "bg-white text-purple-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Admin</span>
          </button>
        </div>

        {/* Shadcn UI Card Form */}
        <Card className="rounded-3xl border-slate-200 shadow-xl bg-white p-2">
          <CardHeader className="space-y-2 pb-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs font-bold text-[#0e705b] border-emerald-300 bg-emerald-50">
                {demoAccounts[selectedRole].roleLabel}
              </Badge>
              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                256-Bit Encrypted
              </span>
            </div>
            <CardDescription className="text-xs text-slate-600 leading-relaxed">
              {demoAccounts[selectedRole].note}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email / Member ID / Phone
                </label>
                <Input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Enter registered email"
                  className="rounded-xl border-slate-300 text-xs"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <span className="text-[11px] text-slate-400">Default: password123</span>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl border-slate-300 text-xs pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#0e705b] focus:ring-[#0e705b]"
                  />
                  <span>Remember my login</span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#0e705b] hover:bg-[#0a544b] shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to {demoAccounts[selectedRole].roleLabel}</span>
                  </>
                )}
              </Button>
            </form>

            {/* Credentials cheat sheet */}
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
              <span className="font-semibold text-slate-700 block flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                Verified Test Credentials:
              </span>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 font-mono text-[10px] space-y-1">
                <div>• <strong>Member:</strong> rahul.sharma@kmew.org.in | password123</div>
                <div>• <strong>Associate:</strong> bikram.das@kmew.org.in | password123</div>
                <div>• <strong>Admin:</strong> admin@kmew.org.in | password123</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer links */}
        <div className="text-center text-xs text-slate-500 space-y-1">
          <p>
            New to KMEW?{" "}
            <Link href="/register/member" className="font-bold text-[#0e705b] hover:underline">
              Apply for Membership
            </Link>{" "}
            or{" "}
            <Link href="/register/associate" className="font-bold text-[#0e705b] hover:underline">
              Join as Field Associate
            </Link>
          </p>
          <p>
            <Link href="/" className="text-slate-400 hover:text-slate-600">
              ← Return to Public Website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
