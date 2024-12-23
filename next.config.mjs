import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.tanyamekanik.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: 'via.assets.so"',
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: 'placecats.com"',
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "pub-4a63f2a777414973af0945f89596da80.r2.dev",
        port: "",
        pathname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
