"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { error } from "console";
import { AuthError } from "next-auth";
import * as z from "zod";

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { username, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid credentials!" };
        }
        case "AccessDenied": {
          return { error: error.cause?.err?.message || "Access Denied" };
        }
        case "CallbackRouteError": {
          return { error: error.cause?.err?.message || "Callback Error" };
        }
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const verifyUser = async (username: string, password: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (data.status !== 200) {
      return false;
    }
    const json = await data.json();
    return json;
  } catch (error) {
    return false;
  }
};
