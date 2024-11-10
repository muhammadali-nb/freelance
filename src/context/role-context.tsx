"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "client" | "freelancer";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isClient: () => boolean;
  isFreelancer: () => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("client");

  const isClient = () => role === "client";
  const isFreelancer = () => role === "freelancer";

  return (
    <RoleContext.Provider value={{ role, setRole, isClient, isFreelancer }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
} 