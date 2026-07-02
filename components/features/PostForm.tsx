"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "../ui/Textarea";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { CATEGORIES, TAGS } from "@/utils/constants";
import { postSchema, type PostFormData } from "@/schemas/post.schema";

interface PostFormProps {
  defaultValues?: Partial<PostFormData>;
  onSubmit: (data: PostFormData) => Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export const PostForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Publish",
}: PostFormProps) => {
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      category: "",
      tags: [],
      ...defaultValues,
    },
  });

  const tags = watch("tags");

  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (
      trimmed &&
      !tags.includes(trimmed) &&
      TAGS.includes(trimmed as (typeof TAGS)[number])
    ) {
      setValue("tags", [...tags, trimmed], { shouldValidate: true });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag),
      { shouldValidate: true },
    );
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Title"
        placeholder="Enter your post title..."
        error={errors.title?.message}
        {...register("title")}
      />

      <Dropdown
        label="Category"
        placeholder="Select a category"
        options={CATEGORIES.map((c) => ({ label: c, value: c }))}
        value={watch("category")}
        onChange={(value) =>
          setValue("category", value, { shouldValidate: true })
        }
        error={errors.category?.message}
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Tags
        </label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="primary"
              removable
              onRemove={() => removeTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Type a tag and press Enter..."
            className="block flex-1 rounded-lg border bg-white px-4 py-2 text-sm text-neutral-900 placeholder-neutral-400 transition-all focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-500 dark:border-neutral-700 dark:focus:border-neutral-500"
            list="tag-suggestions"
          />
          <datalist id="tag-suggestions">
            {TAGS.filter((t) => !tags.includes(t)).map((tag) => (
              <option key={tag} value={tag} />
            ))}
          </datalist>
          <Button type="button" variant="outline" size="sm" onClick={addTag}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {errors.tags && (
          <p className="text-xs text-red-500" role="alert">
            {errors.tags.message}
          </p>
        )}
      </div>

      <Textarea
        label="Excerpt"
        placeholder="Write a brief excerpt of your post..."
        error={errors.excerpt?.message}
        rows={3}
        {...register("excerpt")}
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Content
        </label>
        <textarea
          {...register("content")}
          rows={16}
          placeholder="Write your post content here. Use Markdown for formatting..."
          className="block w-full rounded-lg border bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 transition-all focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-500 dark:border-neutral-700 dark:focus:border-neutral-500 font-mono leading-relaxed"
        />
        {errors.content && (
          <p className="text-xs text-red-500" role="alert">
            {errors.content.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
