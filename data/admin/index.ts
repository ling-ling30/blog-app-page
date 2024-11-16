import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { fetcher, authenticatedFetcher, poster, putter } from "@/lib/fetcher";
import type { Post, Category, Tag } from "@/type";

import { toast } from "sonner";

export const useFetchPosts = (params?: {
  categoryId?: number;
  tagId?: number;
  limit?: number;
  offset?: number;
}) => {
  return useQuery<Post[]>({
    queryKey: ["public-posts", params],
    queryFn: () => authenticatedFetcher("/posts", params),
  });
};

export const useCategories = () => {
  const query = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => fetcher("/categories"),
  });

  const mutationFn = (input: { name: string }) => {
    const res = poster<Category>(`/categories`, input);

    return res;
  };

  const mutation = useMutation<Category, Error, { name: string }>({
    mutationFn,
    mutationKey: [],
    onSuccess: (data, input) => {
      toast.success("Category berhasil ditambahkan!");
    },
    onError: (error) => {
      console.error(
        "An error occurred while updating the warehouse receipt:",
        error
      );
      toast.error(`Error: ${error.message}`);
    },
  });

  return { query, mutation };
};

export const useTags = () => {
  const query = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: () => fetcher("/tags"),
  });
  return query;
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
