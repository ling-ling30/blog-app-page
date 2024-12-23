"use client";

export const runtime = "edge"; // 'nodejs' (default) | 'edge'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main className="min-h-screen flex flex-col relative">
          <Header />
          <main className="pt-16 font-sans">{children}</main>
          <div className="bottom-0 absolute w-full">
            <Footer />
          </div>
        </main>
      </QueryClientProvider>
    </>
  );
}
