export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featuredImageUrl: string;
  viewCount: number;
  publishedAt: number;
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  createdAt: number;
}

export interface PreviewPost {
  id?: string | null;
  title?: string | null;
  slug?: string | null;
  content?: string | null;
  excerpt?: string | null;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | null;
  featuredImageUrl?: File | string | null;
  categories?:
    | {
        id: number;
        name: string;
        slug: string;
      }[]
    | null;
  tags?:
    | {
        id: number;
        name: string;
        slug: string;
      }[]
    | null;
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
