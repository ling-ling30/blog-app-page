import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetcher,
  authenticatedFetcher,
  poster,
  putter,
} from "@/lib/testFetcher";
import type { Post, Category, Tag } from "@/type";

export const usePublicPosts = (params?: {
  categoryId?: number;
  tagId?: number;
  limit?: number;
  offset?: number;
}) => {
  return useQuery<Post[]>({
    queryKey: ["public-posts", params],
    queryFn: () => fetcher("/public/posts", params),
  });
};

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => fetcher("/public/categories"),
  });
};

export const useTags = () => {
  return useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: () => fetcher("/public/tags"),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      content: string;
      excerpt?: string;
      featuredImageUrl?: string;
      categoryIds?: number[];
      tagIds?: number[];
    }) => poster<Post>("/posts", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["public-posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      ...data
    }: {
      id: string;
      title?: string;
      content?: string;
      excerpt?: string;
      featuredImageUrl?: string;
      categoryIds?: number[];
      tagIds?: number[];
    }) => putter<Post>(`/posts/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["public-posts"] });
    },
  });
};
