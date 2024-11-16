import * as jose from "jose";
require("dotenv").config();
export const jwtSecret = process.env.JWT_SECRET as any;

export async function generateJWT(obj: any) {
  const secret = new TextEncoder().encode("JWT_SECRET");
  const alg = "HS256";
  // Step 1: Encode the JWT with a secret key
  const jwt = await new jose.SignJWT(obj)
    .setProtectedHeader({ alg })
    .setExpirationTime("5m")
    .sign(secret);

  return jwt;
}
