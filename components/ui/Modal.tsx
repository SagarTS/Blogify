"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";

import { cn } from "@/utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showClose?: boolean;
  closeOnOverlay?: boolean;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  showClose = true,
  closeOnOverlay = true,
}: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (closeOnOverlay && e.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className={cn(
          "relative z-10 w-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl",
          "dark:border-neutral-700 dark:bg-neutral-900",
          sizeClasses[size],
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        {title && (
          <div className="mb-2">
            <h2
              id="modal-title"
              className="text-lg font-semibold text-neutral-900 dark:text-neutral-100"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
