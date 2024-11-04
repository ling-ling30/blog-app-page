import * as jose from "jose";
require("dotenv").config();
export const jwtSecret = process.env.JWT_SECRET as any;
const secret = new TextEncoder().encode(jwtSecret);

export async function generateJWT(obj: any) {
  // Step 1: Serialize the object to JSON
  const jsonPayload = JSON.stringify(obj);
  // Step 2: Create JWT payload (claims)
  const payload = {
    data: jsonPayload,
    // Additional claims if needed, e.g., expiration time ('exp')
  };
  // Step 3: Encode the JWT with a secret key
  const jwt = await new jose.SignJWT(obj)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("5m")
    .sign(secret);

  return jwt;
}
