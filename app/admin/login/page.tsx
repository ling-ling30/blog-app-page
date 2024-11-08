"use client";
import React, { useState, useTransition } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FormError from "@/components/form/form-error";
import { login } from "@/actions/login";

type Props = {};

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const LoginForm = (props: Props) => {
  const searchParams = useSearchParams();
  const [isPending, startTransasition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError(undefined);
    startTransasition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  }

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-[250px] sm:w-[450px] md:w-[500px] lg:w-[600px]"
                  placeholder="Please enter your email/username"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  name={`prevent-autofill-${Math.random()}`}
                  onFocus={(e) => e.target.setAttribute("autocomplete", "off")}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Please enter your password"
                  {...field}
                  autoComplete="new-password"
                  name={`prevent-autofill-${Math.random()}`}
                  onFocus={(e) =>
                    e.target.setAttribute("autocomplete", "new-password")
                  }
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormError message={error} />}
        <Button disabled={isPending} size={"sm"} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
