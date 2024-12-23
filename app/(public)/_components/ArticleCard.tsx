import { Badge } from "@/components/ui/badge";

import { Post } from "@/type";
import { CalendarIcon, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  article: Post;
  mobile?: boolean;
};

export default function ArticleCard({ article, mobile }: Props) {
  const WideView = () => {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className="text-primary hover:underline"
      >
        <article className="rounded-lg shadow-none overflow-hidden text-xs">
          <figure className="bg-red-100 h-48">
            {article.featuredImageUrl ? (
              <Image
                src={article.featuredImageUrl}
                alt={`Cover image for ${article.title}`}
                width={300}
                height={200}
                className="w-full object-cover h-48"
                layout="responsive"
              />
            ) : (
              <div className="w-full h-48 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">
                  No image available
                </span>
              </div>
            )}
          </figure>
          <div className="p-6">
            <h2 className="text-base font-semibold mb-2">
              {article.title !== "Untitled" ? article.title : "Untitled Post"}
            </h2>
            <p className="text-muted-foreground mb-4 min-h-24 line-clamp-3 ">
              {article.excerpt ||
                article.content.replace(/<[^>]+>/g, "").slice(0, 100) + "..."}
            </p>
            <div className="flex flex-wrap gap-2 mb-4 min-h-6">
              {article.categories && article.categories.length > 0 && (
                <>
                  {article.categories.map((category) => (
                    <Badge key={category.slug} variant="outline">
                      <p className="text-xs">{category.name}</p>
                    </Badge>
                  ))}
                </>
              )}
              {article.tags && article.tags.length > 0 && (
                <>
                  {article.tags.map((tag) => (
                    <Badge key={tag.slug} variant="outline">
                      {tag.name}
                    </Badge>
                  ))}
                </>
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {new Date(article.publishedAt * 1000).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </span>
              <span className="flex items-center">
                <EyeIcon className="mr-1 h-4 w-4" />
                {article.viewCount} views
              </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              Read more
            </div>
          </div>
        </article>
      </Link>
    );
  };
  const MobileView = () => {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className="text-primary hover:underline"
      >
        {/* Calender */}
        <div className="flex items-center justify-between text-xs text-muted-foreground  border-b-2 border-primary mb-2">
          <div className="flex-col ">
            <div className="flex">
              <span className="flex items-center">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {new Date(article.publishedAt * 1000).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </span>
              <span className="mx-2">-</span>
              {article.categories && article.categories.length > 0 && (
                <>
                  {article.categories.map((category) => (
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
            <div className="text-black">
              <h2 className="text-base font-semibold m-2">
                {article.title !== "Untitled" ? article.title : "Untitled Post"}
              </h2>
              {/* Excerpt */}
              <p className="text-muted-foreground mb-4 min-h-14 line-clamp-3 ">
                {article.excerpt ||
                  article.content.replace(/<[^>]+>/g, "").slice(0, 100) + "..."}
              </p>
            </div>
          </div>
        </div>
        {/* Title */}
      </Link>
    );
  };
  return <>{mobile ? <MobileView /> : <WideView />}</>;
}
