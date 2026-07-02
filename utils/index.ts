export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
};

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
