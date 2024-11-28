import { Card } from "@/components/ui/card";
import { Post } from "@/type";
import React, { useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, EyeIcon, TagIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDeletePost } from "@/data/admin";
import { toast } from "sonner";
type Props = {
  article: Post;
};

export default function Article({ article }: Props) {
  const deletePost = useDeletePost(article.slug);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    console.log("delete", article.id);
    startTransition(() => {
      deletePost
        .mutateAsync(article.id)
        .then((data) => {
          toast.success("Article berhasil dihapus!");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error: " + error.message);
        });
    });
  };
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      {article.featuredImageUrl ? (
        <img
          src={article.featuredImageUrl}
          alt={`Cover image for ${article.title}`}
          width={300}
          height={200}
          className="w-full object-cover h-48"
        />
      ) : (
        <div className="w-full h-48 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground">No image available</span>
        </div>
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          {article.title !== "Untitled" ? article.title : "Untitled Post"}
        </h2>
        <p className="text-muted-foreground mb-4">
          {article.excerpt ||
            article.content.replace(/<[^>]+>/g, "").slice(0, 100) + "..."}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {article.categories && article.categories.length > 0 && (
            <>
              {article.categories.map((category) => (
                <Badge key={category.slug} variant="outline">
                  {category.name}
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
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center">
            <CalendarIcon className="mr-1 h-4 w-4" />
            {new Date(article.createdAt * 1000).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center">
            <EyeIcon className="mr-1 h-4 w-4" />
            {article.viewCount} views
          </span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Link
            href={`/admin/articles/${article.slug}`}
            className="text-primary hover:underline"
          >
            Read more
          </Link>
          <Badge
            variant={article.status === "PUBLISHED" ? "default" : "secondary"}
          >
            {article.status}
          </Badge>
          <Button
            onClick={handleDelete}
            variant="outline"
            size="sm"
            disabled={isPending}
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
