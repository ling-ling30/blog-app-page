import { Loader2Icon } from "lucide-react";

// _components/SearchLoading.tsx
export function SearchLoading() {
  return (
    <main className="w-full h-[50vh] flex items-center justify-center">
      <Loader2Icon className="h-10 w-10 animate-spin text-primary text-center" />
    </main>
  );
}
