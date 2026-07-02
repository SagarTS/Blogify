"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clock, Edit3, Trash2 } from "lucide-react";

import { formatDate } from "@/utils";
// import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "@/hooks/usePosts";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useParams, useRouter } from "next/navigation";
import { EmptyState } from "@/components/ui/EmptyState";
import { PostDetailSkeleton } from "@/components/ui/Skeleton";
import { DeletePostDialog } from "@/components/features/DeletePostDialog";

const PostDetailPage = () => {
  const [showDelete, setShowDelete] = useState(false);

  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  //   const { user } = useAuth();
  const {
    currentPost,
    isLoading,
    error,
    fetchPost,
    deletePost,
    isDeleting,
    clearCurrentPost,
  } = usePosts();

  useEffect(() => {
    fetchPost(id);
    return () => clearCurrentPost();
  }, [id, fetchPost, clearCurrentPost]);

  const handleDelete = async () => {
    try {
      await deletePost(id);
      router.push("/");
    } catch {
      console.log("Error deleting post");
    }
    setShowDelete(false);
  };

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (error || !currentPost) {
    return (
      <EmptyState
        icon="inbox"
        title="Post not found"
        description="The post you're looking for doesn't exist or has been removed."
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

  //   const isAuthor = user?.id === currentPost.authorId;
  const isAuthor = true;

  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to posts
        </Link>
      </div>

      <header className="mb-10">
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="outline">{currentPost.category}</Badge>
          {currentPost.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <h1 className="text-3xl font-bold leading-tight text-neutral-900 dark:text-neutral-100">
          {currentPost.title}
        </h1>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar name={currentPost.author.name} size="md" />
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {currentPost.author.name}
              </p>
              <div className="flex items-center gap-3 text-xs text-neutral-400 dark:text-neutral-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(currentPost.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {Math.ceil(currentPost.content.length / 1000)} min read
                </span>
              </div>
            </div>
          </div>

          {isAuthor && (
            <div className="ml-auto flex items-center gap-2">
              <Link href={`/${id}/edit`}>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Edit3 className="h-4 w-4" />}
                >
                  Edit
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Trash2 className="h-4 w-4" />}
                onClick={() => setShowDelete(true)}
                className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <p className="mb-6 text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
          {currentPost.excerpt}
        </p>
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          {currentPost.content.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="mb-4 leading-relaxed text-neutral-700 dark:text-neutral-300"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <DeletePostDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        postTitle={currentPost.title}
      />
    </article>
  );
};

export default PostDetailPage;
