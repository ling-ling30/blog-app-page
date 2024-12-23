import React, { useState, useTransition } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { createPostSchema } from "./ArticleForm";
import { z } from "zod";
import { useCategories } from "@/data/admin";
import { toast } from "sonner";
import { Category } from "@/type";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { Loader2 } from "lucide-react";

type Props = {};

export default function CategorySelector({}: Props) {
  const form = useFormContext<z.infer<typeof createPostSchema>>();

  const [categoryQuery, setCategoryQuery] = useState<string | undefined>(
    undefined
  );

  const [isPending, startTransition] = useTransition();
  const [addButton, setAddButton] = useState<boolean>(false);
  const [appendedItemIds, setAppendedItemIds] = useState<string[]>([]);
  const { query, mutation } = useCategories();

  const handleCreateCategory = async (input: { name: string }) => {
    if (isPending) return;

    startTransition(() => {
      mutation
        .mutateAsync(input)
        .then((data) => {
          // Reset query but keep the popover open to show the new category
          setCategoryQuery("");
          setAddButton(false);
          // Force a re-render of the command list
          toast.success("Category berhasil ditambahkan!");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error: " + error.message);
        });
    });
  };

  const handleChooseCategory = async (category: Category) => {
    // if category is already appended, then remove it
    if (appendedItemIds.includes(category.id.toString())) {
      const indexToRemove = fields.findIndex((item) => {
        return item.id === category.id.toString();
      });
      remove(indexToRemove);
      setAppendedItemIds(
        appendedItemIds.filter((id) => id !== category.id.toString())
      );
    } else {
      append({
        id: category.id,
        name: category.name,
        slug: category.slug,
      });
      setAppendedItemIds([...appendedItemIds, category.id.toString()]);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categoryIds",
  });
  if (query.isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin text-primary" />;
  }

  if (query.isError) {
    return "error";
  }

  if (!query.data) {
    return "error";
  }
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="min-w-52">Kategori</FormLabel>
          <FormControl>
            <section className="">
              <div className="flex items-center gap-2">
                <div className="flex gap-2 ml-2">
                  {fields.map((field, index) => {
                    return (
                      <div
                        key={index}
                        className="px-2 py-1 rounded-md bg-gray-300 flex"
                      >
                        <label className="font-semibold">{field.name}</label>
                        <Cross1Icon
                          className="ml-2 hover:text-primary size-3"
                          onClick={() => {
                            remove(index);
                            setAppendedItemIds(
                              appendedItemIds.filter((id) => id !== field.id)
                            );
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      asChild
                      size={"sm"}
                      className="bg-blue-400 hover:bg-blue-600 text-black h-8"
                    >
                      <div>Pilih</div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" sideOffset={5}>
                    <Command
                      filter={(value, search) => {
                        if (!search) return 1;

                        const normalizedValue = value.toLowerCase();
                        const normalizedSearch = search.toLowerCase().trim();

                        // Exact match
                        if (normalizedValue === normalizedSearch) {
                          setAddButton(false);
                          return 1;
                        }

                        // Partial match
                        if (normalizedValue.includes(normalizedSearch)) {
                          setAddButton(true);
                          return 1;
                        }

                        // No match
                        setAddButton(false);
                        return 0;
                      }}
                    >
                      <CommandInput
                        value={categoryQuery}
                        onValueChange={(value) => setCategoryQuery(value)}
                        placeholder="Cari / Ketik untuk menambahkan"
                      />
                      <CommandList>
                        <CommandEmpty>
                          {categoryQuery && (
                            <button
                              disabled={isPending}
                              onClick={() => {
                                handleCreateCategory({
                                  name: categoryQuery,
                                });
                              }}
                              className="text-sm flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 shadow"
                            >
                              Tambahkan
                              <span className="font-bold mx-2">
                                {categoryQuery}
                              </span>
                            </button>
                          )}
                        </CommandEmpty>
                        <CommandList>
                          {addButton && (
                            <button
                              disabled={isPending}
                              onClick={() => {
                                if (!categoryQuery) return;

                                handleCreateCategory({
                                  name: categoryQuery,
                                });
                                setAddButton(false);
                              }}
                              className="text-sm flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 shadow"
                            >
                              Tambahkan
                              <span className="font-bold mx-2">
                                {categoryQuery}
                              </span>
                            </button>
                          )}
                          <CommandGroup>
                            {query.data.map((category) => {
                              return (
                                <CommandItem
                                  key={category.id}
                                  onSelect={() => {
                                    handleChooseCategory(category);
                                  }}
                                >
                                  {category.name}
                                  {appendedItemIds.includes(
                                    category.id.toString()
                                  )}
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </section>
          </FormControl>
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
