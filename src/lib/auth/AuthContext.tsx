"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthUser, authenticate, USERS_DATABASE } from "./authStore";
import { useRouter } from "next/navigation";

interface AuthContextType {
  currentUser: AuthUser | null;
  isLoading: boolean;
  login: (emailOrPhone: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  requireAuth: (allowedRoles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: () => { },
  requireAuth: () => false,
});

const STORAGE_KEY = "kmew_portal_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id) {
          setCurrentUser(parsed);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (emailOrPhone: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone, password: pass }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
        } catch {
          // ignore
        }
        return { success: true };
      }
      if (data.error) {
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.warn("API login failed, checking fallback:", err);
    }

    // Fallback if needed
    const user = authenticate(emailOrPhone, pass);
    if (!user) {
      return {
        success: false,
        error: "Invalid email, phone or password. Please verify your credentials.",
      };
    }

    setCurrentUser(user);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore
    }

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    router.push("/login");
  };

  const requireAuth = (allowedRoles: string[]) => {
    if (isLoading) return false;
    if (!currentUser) {
      router.push("/login");
      return false;
    }
    if (!allowedRoles.includes(currentUser.role)) {
      // Redirect to user's authorized role home
      if (currentUser.role === "MEMBER") router.push("/member");
      else if (currentUser.role === "ASSOCIATE") router.push("/associate");
      else if (currentUser.role === "ADMIN") router.push("/admin");
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        login,
        logout,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
