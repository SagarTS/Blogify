import { FileText, Search, Inbox } from "lucide-react";

import { cn } from "@/utils/cn";

interface EmptyStateProps {
  icon?: "posts" | "search" | "inbox";
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const icons = {
  posts: FileText,
  search: Search,
  inbox: Inbox,
};

export const EmptyState = ({
  icon = "inbox",
  title,
  description,
  action,
  className,
}: EmptyStateProps) => {
  const Icon = icons[icon];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className,
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <Icon className="h-6 w-6 text-neutral-400 dark:text-neutral-500" />
      </div>
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
