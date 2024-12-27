import { Skeleton } from "@/components/ui/skeleton";
import { Loader2Icon } from "lucide-react";

// _components/SearchLoading.tsx
export function SearchLoading() {
  return (
    <main className="w-full h-[50vh] flex items-center justify-center">
      <Skeleton className="h-10 w-10 animate-spin bg-slate-600" />
    </main>
  );
}
