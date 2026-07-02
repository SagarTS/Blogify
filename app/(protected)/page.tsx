"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { usePostsWithFilters } from "@/hooks/usePosts";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { PostCard } from "@/components/features/PostCard";
import { PostCardSkeleton } from "@/components/ui/Skeleton";
import { CATEGORIES, SORT_OPTIONS, TAGS } from "@/utils/constants";

export default function Home() {
  const {
    posts,
    total,
    page,
    totalPages,
    isLoading,
    error,
    filters,
    setFilters,
    setPage,
    fetchPosts,
  } = usePostsWithFilters();

  const hasActiveFilters = filters.search || filters.category || filters.tag;

  const clearFilters = () => {
    setFilters({ search: "", category: "", tag: "", sort: "newest" });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Posts
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {total} {total === 1 ? "post" : "posts"} total
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 transition-all focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-500 dark:focus:border-neutral-500"
          />
        </div>
        <div className="flex gap-3">
          <Dropdown
            options={[
              { label: "All Categories", value: "" },
              ...CATEGORIES.map((c) => ({ label: c, value: c })),
            ]}
            value={filters.category}
            onChange={(value) => setFilters({ category: value })}
            placeholder="Category"
            className="w-40"
          />
          <Dropdown
            options={[
              { label: "All Tags", value: "" },
              ...TAGS.map((t) => ({ label: t, value: t })),
            ]}
            value={filters.tag}
            onChange={(value) => setFilters({ tag: value })}
            placeholder="Tag"
            className="w-36"
          />
          <Dropdown
            options={SORT_OPTIONS.map((s) => ({
              label: s.label,
              value: s.value,
            }))}
            value={filters.sort}
            onChange={(value) => setFilters({ sort: value })}
            placeholder="Sort"
            className="w-32"
          />
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => fetchPosts()}
            className="mt-1 font-medium underline underline-offset-2"
          >
            Try again
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <EmptyState
          icon={
            filters.search || filters.category || filters.tag
              ? "search"
              : "posts"
          }
          title={
            hasActiveFilters ? "No posts match your filters" : "No posts yet"
          }
          description={
            hasActiveFilters
              ? "Try adjusting your search or filter criteria."
              : "Create your first post to get started."
          }
        />
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
