"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "@/hooks/usePosts";
import { PostFormData } from "@/schemas/post.schema";
import { PostForm } from "@/components/features/PostForm";

const NewPostPage = () => {
  const router = useRouter();
  const { createPost, isCreating } = usePosts();
  const { user } = useAuth();

  const onSubmit = async (data: PostFormData) => {
    if (!user) return;
    try {
      await createPost({ ...data, author: user });
      router.push("/");
    } catch (err) {
      console.log("Error creating post", err);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          New post
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Share your thoughts with the world
        </p>
      </div>
      <PostForm onSubmit={onSubmit} isSubmitting={isCreating} />
    </div>
  );
};

export default NewPostPage;
