"use client";

import { useEffect } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { usePostsStore } from "@/stores/postsStore";

export const usePosts = () => {
  const {
    posts,
    currentPost,
    total,
    page,
    totalPages,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    filters,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    setFilters,
    setPage,
    clearCurrentPost,
  } = usePostsStore();

  return {
    posts,
    currentPost,
    total,
    page,
    totalPages,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    filters,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    setFilters,
    clearCurrentPost,
    setPage,
  };
};

export const usePostsWithFilters = () => {
  const { filters, page, fetchPosts, setFilters, setPage, ...rest } =
    usePosts();
  const debouncedSearch = useDebounce(filters.search, 400);

  useEffect(() => {
    fetchPosts({
      search: debouncedSearch || undefined,
      category: filters.category || undefined,
      tag: filters.tag || undefined,
      sort: filters.sort || undefined,
      page,
    });
  }, [
    debouncedSearch,
    filters.category,
    filters.tag,
    filters.sort,
    page,
    fetchPosts,
  ]);

  return {
    filters,
    page,
    setFilters,
    setPage,
    fetchPosts,
    ...rest,
  };
};
