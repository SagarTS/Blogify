"use client";

import { Loader2 } from "lucide-react";

import { cn } from "@/utils/cn";

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

const variants = {
  primary:
    "bg-neutral-900 text-white hover:text-neutral-900 hover:bg-white border border-transparent hover:border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors duration-300",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
  outline:
    "border border-neutral-200 bg-transparent text-neutral-900 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800",
  ghost:
    "bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
  danger: "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500",
} as const;

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  xl: "h-14 px-8 text-lg",
  icon: "h-10 w-10 p-0",
  "icon-sm": "h-8 w-8 p-0",
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
}

function buttonVariants({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}) {
  return cn(
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );
}

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading,
  leftIcon,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="h-2 w-2 animate-spin" /> : leftIcon}
      {children}
    </button>
  );
};
