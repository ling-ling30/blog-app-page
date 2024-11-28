import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import Article from "@/app/(public)/_components/Article";
import { createPostSchema } from "./ArticleForm";

type Props = {
  onSubmit: () => void;
  openPreview: boolean;
  setOpenPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

export function InputPreview({ onSubmit, openPreview, setOpenPreview }: Props) {
  const form = useFormContext<z.infer<typeof createPostSchema>>();
  const {
    control,
    trigger,
    formState: { errors },
  } = form;

  // Watch for changes in form fields
  const formData = useWatch({
    control,
  });

  const Preview = () => {
    return (
      <section>
        <Article preview={formData} />
      </section>
    );
  };
  const handlePreviewClick = async () => {
    const result = await trigger();
    if (!result) {
      const { errors } = form.formState;
      console.log("Form errors:", errors);
      // You can now check which specific fields have errors
      Object.keys(errors).forEach((fieldName: any) => {
        console.log(`Field ${fieldName} has error:`, errors);
      });
      toast.error("Mohon isi semua kolom yang ada");
    } else {
      setOpenPreview(true);
    }
  };
  return (
    <AlertDialog open={openPreview}>
      <AlertDialogTrigger asChild>
        <Button className="" onClick={handlePreviewClick}>
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" max-w-screen-2xl max-h-[90vh] overflow-auto">
        <AlertDialogHeader>
          {/* <AlertDialogTitle>Preview</AlertDialogTitle> */}
        </AlertDialogHeader>
        <AlertDialogDescription className="text-base space-y-1">
          <Preview />
        </AlertDialogDescription>
        <AlertDialogFooter className=" ">
          <AlertDialogCancel onClick={() => setOpenPreview(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              onSubmit();
              setOpenPreview(false);
            }}
          >
            Simpan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
