export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  thumbnailUrl: string | null;
  featured: boolean;
  description: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
}