export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  authorId?: string;
  author: Pick<User, "id" | "name" | "avatar">;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
