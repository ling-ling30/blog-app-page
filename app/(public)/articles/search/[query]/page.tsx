"use client";
import { usePublicPosts } from "@/data/public";
import { SearchEmpty } from "../_components/SearchEmpty";
import { SearchHeader } from "../_components/SearchHeader";
import { SearchLoading } from "../_components/SearchLoading";
import { SearchResults } from "../_components/SearchResult";

type SearchPageProps = {
  params: {
    query: string;
  };
};

export default function SearchPage({ params }: SearchPageProps) {
  const searchQuery = decodeURIComponent(params.query).replaceAll("-", " ");

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = usePublicPosts({ title: searchQuery });

  if (isLoading) {
    return <SearchLoading />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <SearchHeader query={searchQuery} resultCount={posts?.length ?? 0} />
      {posts && posts.length > 0 ? (
        <SearchResults posts={posts} />
      ) : (
        <SearchEmpty query={searchQuery} />
      )}
    </main>
  );
}
