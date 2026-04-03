import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiBrowserClient } from "@/lib/api/api.client";
import { Category } from "@/features/category/components/category-columns";

export const useCategories = (): UseQueryResult<Category[], Error> =>
    useQuery({
        queryKey: ["categories", "use-categories"],
        queryFn: async () => await apiBrowserClient("/categories"),
    });
