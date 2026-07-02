"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isInitialized) {
    return <Loader2 className="h-20 w-20 animate-spin" />;
  }

  if (isAuthenticated) {
    return <Loader2 className="h-20 w-20 animate-spin" />;
  }

  return <>{children}</>;
};
