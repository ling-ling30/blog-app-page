"use client";
import { usePublicPostBySlug } from "@/data/public";
import Article from "../../_components/Article";
import { SearchLoading } from "../search/_components/SearchLoading";
import ArticleNotFound from "@/components/not-found/ArticleNotFound";

type Props = {
  params: {
    slug: string;
  };
};

export default function Component({ params }: Props) {
  const slug = params.slug;
  const { data: post, isLoading, isError, error } = usePublicPostBySlug(slug);

  if (isLoading) {
    return <SearchLoading />;
  }
  if (isError) {
    return <ArticleNotFound />;
  }
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Article article={post} />
    </article>
  );
}
