import React from "react";

import { AuthGuard } from "@/components/auth/AuthGuard";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default ProtectedLayout;
