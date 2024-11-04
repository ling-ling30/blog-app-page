import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { noto_sans } from "@/components/font";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Tanya Mekanik",
  description: "Solusi untuk masalah automotive anda.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={cn(noto_sans.className)}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
