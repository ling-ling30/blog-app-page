// "use client";
import { usePublicPostBySlug } from "@/data/public";
import Article from "../../_components/Article";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { Post } from "@/type";
import { QueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

export const revalidate = 60;
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const res: Post[] = await fetcher(`/public/posts`);
  const posts = res;
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Component({ params }: Props) {
  const slug = (await params).slug;
  const post: Post = await fetcher(`/public/posts/${slug}`);
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Article article={post} />
    </article>
  );
}
