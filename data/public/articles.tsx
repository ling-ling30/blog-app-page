import { fetcher } from "@/lib/fetcher";
import { Post } from "@/type";
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
