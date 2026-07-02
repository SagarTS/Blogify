import { create } from "zustand";

import type { PaginatedResponse, Post } from "@/types";
import {
  deletePost,
  getAll,
  getById,
  type GetPostsParams,
} from "@/services/post.service";

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  filters: {
    search: string;
    category: string;
    tag: string;
    sort: string;
  };
}

interface PostsActions {
  fetchPosts: (params?: GetPostsParams) => Promise<void>;
  fetchPost: (id: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  setFilters: (filters: Partial<PostsState["filters"]>) => void;
  setPage: (page: number) => void;
  clearCurrentPost: () => void;
}

export const usePostsStore = create<PostsState & PostsActions>((set, get) => ({
  posts: [],
  currentPost: null,
  total: 0,
  page: 1,
  perPage: 9,
  totalPages: 0,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  filters: {
    search: "",
    category: "",
    tag: "",
    sort: "newest",
  },

  fetchPosts: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const { filters, perPage } = get();
      const response: PaginatedResponse<Post> = await getAll({
        page: params?.page || get().page,
        perPage: params?.perPage || perPage,
        search: (params?.search ?? filters.search) || undefined,
        category: (params?.category ?? filters.category) || undefined,
        tag: (params?.tag ?? filters.tag) || undefined,
        sort: (params?.sort ?? filters.sort) || undefined,
      });
      set({
        posts: response.data,
        total: response.total,
        page: response.page,
        totalPages: response.totalPages,
        isLoading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load posts";
      set({ isLoading: false, error: message });
    }
  },

  fetchPost: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const post = await getById(id);
      set({ currentPost: post, isLoading: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load post";
      set({ isLoading: false, error: message });
    }
  },

  deletePost: async (id) => {
    set({ isDeleting: true, error: null });
    try {
      await deletePost(id);
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== id),
        total: state.total - 1,
        isDeleting: false,
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete post";
      set({ isDeleting: false, error: message });
      throw error;
    }
  },

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
      page: 1,
    }));
  },

  setPage: (page) => set({ page }),

  clearCurrentPost: () => set({ currentPost: null }),
}));
