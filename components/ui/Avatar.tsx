"use client";

import Image from "next/image";
import { User } from "lucide-react";

import { cn } from "@/utils/cn";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
  xl: "h-12 w-12 text-base",
};

const iconSizeMap = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
};

export const Avatar = ({ src, name, size = "md", className }: AvatarProps) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  if (src) {
    return (
      <Image
        src={src}
        alt={name || "Avatar"}
        className={cn("rounded-full object-cover", sizeMap[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
        sizeMap[size],
        className,
      )}
      aria-label={name || "User avatar"}
    >
      {name ? initials : <User size={iconSizeMap[size]} />}
    </div>
  );
};
