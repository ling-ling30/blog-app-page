import Image from "next/image";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import { Post } from "@/type";

type Props = {
  data: Post;
};
export default function Component({ data }: Props) {
  const { title, slug, categories, tags, content, featuredImageUrl } = data;
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
          <div className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4" />
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
          </div>
          <div className="flex items-center">
            <ClockIcon className="mr-2 h-4 w-4" />
          </div>
        </div>
      </header>
      <div className="mb-8">
        <Image
          src={featuredImageUrl}
          alt="Cover image for blog post"
          width={800}
          height={400}
          className="rounded-lg object-cover w-full"
        />
      </div>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>{content}</p>
      </div>
    </article>
  );
}
