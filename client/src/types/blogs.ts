
export interface Blog {
  title: string;
  content: string;
  summary: string;
  thumbnailUrl: string;
  status: "draft" | "published";
  readTime: string;
  author: string;
  tags: string[];
  category?: string;
  featured: boolean;
};
