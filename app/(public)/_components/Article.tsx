import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

type Props = {
  data: {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
  };
};

export default function Article({ data }: Props) {
  return (
    <Card className="max-w-sm">
      <Image
        src={data.image}
        alt={data.title}
        width={1000}
        height={1000}
        className="rounded-md object-fill"
      />
      <div className="flex flex-col justify-between gap-y-2 p-2 md:p-4">
        <div className="flex items-center gap-x-2">
          <span className="text-xs font-medium text-muted-foreground">
            {data.date}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {data.author}
          </span>
        </div>
      </div>
      <CardHeader className="w-full p-2 md:p-6">
        <h2 className="text-xl font-bold">{data.title}</h2>
      </CardHeader>
      <CardContent className="p-2 md:p-6 text-xs md:text-sm">
        <p className="text-muted-foreground">{data.description}</p>
      </CardContent>
      <CardFooter className="p-2 md:p-6 text-xs md:text-sm">
        <div className="flex items-center gap-x-2">
          <span className="font-medium text-muted-foreground">
            {data.category}
          </span>
          <span className="font-medium text-muted-foreground">
            {data.tags.join(", ")}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
