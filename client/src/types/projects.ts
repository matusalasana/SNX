export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnailUrl: string;
  githubUrl: string;
  liveUrl: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}