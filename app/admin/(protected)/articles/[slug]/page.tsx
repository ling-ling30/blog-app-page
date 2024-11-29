"use client";
import React from "react";
import ArticleForm from "./_components/ArticleForm";
import { useFetchPostBySlug } from "@/data/admin";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { Loader2 } from "lucide-react";

type Props = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: Props) {
  const post = useFetchPostBySlug(params.slug);
  if (post.isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin text-primary" />;
  }
  if (post.error) {
    <ArticleForm article={null} />;
  }
  if (!post.data) {
    <ArticleForm article={null} />;
  }
  return (
    <main className="py-5 px-5 max-w-2xl mx-auto">
      <ArticleForm article={post.data!} />
    </main>
  );
}
