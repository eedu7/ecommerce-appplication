import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiBrowserClient } from "@/lib/api/api.client";
import { Category } from "@/features/category/category.types";

export const useCategories = ({
    offset = 0,
    limit = 30,
}: {
    offset?: number;
    limit?: number;
} = {}): UseQueryResult<Category[], Error> =>
    useQuery({
        queryKey: ["categories", "use-categories"],
        queryFn: async () => await apiBrowserClient(`/categories/?offset=${offset}&limit=${limit}`),
    });
