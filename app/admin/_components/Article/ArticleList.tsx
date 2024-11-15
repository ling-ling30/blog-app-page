// components/ArticleList.tsx
"use client";

import { usePublicPosts } from "@/data/admin/articles";
import type { Post } from "@/type";

export default function ArticleList() {
  const {
    data: posts,
    isLoading,
    error,
  } = usePublicPosts({
    limit: 10,
    offset: 0,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      {posts?.map((post: Post) => (
        <article key={post.id} className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600 mt-2">{post.excerpt}</p>
          {post.featuredImageUrl && (
            <img
              src={post.featuredImageUrl}
              alt={post.title}
              className="mt-4 rounded-md w-full h-48 object-cover"
            />
          )}
          <div className="mt-4 text-sm text-gray-500">
            <span>Views: {post.viewCount}</span>
            <span className="mx-2">•</span>
            <span>
              Published: {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="mt-2 space-x-2">
            {post.categories.split(",").map((category) => (
              <span
                key={category}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                {category.trim()}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
