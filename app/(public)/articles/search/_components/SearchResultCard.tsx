import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Post } from "@/type";
import { Calendar } from "lucide-react";
import Image from "next/image";

type SearchResultCardProps = {
  post: Post;
};

export function SearchResultCard({ post }: SearchResultCardProps) {
  const formattedDate = new Date(post.publishedAt * 1000).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <Card className="rounded-sm shadow-none hover:bg-gray-50 transition-colors">
      <CardHeader className="p-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center min-w-max">
            <Calendar className="mr-1 h-4 w-4" />
            {formattedDate}
          </span>
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.categories.map((category) => (
                <Badge
                  key={category.slug}
                  variant="outline"
                  className="text-xs"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-2 flex justify-between items-center ">
        <div className="font-medium text-black hover:text-primary transition-colors line-clamp-3">
          {post.title}
        </div>
        <figure className="hidden bg-gray-100 aspect-video sm:flex w-[10rem] sm:w-[15rem]  justify-center items-center">
          <Image
            src={post.featuredImageUrl}
            alt="First blog post cover image"
            width={700}
            height={300}
            className="rounded-lg object-cover"
          />
        </figure>
      </CardContent>
    </Card>
  );
}
