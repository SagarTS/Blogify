export const APP_NAME = "Blogify";

export const CATEGORIES = [
  "Technology",
  "Design",
  "Engineering",
  "Product",
  "Leadership",
  "Career",
  "Tutorial",
  "Opinion",
] as const;

export const TAGS = [
  "react",
  "nextjs",
  "typescript",
  "javascript",
  "css",
  "tailwind",
  "node",
  "python",
  "ai",
  "ml",
  "devops",
  "database",
  "api",
  "testing",
  "performance",
  "security",
  "architecture",
  "opensource",
] as const;

export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Most Recent", value: "recent" },
] as const;
