"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextEditor } from "./TextEditor";
import { Textarea } from "@/components/ui/textarea";
import { SingleImageUploader } from "@/components/SingleImageUploader";

export const createPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1, "Content cannot be empty"),
  excerpt: z.string().max(255).optional(),
  featuredImageUrl: z.string().url().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  categoryIds: z.array(z.number()).optional(),
  tagIds: z.array(z.number()).optional(),
});

type Props = {};

function ArticleForm({}: Props) {
  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = (data: z.infer<typeof createPostSchema>) => {
    console.log(data);
  };

  async function handlePhotoRemove() {
    form.setValue("featuredImageUrl", undefined);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul</FormLabel>
                <FormControl>
                  <Input placeholder="Judul Artikel" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konten</FormLabel>
                <FormControl>
                  <TextEditor
                    value={form.getValues("content")}
                    onChangeFn={(value: any) => {
                      console.log(value);
                      form.setValue("content", value);
                    }}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tulis rangkuman" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featuredImageUrl"
            render={({ field }) => (
              <FormItem className="border rounded-md p-4 mb-4 mt-4 shadow-md">
                <FormLabel>Foto artikel</FormLabel>
                <FormControl>
                  <SingleImageUploader
                    {...field}
                    className="w-[230px] sm:w-[450px] h-auto bg-white"
                    value={
                      typeof field.value === "string"
                        ? `https://devcdn.outfits.id/${field.value}`
                        : typeof field.value === "object"
                        ? field.value
                        : null
                    }
                    onRemove={handlePhotoRemove}
                  />
                </FormControl>

                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div onClick={() => console.log(form.getValues())}>Log values</div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default ArticleForm;
