import { getSession } from "next-auth/react";
import { generateJWT } from "./jwt";

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;
let tokenPromise: Promise<string> | null = null;

export const getToken = async (): Promise<string> => {
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
      console.log(session, "session");
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
