import { fetcher } from "@/lib/fetcher";
import { Category, Post } from "@/type";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React from "react";

export const usePublicPosts = (options?: {
  title?: string;
  category?: string;
  tag?: string;
  limit?: number;
  offset?: number;
}) => {
  const params = new URLSearchParams();

  if (options?.title !== undefined) {
    params.append("title", options.title);
  }
  if (options?.category !== undefined) {
    params.append("categoryId", options.category.toString());
  }

  if (options?.tag !== undefined) {
    params.append("tagId", options.tag.toString());
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
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData, previousQuery) => previousData,
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

export const useFeaturedPosts = () => {
  return useQuery<Post[]>({
    queryKey: ["featured-posts"],
    queryFn: () => fetcher("/public/featured-posts"),
  });
};

export const useInfinitePosts = (options?: {
  title?: string;
  category?: string;
  tag?: string;
  limit?: number;
  offset?: number;
}) => {
  // Set default limit for posts per page
  const limit = options?.limit ?? 10;

  /**
   * Builds the API URL with query parameters based on options and page number.
   * @param pageParam The current page number (starting from 0).
   * @returns Constructed URL string for fetching posts.
   */
  const buildUrl = (pageParam: number): string => {
    const params = new URLSearchParams();

    if (options?.title) {
      params.append("title", options.title);
    }
    if (options?.category) {
      params.append("categoryId", options.category);
    }
    if (options?.tag) {
      params.append("tagId", options.tag);
    }

    params.append("limit", limit.toString());
    params.append("offset", (pageParam * limit).toString());

    return `/public/posts?${params.toString()}`;
  };

  // Use React Query's useInfiniteQuery to fetch paginated data
  return useInfiniteQuery<
    Post[],
    Error,
    {
      pageParams: number[];
      pages: Post[];
    },
    [
      string,
      (
        | {
            title?: string;
            category?: string;
            tag?: string;
            limit?: number;
            offset?: number;
          }
        | undefined
      )
    ],
    number
  >({
    queryKey: ["infinite-posts", options], // Unique query key for caching
    queryFn: ({ pageParam = 0 }) => fetcher(buildUrl(pageParam)), // Fetch data based on page
    initialPageParam: 0, // Start fetching from the first page

    /**
     * Determines the next page number for fetching.
     * If the last page has fewer items than the limit, we've reached the end.
     */
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPage.length < limit ? undefined : lastPageParam + 1;
    },

    /**
     * Determines the previous page number for fetching.
     * If on the first page, there is no previous page.
     */
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      return firstPageParam > 0 ? firstPageParam - 1 : undefined;
    },
  });
};
