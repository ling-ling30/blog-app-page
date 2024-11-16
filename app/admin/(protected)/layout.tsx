"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { AppSidebar } from "./_components/Sidebar";

type Props = {
  children: React.ReactNode;
};
const queryClient = new QueryClient();

export default function Layout({ children }: Props) {
  return (
    <SidebarProvider>
      <QueryClientProvider client={queryClient}>
        <AppSidebar />
        <>
          <SidebarTrigger />
          {children}
        </>
      </QueryClientProvider>
    </SidebarProvider>
  );
}
