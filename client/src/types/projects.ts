export interface Project {
  id: string;
  title: string;
  description: string | null;
  category: string;
  tags: string[];
  thumbnailUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}