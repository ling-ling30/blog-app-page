"use client";
import { usePublicPostBySlug } from "@/data/public";
import Article from "../../_components/Article";
import LoadingOverlay from "@/components/ui/loading-overlay";

type Props = {
  params: {
    slug: string;
  };
};

export default function Component({ params: { slug } }: Props) {
  const article = usePublicPostBySlug(slug);
  if (article.isLoading) {
    return <LoadingOverlay isLoading={article.isLoading} />;
  }

  if (article.isError) {
    return <div>Error</div>;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Article article={article.data} />
    </article>
  );
}
