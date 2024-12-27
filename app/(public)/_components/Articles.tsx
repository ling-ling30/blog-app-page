"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { roboto } from "@/components/font";
import { Category, Post } from "@/type";
import ArticleCard from "./ArticleCard";
import LoadingOverlay from "@/components/ui/loading-overlay";
import {
  useInfinitePosts,
  usePublicCategories,
  usePublicPosts,
} from "@/data/public";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

type Filter = {
  title: string;
  category: string;
  tag: string;
  limit: number;
  offset: number;
};
export default function Articles({}: Props) {
  const [filter, setFilter] = useState<Filter>({
    title: "",
    category: "",
    tag: "",
    limit: 10,
    offset: 0,
  });
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
    error,
  } = useInfinitePosts(filter);

  // Access all posts across all pages
  const allPosts = data?.pages.flat() || [];
  const categories = usePublicCategories();
  // const articles = usePublicPosts(filter);
  const matches = useMediaQuery("(min-width: 641px)");
  if (error || categories.error) {
    return "error";
  }

  return (
    <main className="flex-col justify-between px-3 py-4 space-y-6">
      {/* filter */}
      <section className="flex border-b-2 border-gray-200 pb-3 mb-10 transition-all duration-500 ease-in-out gap-2 lg:gap-5 overflow-auto justify-center">
        {categories.isLoading && <Skeleton className="w-full h-10" />}

        {categories.data?.map((category, index) => (
          <h2
            key={category.name}
            className={cn(
              "text-xs md:text-sm cursor-pointer font-bold text-gray-600 px-3 py-1 transition-transform duration-500 whitespace-nowrap",
              roboto.className,
              filter.category === category.id.toString() &&
                "text-white/80 bg-primary rounded-sm"
            )}
            onClick={() => {
              if (filter.category === category.id.toString()) {
                setFilter((prev) => ({
                  ...prev,
                  category: "",
                }));
              } else {
                setFilter((prev) => ({
                  ...prev,
                  category: category.id.toString(),
                }));
              }
            }}
          >
            {category.name}
          </h2>
        ))}
      </section>

      {isLoading && (
        <div className="w-full items-center justify-center flex">
          <Skeleton className="h-10 w-10 animate-spin bg-slate-600" />
        </div>
      )}

      {!isLoading && allPosts.length === 0 && (
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-8">Tidak ada artikel</h1>
          <p className="text-muted-foreground">
            Tidak ada artikel yang ditemukan untuk pencarian Anda
          </p>
        </div>
      )}

      <div className="mx-auto px-4 py-8 xl:px-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allPosts.length > 0 &&
            allPosts.map((post) => (
              <ArticleCard key={post.id} article={post} mobile={!matches} />
            ))}
        </div>
        {hasNextPage && (
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </main>
  );
}
