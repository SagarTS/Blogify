"use client";

import Link from "next/link";
import { LogOut, PenSquare } from "lucide-react";

import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "../ui/ThemeToggle";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex gap-1 items-center justify-center text-[25px] font-bold">
              <div className="group flex h-10 w-10 hover-spin-return items-center justify-center rounded-md bg-linear-to-tr from-blue-600 to-cyan-400 font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-cyan-400/50 dark:from-neutral-100 dark:to-neutral-300 dark:text-neutral-900 dark:shadow-none">
                <span className="text-[28px] tracking-wide transform transition-transform duration-300 group-hover:scale-110">
                  B
                </span>
              </div>
              logify
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <Link href="/new">
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<PenSquare className="h-4 w-4" />}
                >
                  Write
                </Button>
              </Link>
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {user?.name}
                  </p>
                </div>
                <Avatar name={user?.name} size="md" />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={logout}
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
