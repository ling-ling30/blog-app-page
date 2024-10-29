"use client";
import Image from "next/image";
import Article from "./_components/Article";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { roboto } from "@/components/font";
const data = [
  {
    id: 1,
    image: "https://via.assets.so/movie.png?id=1&q=95&w=360&h=360&fit=fill",
    title: "Blog 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-01-01",
    author: "Tanya Mekanik",
    category: "Blog",
    tags: ["Blog", "Tanya Mekanik"],
  },
  {
    id: 2,
    image: "https://via.assets.so/movie.png?id=2&q=95&w=360&h=360&fit=fill",
    title: "Blog 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-01-02",
    author: "Tanya Mekanik",
    category: "Blog",
    tags: ["Blog", "Tanya Mekanik"],
  },
  {
    id: 3,
    image: "https://via.assets.so/movie.png?id=3&q=95&w=360&h=360&fit=fill",
    title: "Blog 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-01-03",
    author: "Tanya Mekanik",
    category: "Blog",
    tags: ["Blog", "Tanya Mekanik"],
  },
  {
    id: 4,
    image: "https://via.assets.so/movie.png?id=4&q=95&w=360&h=360&fit=fill",
    title: "Blog 4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-01-04",
    author: "Tanya Mekanik",
    category: "Blog",
    tags: ["Blog", "Tanya Mekanik"],
  },
  {
    id: 5,
    image: "https://via.assets.so/movie.png?id=5&q=95&w=360&h=360&fit=fill",
    title: "Blog 5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-01-05",
    author: "Tanya Mekanik",
    category: "Blog",
    tags: ["Blog", "Tanya Mekanik"],
  },
];
const categories = [
  "View All",
  "Interior",
  "Exterior",
  "Machine",
  "Maintainence",
];
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("View All");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-5 md:p-24">
      <section className="flex border-b-2 border-gray-200 pb-3 mb-10">
        {categories.map((category, index) => (
          <h2
            key={category}
            className={cn(
              "text-xs md:text-sm font-bold text-gray-600 mx-2 transition-transform duration-500",
              roboto.className,
              selectedCategory === category &&
                "text-primary pb-3 border-b-2 border-gray-600"
            )}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </h2>
        ))}
      </section>
      <article className="grid grid-col-1 md:grid-cols-2 gap-2">
        {data.map((item, index) => (
          <Article data={item} key={index} />
        ))}
      </article>
      Hello
    </main>
  );
}
