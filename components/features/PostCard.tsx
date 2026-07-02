"use client";

import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

import type { Post } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate, truncate } from "@/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={`/${post.id}`}>
      <Card hover className="group flex h-full flex-col">
        <CardContent className="flex flex-1 flex-col">
          <div className="mb-3 flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
            <Avatar name={post.author.name} size="sm" />
            <span className="font-medium text-neutral-600 dark:text-neutral-400">
              {post.author.name}
            </span>
            <span className="text-neutral-300 dark:text-neutral-600">·</span>
            <Calendar className="h-3 w-3" />
            {formatDate(post.createdAt)}
          </div>

          <h3 className="mb-1.5 text-base font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-300">
            {post.title}
          </h3>

          <p className="mb-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {truncate(post.excerpt, 120)}
          </p>

          <div className="mb-4 flex flex-wrap gap-1.5">
            <Badge variant="outline">{post.category}</Badge>
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 2 && (
              <Badge variant="default">+{post.tags.length - 2}</Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="justify-between">
          <span className="text-xs text-neutral-400 dark:text-neutral-500">
            {Math.ceil(post.content.length / 1000)} min read
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-300">
            Read{" "}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};
