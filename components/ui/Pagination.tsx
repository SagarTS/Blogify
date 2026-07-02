"use client";

import { cn } from "@/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const range = usePagination({ totalPages, currentPage });

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {range.map((item, index) => {
        if (item === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="flex h-9 w-9 items-center justify-center text-sm text-neutral-400"
            >
              ...
            </span>
          );
        }

        const page = item as number;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
              page === currentPage
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800",
            )}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};
