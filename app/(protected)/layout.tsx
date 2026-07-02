import React from "react";

import { AuthGuard } from "@/components/auth/AuthGuard";
import Navbar from "@/components/layout/Navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <Navbar />
        <div className="flex">
          <main className="flex-1 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
};

export default ProtectedLayout;
