"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useState, useTransition } from "react";
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
import TextEditor from "./TextEditor";
import { Textarea } from "@/components/ui/textarea";
import { SingleImageUploader } from "@/components/SingleImageUploader";
import { useCreatePost, useUpdatePost } from "@/data/admin";
import Image from "next/image";
import TagSelector from "./TagSelector";
import CategorySelector from "./CategorySelector";
import { toast } from "sonner";
import { Post } from "@/type";
import { UploadFileAndReplaceWithName } from "@/utils/findAndUploadFile";
import { useRouter } from "next/navigation";
import { InputPreview } from "./Preview";

export const createPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(255),
  content: z.string().min(1, "Content cannot be empty"),
  excerpt: z.string().max(255).optional(),
  featuredImageUrl: z.any().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  categoryIds: z
    .array(z.object({ id: z.number(), name: z.string(), slug: z.string() }))
    .optional(),
  tagIds: z
    .array(z.object({ id: z.number(), name: z.string(), slug: z.string() }))
    .optional(),
});

type Props = {
  article: Post | null;
};

function ArticleForm({ article }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const create = useCreatePost();
  const update = useUpdatePost();

  const [openPreview, setOpenPreview] = useState<boolean>(false);

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: article
      ? {
          id: article.id,
          title: article.title,
          status: article.status,
          tagIds: article.tags,
          categoryIds: article.categories,
          content: article.content,
        }
      : {
          title: "Untitled",
          status: "DRAFT",
          tagIds: [],
          categoryIds: [],
        },
  });

  const onSubmit = async (input: z.infer<typeof createPostSchema>) => {
    const finalInput = await UploadFileAndReplaceWithName(input);
    startTransition(() => {
      if (finalInput.id) {
        update
          .mutateAsync(finalInput)
          .then((data) => {
            toast.success("Article berhasil Disimpan!");
            const slug = data.data.slug;
            router.push(`/admin/articles/${slug}`);
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error: " + error.message);
          });
      } else {
        create
          .mutateAsync(finalInput)
          .then((data) => {
            toast.success("Article berhasil Disimpan!");
            const slug = data.data.slug;
            router.push(`/admin/articles/${slug}`);
          })

          .catch((error) => {
            console.error(error);
            toast.error("Error: " + error.message);
          });
      }
    });
  };

  async function handlePhotoRemove() {
    form.setValue("featuredImageUrl", undefined);
  }

  async function handlePublish() {
    const finalInput = await UploadFileAndReplaceWithName(form.getValues());

    startTransition(() => {
      if (finalInput.id) {
        update
          .mutateAsync(finalInput)
          .then((data) => {
            toast.success("Article berhasil Disimpan!");
            const slug = data.data.slug;
            router.push(`/admin/articles/${slug}`);
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error: " + error.message);
          });
      } else {
        create
          .mutateAsync(finalInput)
          .then((data) => {
            toast.success("Article berhasil Disimpan!");
            const slug = data.data.slug;
            router.push(`/admin/articles/${slug}`);
          })

          .catch((error) => {
            console.error(error);
            toast.error("Error: " + error.message);
          });
      }
    });
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

          {/* Category */}
          <CategorySelector />

          {/* Tags */}
          <TagSelector />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konten</FormLabel>
                <FormControl>
                  <TextEditor
                    value={form.getValues("content")}
                    onChange={(value: any) => {
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

          <div className="flex justify-end">
            <Button disabled={isPending} type="submit">
              Simpan
            </Button>
            <InputPreview
              onSubmit={handlePublish}
              openPreview={openPreview}
              setOpenPreview={setOpenPreview}
            />
            {article?.status === "PUBLISHED" && (
              <Button disabled={isPending} type="submit">
                Update
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}

export default ArticleForm;
