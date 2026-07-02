"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { usePosts } from "@/hooks/usePosts";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import type { PostFormData } from "@/schemas/post.schema";
import { PostForm } from "@/components/features/PostForm";
import { PostDetailSkeleton } from "@/components/ui/Skeleton";

const EditPostPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const {
    currentPost,
    isLoading,
    error,
    fetchPost,
    updatePost,
    isUpdating,
    clearCurrentPost,
  } = usePosts();

  useEffect(() => {
    fetchPost(id);
    return () => clearCurrentPost();
  }, [id, fetchPost, clearCurrentPost]);

  const onSubmit = async (data: PostFormData) => {
    try {
      await updatePost(id, data);
      router.push(`/${id}`);
    } catch {
      console.log("Failed to update post");
    }
  };

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (error || !currentPost) {
    return (
      <EmptyState
        icon="inbox"
        title="Post not found"
        action={
          <Link href="/">
            <Button
              variant="outline"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Back to dashboard
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <Link
          href={`/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to post
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Edit post
        </h1>
      </div>
      <PostForm
        defaultValues={{
          title: currentPost.title,
          content: currentPost.content,
          excerpt: currentPost.excerpt,
          category: currentPost.category,
          tags: currentPost.tags,
        }}
        onSubmit={onSubmit}
        isSubmitting={isUpdating}
        submitLabel="Update"
      />
    </div>
  );
};

export default EditPostPage;
