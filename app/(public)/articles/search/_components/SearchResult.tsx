import React from "react";

import { SearchResultCard } from "./SearchResultCard";
import { Post } from "@/type";

type SearchResultsProps = {
  posts: Post[];
};
export function SearchResults({ posts }: SearchResultsProps) {
  return (
    <section className="space-y-2">
      {posts.map((post) => (
        <SearchResultCard key={post.id} post={post} />
      ))}
    </section>
  );
}
