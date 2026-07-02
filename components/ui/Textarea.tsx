"use client";

import { cn } from "@/utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = ({
  className,
  label,
  error,
  id,
  ...props
}: TextareaProps) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          "block w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-all duration-200",
          "focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10",
          "dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-500",
          "dark:border-neutral-700 dark:focus:border-neutral-500 dark:focus:ring-neutral-100/10",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          "min-h-30 resize-y",
          className,
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
