"use client";
import { usePublicCategories, usePublicPosts } from "@/data/public";
import Articles from "./_components/Articles";
import WelcomeHero from "./_components/WelcomeHero";
import LoadingOverlay from "@/components/ui/loading-overlay";

export default function Home() {
  const data = usePublicPosts();
  const categories = usePublicCategories();

  if (data.isLoading || categories.isLoading) {
    return (
      <LoadingOverlay isLoading={data.isLoading || categories.isLoading} />
    );
  }

  if (data.error || categories.error) {
    return "error";
  }

  if (!data.data || !categories.data) {
    return "error";
  }

  return (
    <main className="">
      <WelcomeHero />
      <Articles articles={data.data} categories={categories.data!} />
    </main>
  );
}
