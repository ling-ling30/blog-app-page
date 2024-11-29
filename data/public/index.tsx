import { fetcher } from "@/lib/fetcher";
import { Category, Post } from "@/type";
import { useQuery } from "@tanstack/react-query";
import React from "react";

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
export const usePublicPostBySlug = (slug: string) => {
  return useQuery<Post>({
    queryKey: ["public-posts", slug],
    queryFn: () => fetcher(`/public/posts/${slug}`),
  });
};

export const usePublicCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["public-categories"],
    queryFn: () => fetcher("/public/categories"),
  });
};

export const usePublicTags = () => {
  return useQuery<Post[]>({
    queryKey: ["public-tags"],
    queryFn: () => fetcher("/public/tags"),
  });
};
