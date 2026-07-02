"use client";

import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";

export const AuthInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { initialize } = useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
};
