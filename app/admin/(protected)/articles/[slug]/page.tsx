"use client";
import React from "react";
import ArticleForm from "./_components/ArticleForm";
import { useFetchPostBySlug } from "@/data/admin";

type Props = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: Props) {
  const post = useFetchPostBySlug(params.slug);
  if (post.isLoading) {
    return "loading";
  }
  if (post.error) {
    <ArticleForm article={null} />;
  }
  return (
    <>
      <ArticleForm article={post.data!} />
    </>
  );
}
