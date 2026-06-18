
export interface Blog {
  id: string;
  title: string;
  summary: string;
  thumbnailUrl: string | null;
  status: "published" | "draft";
  readTime: string;
  author: string;
  tags: string[];
  category: string | null;
  featured: boolean;
  createdAt: string;
};
