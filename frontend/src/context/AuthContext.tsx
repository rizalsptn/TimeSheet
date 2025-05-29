"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { loginUser, logoutUser, refreshToken, registerUser } from "@/lib/api";

interface AuthContextType {
  user: any;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (userData: { name: string; username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setUser({ token: accessToken });
    } else {
      // optional: coba refresh kalau tidak ada accessToken
      const tryRefresh = async () => {
        const response = await refreshToken();
        if (response.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);
          setUser({ token: response.accessToken });
        }
      };
      tryRefresh();
    }
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    const response = await loginUser(credentials);
    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      setUser({ token: response.accessToken });
    } else {
      throw new Error(response.error || "Login failed");
    }
  };

  const register = async (userData: { name: string; username: string; password: string }) => {
    const response = await registerUser(userData);
    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      setUser({ token: response.accessToken });
    } else {
      throw new Error(response.error || "Registration failed");
    }
  };

  const logout = async () => {
    await logoutUser(); // ini harus hapus refreshToken di backend
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
