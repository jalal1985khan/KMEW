"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthUser, authenticate, USERS_DATABASE } from "./authStore";
import { useRouter } from "next/navigation";

interface AuthContextType {
  currentUser: AuthUser | null;
  isLoading: boolean;
  login: (emailOrPhone: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  requireAuth: (allowedRoles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  login: () => ({ success: false }),
  logout: () => { },
  requireAuth: () => false,
});

const STORAGE_KEY = "kmew_portal_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Verify user still exists in database
          const match = USERS_DATABASE.find((u) => u.id === parsed.id);
          if (match) {
            setCurrentUser(match);
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const login = (emailOrPhone: string, pass: string) => {
    const user = authenticate(emailOrPhone, pass);
    if (!user) {
      return {
        success: false,
        error: "Invalid email, phone or password. Please verify your credentials.",
      };
    }

    setCurrentUser(user);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ id: user.id, email: user.email, role: user.role })
      );
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
