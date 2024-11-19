import * as jose from "jose";
export const runtime = "edge"; // 'nodejs' (default) | 'edge'

export async function generateJWT(obj: any) {
  const secret = new TextEncoder().encode("JWT_SECRET");
  // Step 1: Encode the JWT with a secret key
  const jwt = await new jose.SignJWT(obj)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime("5m")
    .sign(secret);

  return jwt;
}
