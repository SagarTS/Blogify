"use client";

import { cn } from "@/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = ({
  className,
  hover = false,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950",
        hover &&
          "cursor-pointer transition-all duration-200 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-900/5 dark:hover:border-neutral-700",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("mb-4 space-y-1", className)} {...props}>
      {children}
    </div>
  );
};

export const CardContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "mt-4 flex items-center gap-4 border-t border-neutral-100 pt-4 dark:border-neutral-800",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
