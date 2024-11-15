export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImageUrl: string;
  viewCount: number;
  publishedAt: number;
  categories: string;
  tags: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  createdAt: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  createdAt: number;
}
