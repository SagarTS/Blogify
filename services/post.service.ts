import { seedPosts } from "@/data";
import type { Post, PaginatedResponse } from "@/types";

export interface GetPostsParams {
  page?: number;
  perPage?: number;
  search?: string;
  category?: string;
  tag?: string;
  sort?: string;
}

function delay(ms: number = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAll(
  params?: GetPostsParams,
): Promise<PaginatedResponse<Post>> {
  await delay(600);

  let filtered = [...seedPosts];

  if (params?.search) {
    const q = params?.search?.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q),
    );
  }

  if (params?.category) {
    filtered = filtered.filter((p) => p.category === params.category);
  }

  if (params?.tag) {
    filtered = filtered.filter((p) => p.tags.includes(params.tag!));
  }

  switch (params?.sort) {
    case "oldest":
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      break;
    case "newest":
    case "recent":
    default:
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
  }

  const page = params?.page || 1;
  const perPage = params?.perPage || 9;
  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const data = filtered.slice(start, start + perPage);

  return { data, total, page, perPage, totalPages };
}

export async function getById(id: string): Promise<Post> {
  await delay(500);
  const post = seedPosts.find((p) => p.id === id);
  if (!post) {
    throw { message: "Post not found", code: "NOT_FOUND", status: 404 };
  }
  return post;
}

export async function deletePost(id: string): Promise<void> {
  await delay(500);
  const index = seedPosts.findIndex((p) => p.id === id);
  if (index === -1) {
    throw { message: "Post not found", code: "NOT_FOUND", status: 404 };
  }

  seedPosts.splice(index, 1);
}
