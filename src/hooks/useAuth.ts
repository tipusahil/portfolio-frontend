// hooks/useAuth.tsx
"use client";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // localStorage only available on client — set it after mount
    setToken(localStorage.getItem("token"));
  }, []);

  const login = (newToken: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, login, logout };
};
