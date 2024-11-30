import { fetcher } from "@/lib/fetcher";
import { Category, Post } from "@/type";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const usePublicPosts = (options?: {
  title?: string;
  categoryId?: number;
  tagId?: number;
  limit?: number;
  offset?: number;
}) => {
  const params = new URLSearchParams();

  if (options?.title !== undefined) {
    params.append("title", options.title);
  }
  if (options?.categoryId !== undefined) {
    params.append("categoryId", options.categoryId.toString());
  }

  if (options?.tagId !== undefined) {
    params.append("tagId", options.tagId.toString());
  }

  if (options?.limit !== undefined) {
    params.append("limit", options.limit.toString());
  }

  if (options?.offset !== undefined) {
    params.append("offset", options.offset.toString());
  }

  const paramsString = params.toString();
  const url = paramsString ? `/public/posts?${paramsString}` : `/public/posts`;

  return useQuery<Post[]>({
    queryKey: ["public-posts", options],
    queryFn: () => fetcher(url),
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
