import { Card } from "@/components/ui/card";
import { Post, PreviewPost } from "@/type";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, EyeIcon, TagIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HtmlRenderer } from "@/components/RenderHTMLString";
type Props = {
  article?: Post;
  preview?: PreviewPost;
};

export default function Article({ article, preview }: Props) {
  const Article = () => {
    if (!article) return;
    return (
      <article className="max-w-2xl mx-auto px-4 py-8 text-black">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
          <div className="flex justify-center items-center text-sm text-muted-foreground gap-4">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <time dateTime="2023-11-18">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </header>
        {article.featuredImageUrl ? (
          <img
            src={article.featuredImageUrl}
            alt="First blog post cover image"
            width={700}
            height={300}
            className="rounded-lg object-cover w-full mb-8"
          />
        ) : null}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <HtmlRenderer htmlString={article.content || ""} />
        </div>
      </article>
    );
  };
  const Preview = () => {
    if (!preview) return;
    let imageUrl;
    if (preview.featuredImageUrl) {
      if (typeof preview.featuredImageUrl === "string") {
        imageUrl = preview.featuredImageUrl;
      } else if (preview.featuredImageUrl instanceof File) {
        imageUrl = URL.createObjectURL(preview.featuredImageUrl);
      }
    }
    return (
      <article className="max-w-2xl mx-auto px-4 py-8 text-black">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">{preview.title}</h1>
          <div className="flex justify-center items-center text-sm text-muted-foreground gap-4">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <time dateTime="2023-11-18">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </header>
        {/* handle featuredImage if it is a string, file or null */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Cover image for blog post"
            width={800}
            height={400}
            className="rounded-lg object-cover w-full"
          />
        ) : null}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <HtmlRenderer htmlString={preview.content || ""} />
        </div>
      </article>
    );
  };
  return <>{preview ? <Preview /> : <Article />}</>;
}
