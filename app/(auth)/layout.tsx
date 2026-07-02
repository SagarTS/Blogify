import React from "react";

import { GuestGuard } from "@/components/auth/GuestGuard";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <GuestGuard>{children}</GuestGuard>;
};

export default AuthLayout;
