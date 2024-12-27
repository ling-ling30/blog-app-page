"use client";

export const runtime = "edge"; // 'nodejs' (default) | 'edge'

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import WhatsAppOverlay from "./_components/WhatsAppOverlay";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <main className="min-h-screen flex flex-col relative">
            <WhatsAppOverlay />
            <Header />
            <main className="font-sans">{children}</main>
            <div className="bottom-0 absolute w-full">
              <Footer />
            </div>
          </main>
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
