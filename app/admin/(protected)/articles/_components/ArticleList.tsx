"use client";
import React, { useState, useMemo } from "react";
import { debounce } from "lodash";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PostsParams, SortField, SortOrder, useFetchPosts } from "@/data/admin";
import Article from "./Article";

interface FilterState {
  search: string;
  sortBy: SortField;
  sortOrder: SortOrder;
  page: number;
  category?: number;
  tag?: number;
}

export default function ArticleList() {
  const [filter, setFilter] = useState<FilterState>({
    search: "",
    sortBy: "publishedAt",
    sortOrder: "desc",
    page: 1,
    category: undefined,
    tag: undefined,
  });

  const POSTS_PER_PAGE = 10;

  const params: PostsParams = {
    offset: (filter.page - 1) * POSTS_PER_PAGE,
    limit: POSTS_PER_PAGE,
    search: filter.search || undefined,
    sortBy: filter.sortBy,
    sortOrder: filter.sortOrder,
    categoryId: filter.category,
    tagId: filter.tag,
  };

  const { posts, isLoading, isError, isFetching } = useFetchPosts(params);

  // Debounced search handler
  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setFilter((prev) => ({ ...prev, search: value, page: 1 }));
      }, 500),
    []
  );

  const handleSort = (field: SortField) => {
    setFilter((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder:
        prev.sortBy === field && prev.sortOrder === "desc" ? "asc" : "desc",
      page: 1,
    }));
  };

  const handleCategoryChange = (categoryId: string) => {
    setFilter((prev) => ({
      ...prev,
      category: categoryId === "all" ? undefined : parseInt(categoryId, 10),
      page: 1,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin text-2xl">⌛</div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="bg-red-50">
        <CardContent className="p-4">
          <p className="text-red-600">
            Error loading articles. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!posts) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            No blog posts available at the moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search articles..."
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-sm"
            />
            <Select
              value={filter.sortBy}
              onValueChange={(value: SortField) => handleSort(value)}
            >
              <SelectTrigger className="w-full">Urutkan</SelectTrigger>
              <SelectContent>
                <SelectItem value="publishedAt">Publish Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="viewCount">Views</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() =>
                setFilter((prev) => ({
                  ...prev,
                  sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
                }))
              }
            >
              {filter.sortOrder === "asc" ? "↑" : "↓"}
            </Button>
          </div>

          {/* Articles List */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.length === 0 && (
              <p className="text-gray-500">
                No blog posts available at the moment.
              </p>
            )}
            {posts.map((post) => (
              <Article key={post.id} article={post} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setFilter((prev) => ({ ...prev, page: prev.page - 1 }))
                }
                disabled={filter.page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setFilter((prev) => ({ ...prev, page: prev.page + 1 }))
                }
                disabled={posts.length < POSTS_PER_PAGE}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading overlay */}
      {isFetching && !isLoading && (
        <div className="fixed inset-0 bg-black/5 flex items-center justify-center">
          <div className="animate-spin text-2xl">⌛</div>
        </div>
      )}
    </div>
  );
}
