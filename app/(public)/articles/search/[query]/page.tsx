"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { usePublicPosts } from "@/data/public";
import { Calendar, Loader2Icon } from "lucide-react";
import React from "react";

type Props = {
  params: {
    query: string;
  };
};

export default function Page({ params }: Props) {
  const querySlug = params.query;
  const title = querySlug.replaceAll("-", " ");
  const { data: posts, isLoading } = usePublicPosts({ title });

  if (isLoading) {
    return (
      <main className="w-full flex items-center justify-center">
        <Loader2Icon className="h-10 w-10 animate-spin text-primary text-center" />
      </main>
    );
  }
  return (
    <main>
      <p className="font-semibold text-sm py-2">
        Hasil untuk pencarian: {title}
      </p>
      <section className="space-y-2">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} className="rounded-sm shadow-none">
              <CardHeader className="p-2">
                <div className="flex">
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(post.publishedAt * 1000).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                  <span className="mx-2">-</span>
                  {post.categories && post.categories.length > 0 && (
                    <>
                      {post.categories.map((category) => (
                        <Badge
                          key={category.slug}
                          variant="outline"
                          className="mx-1"
                        >
                          <p className="text-xs">{category.name}</p>
                        </Badge>
                      ))}
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="px-2">
                <h2 className="font-medium text-black">{post.title}</h2>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>Tidak ada artikel yang ditemukan</div>
        )}
      </section>
    </main>
  );
}
