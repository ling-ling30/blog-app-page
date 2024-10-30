"use client";
import Image from "next/image";
import Article from "./Article";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { roboto } from "@/components/font";

type Props = {
  articles: {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
  }[];
  categories: string[];
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
    category: "",
    tag: "",
  });
  return (
    <main className="flex min-h-screen flex-col space-y-8 justify-between px-8 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium text-black/85">Blog</h2>
        <p className="text-xs font-semibold text-black/60">
          Disini kami memberi tips dan saran tentang perwatan mobil dan juga
          solusi untuk mobil yang bermasalah
        </p>
      </div>
      {/* filter */}
      <section className="flex border-b-2 border-gray-200 pb-3 mb-10 transition-all duration-500 ease-in-out">
        {categories.map((category, index) => (
          <h2
            key={category}
            className={cn(
              "text-xs md:text-sm font-bold text-gray-600 mx-2 px-3 py-1 transition-transform duration-500",
              roboto.className,
              filter.category === category &&
                "text-white/80 bg-primary rounded-sm"
            )}
            onClick={() =>
              setFilter((prev) => ({ ...prev, category: category }))
            }
          >
            {category}
          </h2>
        ))}
      </section>
      <article className="grid grid-col-1 md:grid-cols-4 gap-2">
        {articles.map((article, index) => (
          <Article data={article} key={index} />
        ))}
      </article>
    </main>
  );
}
