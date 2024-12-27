import { QueryClient } from "@tanstack/react-query";
import Articles from "./_components/Articles";
import WelcomeHero from "./_components/WelcomeHero";
import { fetcher } from "@/lib/fetcher";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["public-categories"],
    queryFn: () => fetcher("/public/categories"),
  });
  await queryClient.prefetchQuery({
    queryKey: ["public-categories"],
    queryFn: () => fetcher("/public/categories"),
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["infinite-posts"],
    queryFn: () => fetcher("/public/posts"),
    initialPageParam: 0,
  });
  await queryClient.prefetchQuery({
    queryKey: ["featured-posts"],
    queryFn: () => fetcher("/public/featured-posts"),
  });
  return (
    <main className="max-w-full">
      <WelcomeHero />
      <Articles />
    </main>
  );
}
