export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail_url: string;
  github_url: string;
  live_url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  thumbnail_url: string;
  status: 'draft' | 'published';
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'languages' | 'others';
  proficiency: number;
  icon_name: string;
  created_at: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  duration: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
