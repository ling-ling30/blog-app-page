import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { authenticatedFetcher, deleter, poster, putter } from "@/lib/fetcher";
import type { Post, Category, Tag } from "@/type";

import { toast } from "sonner";
import { z } from "zod";
import { createPostSchema } from "@/app/admin/(protected)/articles/[slug]/_components/ArticleForm";
export const runtime = "edge"; // 'nodejs' (default) | 'edge'

const TAG_QUERY_KEY = "tags";
const CATEGORY_QUERY_KEY = "categories";
const ADMIN_POSTS_QUERY_KEY = "posts";
const ADMIN_POSTS_BY_SLUG_QUERY_KEY = "posts-by-slug";
const ADMIN_SETTINGS_QUERY_KEY = "settings";

export type SortOrder = "asc" | "desc";
export type SortField = "createdAt" | "title" | "viewCount" | "publishedAt";

export interface PostsParams {
  categoryId?: number;
  tagId?: number;
  limit?: number;
  offset?: number;
  search?: string;
  sortBy?: SortField;
  sortOrder?: SortOrder;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  isPublished?: boolean;
}
const POSTS_PER_PAGE = 10;

export const useFetchPosts = (
  params?: PostsParams,
  options?: Omit<UseQueryOptions<Post[]>, "queryKey" | "queryFn">
) => {
  const queryParams: PostsParams = {
    limit: POSTS_PER_PAGE,
    offset: 0,
    sortBy: "createdAt",
    sortOrder: "desc",
    ...params,
  };

  const queryKey = [ADMIN_POSTS_QUERY_KEY, queryParams];

  const { data, isLoading, isError, isFetching, refetch } = useQuery<Post[]>({
    queryKey,
    queryFn: () => authenticatedFetcher("/posts", queryParams),
    staleTime: 60 * 1000,
    placeholderData: (previousData, previousQuery) => previousData,
    ...options,
  });

  return {
    posts: data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};

export const useFetchPostBySlug = (slug: string) => {
  const fetchPost = async (): Promise<Post> => {
    const url = `/posts/slug/${slug}`;
    try {
      const response = await authenticatedFetcher<Post>(url);
      if (!response) {
        throw new Error("Post not found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      throw error; // Re-throw the error for React Query to handle
    }
  };

  return useQuery<Post, Error>({
    queryKey: [ADMIN_POSTS_BY_SLUG_QUERY_KEY, slug],
    queryFn: fetchPost,
    staleTime: 60 * 1000,

    enabled: !!slug, // Only run query if slug is provided
    retry: (failureCount, error) => {
      // Customize retry behavior
      if (error instanceof Error && error.message === "Post not found") {
        return false; // Don't retry for 404s
      }
      return failureCount < 3; // Retry other errors up to 3 times
    },
  });
};

export const useCategories = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Category[]>({
    staleTime: 60 * 1000,

    queryKey: [CATEGORY_QUERY_KEY],
    queryFn: () => authenticatedFetcher("/categories"),
  });

  const mutationFn = (input: { name: string }) => {
    const res = poster<Category>(`/categories`, input);

    return res;
  };

  const mutation = useMutation<Category, Error, { name: string }>({
    mutationFn,
    mutationKey: [CATEGORY_QUERY_KEY],
    onSuccess: (data, input) => {
      toast.success("Category berhasil ditambahkan!");
      queryClient.invalidateQueries({ queryKey: [TAG_QUERY_KEY] });
    },
    onError: (error) => {
      console.error("Error", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { query, mutation };
};

export const useTags = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Tag[]>({
    queryKey: [TAG_QUERY_KEY],
    queryFn: () => authenticatedFetcher("/tags"),
    staleTime: 60 * 1000,
  });

  const mutationFn = (input: { name: string }) => {
    const res = poster<Tag>(`/tags`, input);

    return res;
  };

  const mutation = useMutation<Tag, Error, { name: string }>({
    mutationFn,
    mutationKey: [TAG_QUERY_KEY],
    onSuccess: (data, input) => {
      toast.success("Tag berhasil ditambahkan!");
      queryClient.invalidateQueries({ queryKey: [TAG_QUERY_KEY] });
    },
    onError: (error) => {
      console.error("Error", error);
      toast.error(`Error: ${error.message}`);
    },
  });
  return { query, mutation };
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ADMIN_POSTS_QUERY_KEY],
    mutationFn: (data: z.infer<typeof createPostSchema>) =>
      poster<{ mesasge: string; data: Post }>("/posts", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["public-posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ADMIN_POSTS_QUERY_KEY],
    mutationFn: (data: z.infer<typeof createPostSchema>) =>
      putter<{ mesasge: string; data: Post }>(`/posts/${data.id}`, data),

    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["public-posts"] });

      // Optionally update specific post in cache
      queryClient.setQueryData(["post", data.data.slug], data.data);
    },

    onError: (error) => {
      console.error("Failed to update post:", error);
      // You can add toast notifications or other error handling here
    },
  });
};

export const usePublishPost = (slug: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ADMIN_POSTS_QUERY_KEY, slug],
    mutationFn: async (id: string) => {
      const res = putter<{ mesasge: string; data: Post }>(
        `/posts/${id}/publish`,
        {}
      );
      return res;
      // Optionally update specific post in cache
    },

    onError: (error) => {
      console.error("Failed to publish post:", error);
      // You can add toast notifications or other error handling here
    },
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["public-posts"] });

      // Optionally update specific post in cache
      queryClient.setQueryData(["post", data.data.slug], data.data);
    },
  });
};

export const useDeletePost = (slug: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ADMIN_POSTS_QUERY_KEY, slug],
    mutationFn: async (id: string) => {
      const res = deleter<{ mesasge: string; data: Post }>(`/posts/${id}`);
      return res;
      // Optionally update specific post in cache
    },

    onError: (error) => {
      console.error("Failed to delete post:", error);
      // You can add toast notifications or other error handling here
    },
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["public-posts"] });

      // Optionally update specific post in cache
      queryClient.setQueryData(["post", data.data.slug], data.data);
    },
  });
};

export type Settings = [
  { id: "about"; value: string },
  { id: "address"; value: string },
  { id: "email"; value: string },
  { id: "phone_number"; value: string }
];

export const useGetSettings = () => {
  return useQuery<Settings>({
    queryKey: [ADMIN_SETTINGS_QUERY_KEY],
    queryFn: () => authenticatedFetcher("/settings"),
  });
};

const settingsSchema = z.object({
  about: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  email: z.string().min(1).optional(),
  phone_number: z.string().min(1).optional(),
});

export const useUpdateSettings = () => {
  return useMutation({
    mutationKey: [ADMIN_SETTINGS_QUERY_KEY],
    mutationFn: (data: z.infer<typeof settingsSchema>) =>
      putter("/settings", data),
    onError: (error) => {
      console.error("Failed to update settings:", error);
      // You can add toast notifications or other error handling here
    },
  });
};
