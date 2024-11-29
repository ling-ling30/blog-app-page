"use client";
import Image from "next/image";
import Article from "./Article";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { roboto } from "@/components/font";
import { Category, Post } from "@/type";
import ArticleCard from "./ArticleCard";

type Props = {
  articles: Post[];
  categories: Category[];
};

type Filter = {
  q: string;
  sort_by: string;
  page: number;
  category: string;
  tag: string;
};
export default function Articles({ articles, categories }: Props) {
  const [filter, setFilter] = useState<Filter>({
    q: "",
    sort_by: "publish_date",
    page: 1,
    category: "View All",
    tag: "",
  });
  return (
    <main className="min-h-screen flex-col justify-between px-8 py-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium text-black/85">Blog</h2>
        <p className="text-xs font-semibold text-black/60">
          Disini kami memberi tips dan saran tentang perwatan mobil dan juga
          solusi untuk mobil yang bermasalah
        </p>
      </div>
      {/* filter */}
      <section className="flex border-b-2 border-gray-200 pb-3 mb-10 transition-all duration-500 ease-in-out gap-2 overflow-auto">
        {categories.map((category, index) => (
          <h2
            key={category.name}
            className={cn(
              "text-xs md:text-sm font-bold text-gray-600 px-3 py-1 transition-transform duration-500 whitespace-nowrap",
              roboto.className,
              filter.category === category.id.toString() &&
                "text-white/80 bg-primary rounded-sm"
            )}
            onClick={() =>
              setFilter((prev) => ({
                ...prev,
                category: category.id.toString(),
              }))
            }
          >
            {category.name}
          </h2>
        ))}
      </section>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.length > 0 ? (
            articles.map((post) => <ArticleCard key={post.id} article={post} />)
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
