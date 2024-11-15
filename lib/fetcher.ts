import { getSession } from "next-auth/react";
import { generateJWT } from "@/lib/jwt";

export const api_url = process.env.NEXT_PUBLIC_API_URL;

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;
let tokenPromise: Promise<string> | null = null;

const getToken = async (): Promise<string> => {
  const now = Date.now();
  const bufferTime = 30000; // 30 seconds before expiration

  if (tokenCache && now < tokenCache.expiresAt - bufferTime) {
    return tokenCache.token;
  }

  if (tokenPromise) {
    return tokenPromise;
  }

  tokenPromise = (async () => {
    try {
      const session = await getSession();
      console.log(session);
      const token = await generateJWT(session);

      tokenCache = {
        token,
        expiresAt: now + 5 * 60 * 1000, // 5 minutes in milliseconds
      };

      return token;
    } catch (error) {
      console.error("Failed to generate token:", error);
      throw error;
    } finally {
      tokenPromise = null;
    }
  })();

  return tokenPromise;
};

const handleRequest = async (
  request: () => Promise<Response>,
  maxRetries = 3
) => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await request();

      if (response.status === 401) {
        const retryResponse = await request();

        // Return the response after retrying the original request
        return retryResponse;
      }

      return response;
    } catch (error) {
      console.error(
        `An error occurred during the request (retry ${retries}):`,
        error
      );
      retries += 1;
    }
  }

  throw new Error(`Request failed after ${maxRetries} retries`);
};

export const fetcher = async (url: string, cache?: boolean) => {
  try {
    const token = await getToken();
    const request = () =>
      fetch(`${api_url}${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
        },
        cache: cache ? "force-cache" : "no-store",
        credentials: "include",
        next: { revalidate: 10 },
      });

    return await handleRequest(request);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const poster = async <T>(
  url: string,
  payload?: unknown,
  credentials = true
) => {
  try {
    const token = await getToken();
    const request = () =>
      fetch(`${api_url}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
        },
        cache: "no-store",
        body: JSON.stringify(payload),
        credentials: credentials ? "include" : "omit",
      });

    return await handleRequest(request);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploader = async <T>(url: string, payload?: any) => {
  try {
    const token = await getToken();

    const formData = new FormData();
    formData.append("file", payload);
    const request = () =>
      fetch(`${api_url}${url}`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
        },
        body: formData,
        credentials: "include",
      });
    return await handleRequest(request);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const putter = async (url: string, payload?: unknown) => {
  try {
    const token = await getToken();

    const request = () =>
      fetch(`${api_url}${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
        },
        cache: "no-store",
        body: JSON.stringify(payload),
        credentials: "include",
      });
    return await handleRequest(request);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patcher = async (url: string, payload?: unknown) => {
  try {
    const token = await getToken();

    const request = () =>
      fetch(`${api_url}${url}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
        },
        cache: "no-store",
        body: JSON.stringify(payload),
        credentials: "include",
      });
    return await handleRequest(request);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleter = async (url: string, payload?: unknown) => {
  try {
    const token = await getToken();
    const request = () =>
      fetch(`${api_url}${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
        },
        cache: "no-store",
        body: JSON.stringify(payload),
        credentials: "include",
      });
    return await handleRequest(request);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
