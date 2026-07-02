import { type Post } from "@/types";

export const seedPosts: Post[] = [
  {
    id: "post_1",
    title: "Building Resilient React Applications with Error Boundaries",
    content:
      "Error boundaries are a crucial part of any production React application. They catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole application.\n\nIn this post, we'll explore how to implement error boundaries effectively, common patterns, and gotchas to avoid. We'll look at how modern React patterns have evolved and what the future holds for error handling in React.\n\nError boundaries work like JavaScript catch blocks but for components. They preserve the user experience by containing failures and allowing graceful recovery or informative fallback states.",
    excerpt:
      "Learn how to implement robust error boundaries in React that gracefully handle failures without crashing the entire application.",
    category: "Engineering",
    tags: ["react", "typescript", "testing"],
    authorId: "user_1",
    author: { id: "user_1", name: "Alex Rivera", avatar: "" },
    createdAt: "2025-06-15T10:00:00Z",
    updatedAt: "2025-06-15T10:00:00Z",
    published: true,
  },
  {
    id: "post_2",
    title: "The Art of TypeScript: Advanced Pattern Matching",
    content:
      "TypeScript's type system is incredibly powerful. Beyond basic types and interfaces, there's a whole world of advanced patterns that can make your code safer and more expressive.\n\nWe'll explore discriminated unions, template literal types, conditional types, and mapped types. These patterns allow you to model complex domains precisely and catch errors at compile time rather than runtime.\n\nThe key to mastering TypeScript is understanding how to leverage its type system to encode business rules and invariants.",
    excerpt:
      "Dive deep into advanced TypeScript patterns including discriminated unions, template literals, and conditional types.",
    category: "Technology",
    tags: ["typescript", "javascript", "architecture"],
    authorId: "user_1",
    author: { id: "user_1", name: "Alex Rivera", avatar: "" },
    createdAt: "2025-06-10T08:30:00Z",
    updatedAt: "2025-06-10T08:30:00Z",
    published: true,
  },
  {
    id: "post_3",
    title: "Designing for Dark Mode: A Practical Guide",
    content:
      "Dark mode is no longer optional. Users expect it, and implementing it well requires more than just inverting colors. Good dark mode design considers contrast ratios, color psychology, and accessibility.\n\nIn this guide, we'll cover color palette selection, maintaining proper hierarchy in dark mode, handling images and media, and testing for accessibility. We'll also look at how to implement smooth transitions between themes.",
    excerpt:
      "A comprehensive guide to implementing dark mode that goes beyond simple color inversion.",
    category: "Design",
    tags: ["css", "tailwind", "design"],
    authorId: "user_1",
    author: { id: "user_1", name: "Alex Rivera", avatar: "" },
    createdAt: "2025-06-05T14:00:00Z",
    updatedAt: "2025-06-05T14:00:00Z",
    published: true,
  },
  {
    id: "post_4",
    title: "Next.js App Router: Server Components Deep Dive",
    content:
      "React Server Components represent a fundamental shift in how we think about React applications. They allow components to run on the server, reducing bundle size and improving performance.\n\nThis deep dive explores how Server Components work, when to use them, and patterns for combining server and client components effectively. We'll look at data fetching strategies, streaming, and the mental model shift required.",
    excerpt:
      "Understanding React Server Components in Next.js and how they change the architecture of modern web applications.",
    category: "Technology",
    tags: ["nextjs", "react", "javascript"],
    authorId: "user_1",
    author: { id: "user_1", name: "Alex Rivera", avatar: "" },
    createdAt: "2025-05-28T09:15:00Z",
    updatedAt: "2025-05-28T09:15:00Z",
    published: true,
  },
  {
    id: "post_5",
    title: "Scaling Engineering Teams: Lessons from the Trenches",
    content:
      "Scaling an engineering team is harder than scaling software. As teams grow, communication overhead increases, context is lost, and velocity can actually decrease.\n\nThis post shares practical lessons on maintaining engineering culture during rapid growth, structuring teams for autonomy and alignment, and creating processes that enable rather than constrain.",
    excerpt:
      "Practical lessons on maintaining velocity and culture while scaling engineering organizations.",
    category: "Leadership",
    tags: ["architecture", "devops", "performance"],
    authorId: "user_1",
    author: { id: "user_1", name: "Alex Rivera", avatar: "" },
    createdAt: "2025-05-20T11:00:00Z",
    updatedAt: "2025-05-20T11:00:00Z",
    published: true,
  },
  {
    id: "post_6",
    title: "Modern CSS Techniques Every Developer Should Know",
    content:
      "CSS has evolved tremendously. Modern CSS offers solutions to problems that previously required JavaScript or complex workarounds. Container queries, CSS layers, and the :has() selector are game changers.\n\nThis article covers practical modern CSS techniques that improve your workflow and create better user experiences with less code.",
    excerpt:
      "Explore modern CSS features like container queries, CSS layers, and the :has() selector that simplify complex layouts.",
    category: "Engineering",
    tags: ["css", "tailwind", "performance"],
    authorId: "user_1",
    author: { id: "user_1", name: "Alex Rivera", avatar: "" },
    createdAt: "2025-05-15T16:00:00Z",
    updatedAt: "2025-05-15T16:00:00Z",
    published: true,
  },
  {
    id: "post_7",
    title: "Why Your Team Should Adopt API-First Development",
    content:
      "API-first development is a methodology where you design and document your API before writing any implementation code. This approach leads to better designs, smoother collaboration, and faster development.\n\nWe'll cover the workflow, tools, and cultural changes needed to adopt API-first development, along with real-world case studies from teams that made the switch.",
    excerpt:
      "How designing APIs before implementation leads to better products and happier development teams.",
    category: "Product",
    tags: ["api", "architecture", "node"],
    authorId: "user_1",
    author: { id: "user_1", name: "Alex Rivera", avatar: "" },
    createdAt: "2025-05-10T13:45:00Z",
    updatedAt: "2025-05-10T13:45:00Z",
    published: true,
  },
  {
    id: "post_8",
    title: "Introduction to Machine Learning for Frontend Developers",
    content:
      "Machine learning isn't just for backend systems and data scientists. Frontend developers can leverage ML to create smarter, more personalized user experiences.\n\nThis introduction covers basic ML concepts, tools available for frontend ML (TensorFlow.js, MediaPipe), and practical examples like smart search, image recognition, and predictive UI.",
    excerpt:
      "A frontend developer's guide to integrating machine learning capabilities into web applications.",
    category: "Tutorial",
    tags: ["ai", "ml", "javascript"],
    authorId: "user_1",
    author: { id: "user_1", name: "Alex Rivera", avatar: "" },
    createdAt: "2025-05-05T10:30:00Z",
    updatedAt: "2025-05-05T10:30:00Z",
    published: true,
  },
];
