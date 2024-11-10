"use client";

import { useRole, UserRole } from "@/context/role-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function RouteGuard({ children, allowedRoles }: RouteGuardProps) {
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!allowedRoles.includes(role)) {
      router.push("/unauthorized");
    }
  }, [role, allowedRoles, router]);

  if (!allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
} 