"use client";

export const runtime = "edge"; // 'nodejs' (default) | 'edge'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./_components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        {children}
      </QueryClientProvider>
    </>
  );
}
