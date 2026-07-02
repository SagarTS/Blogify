"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

import { cn } from "@/utils/cn";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
}

export const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  error,
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-lg border bg-white px-4 py-2.5 text-sm transition-all duration-200",
            "focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10",
            "dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700",
            "dark:focus:border-neutral-500 dark:focus:ring-neutral-100/10",
            error && "border-red-500",
            className,
          )}
        >
          <span
            className={
              selectedOption
                ? "text-neutral-900 dark:text-neutral-100"
                : "text-neutral-400"
            }
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-neutral-400 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>
        {isOpen && (
          <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-2.5 text-left text-sm transition-colors",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  option.value === value
                    ? "bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
                    : "text-neutral-600 dark:text-neutral-400",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
