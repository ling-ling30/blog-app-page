import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

// Categories hooks
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetcher("/categories"),
  });
};

// Tags hooks
export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => fetcher("/tags"),
  });
};
