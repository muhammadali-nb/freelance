"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { AuthState, User } from "@/lib/types/auth";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Имитация API запросов
const mockUser: User = {
  id: "1",
  name: "Иван Иванов",
  email: "ivan@example.com",
  avatar: "/placeholder-avatar.jpg"
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Проверяем локальное хранилище при загрузке
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Имитация API запроса
    setState({ user: mockUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, password: string) => {
    // Имитация API запроса
    const newUser = { ...mockUser, name, email };
    setState({ user: newUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = async () => {
    setState({ user: null, isAuthenticated: false, isLoading: false });
    localStorage.removeItem("user");
  };

  const updateUser = async (data: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...data };
      setState({ user: updatedUser, isAuthenticated: true, isLoading: false });
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 