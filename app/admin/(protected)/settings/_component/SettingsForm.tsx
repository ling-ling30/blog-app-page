import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Settings, useUpdateSettings } from "@/data/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  data: Settings;
};

export default function SettingsForm({ data }: Props) {
  const schema = z.object({
    about: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
    email: z.string().min(1).optional(),
    phone_number: z.string().min(1).optional(),
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      about: data.find((item) => item.id === "about")?.value,
      address: data.find((item) => item.id === "address")?.value,
      email: data.find((item) => item.id === "email")?.value,
      phone_number: data.find((item) => item.id === "phone_number")?.value,
    },
  });

  const dict = {
    about: "About",
    address: "Address",
    email: "Email",
    phone_number: "Phone Number",
  };

  const { mutateAsync } = useUpdateSettings();
  const handleSubmit = async (data: z.infer<typeof schema>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    startTransition(() => {
      toast.loading("Saving settings...");
      const res = mutateAsync(data)
        .then((res) => {
          toast.dismiss();
          toast.success("Settings saved!");
          return res;
        })
        .catch((error) => {
          toast.dismiss();
          toast.error("Failed to save settings");
          return error;
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    });
  };

  return (
    <div className="w-full py-5">
      <h1 className="font-bold text-center text-2xl">Settings</h1>
      <Form {...form}>
        <form
          className="items-center justify-center flex flex-col gap-4 p-4 text-xs md:text-sm w-full"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex flex-col gap-4 w-full max-w-2xl pt-2">
            {data.map((item, index) => {
              const name = item.id;
              return (
                <div
                  key={item.id + "-" + index}
                  className="flex justify-between items-center"
                >
                  <label htmlFor={item.id} className="font-semibold ">
                    {dict[item.id]}
                  </label>
                  <FormField
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          {item.id === "about" ? (
                            <Textarea
                              {...field}
                              className="text-xs md:text-sm"
                            />
                          ) : (
                            <Input {...field} className="text-xs md:text-sm" />
                          )}
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              );
            })}
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className=" w-full max-w-2xl"
          >
            Simpan
          </Button>
        </form>
      </Form>
    </div>
  );
}
