"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { roboto } from "@/components/font";
import { Category, Post } from "@/type";
import ArticleCard from "./ArticleCard";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { usePublicCategories, usePublicPosts } from "@/data/public";

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
  const categories = usePublicCategories();
  const articles = usePublicPosts(filter);

  // if (articles.isLoading || categories.isLoading) {
  //   return (
  //     <LoadingOverlay isLoading={articles.isLoading || categories.isLoading} />
  //   );
  // }

  if (articles.error || categories.error) {
    return "error";
  }

  if (!articles.data || !categories.data) {
    return (
      <LoadingOverlay isLoading={articles.isLoading || categories.isLoading} />
    );
  }

  return (
    <main className="min-h-screen flex-col justify-between px-8 py-4 space-y-6">
      {/* <div className="space-y-2">
        <h2 className="text-2xl font-medium text-black/85">Blog</h2>
        <p className="text-xs font-semibold text-black/60">
          Disini kami memberi tips dan saran tentang perwatan mobil dan juga
          solusi untuk mobil yang bermasalah
        </p>
      </div> */}
      {/* filter */}
      <section className="flex border-b-2 border-gray-200 pb-3 mb-10 transition-all duration-500 ease-in-out gap-2 overflow-auto">
        {categories.data.map((category, index) => (
          <h2
            key={category.name}
            className={cn(
              "text-xs md:text-sm font-bold text-gray-600 px-3 py-1 transition-transform duration-500 whitespace-nowrap",
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
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.data.length > 0 ? (
            articles.data.map((post) => (
              <ArticleCard key={post.id} article={post} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold mb-8">Tidak ada artikel</h1>
              <p className="text-muted-foreground">
                Tidak ada artikel yang ditemukan untuk pencarian Anda
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
