"use client";
import React from "react";
import { useFeaturedPosts } from "@/data/public";
import { CalendarIcon, EyeIcon } from "lucide-react";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function WelcomeHero() {
  const { data: featuredPosts, isLoading } = useFeaturedPosts();

  if (isLoading) {
    return <LoadingOverlay isLoading={isLoading} />;
  }

  if (!featuredPosts?.length) return null;
  return (
    <Carousel className="w-full relative">
      <CarouselContent>
        {featuredPosts.map((post) => (
          <CarouselItem key={post.slug}>
            <div
              className="relative h-[500px] w-full rounded-lg overflow-hidden"
              style={{
                backgroundImage: `url(${post.featuredImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                {/* Categories and Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories?.map((category) => (
                    <Badge
                      key={category.slug}
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      {category.name}
                    </Badge>
                  ))}
                  {post.tags?.map((tag) => (
                    <Badge
                      key={tag.slug}
                      variant="outline"
                      className="border-white/20 text-white"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  {post.title !== "Untitled" ? post.title : "Untitled Post"}
                </h2>

                {/* Excerpt */}
                <p className="text-sm md:text-base text-gray-200 mb-4 line-clamp-2">
                  {post.excerpt ||
                    post.content.replace(/<[^>]+>/g, "").slice(0, 150) + "..."}
                </p>

                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {new Date(post.publishedAt * 1000).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                  <span className="flex items-center gap-1">
                    <EyeIcon className="h-4 w-4" />
                    {post.viewCount} views
                  </span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
