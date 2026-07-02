"use client";

import { cn } from "@/utils/cn";

const baseClases =
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-200";

const badgeVariants = {
  default:
    "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  primary:
    "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
  success:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  warning:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  outline:
    "border border-neutral-200 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400",
};

const sizes = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
};

type BadgeVariant = keyof typeof badgeVariants;
type BadgeSize = keyof typeof sizes;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  removable?: boolean;
  onRemove?: () => void;
}

export const Badge = ({
  className,
  variant = "default",
  size = "md",
  removable,
  onRemove,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(baseClases, badgeVariants[variant], sizes[size], className)}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 inline-flex items-center rounded-full p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          aria-label="Remove"
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

export { badgeVariants };
