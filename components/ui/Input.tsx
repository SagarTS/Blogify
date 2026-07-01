"use client";

import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({
  className,
  label,
  error,
  id,
  ...props
}: InputProps) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        aria-invalid={!!error}
        className={cn(
          "block w-full rounded-sm border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-all duration-200",
          "focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10",
          "dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-500",
          "dark:border-neutral-700 dark:focus:border-neutral-500 dark:focus:ring-neutral-100/10",
          error &&
            "border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500",
          className,
        )}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className="text-xs text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
