import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { CreateCategorySchema } from "@/features/categories/category.schemas";
import { Category } from "@/features/categories/category.types";
import { apiBrowserClient } from "@/lib/api/api.client";

export const useCreateCategory = (): UseMutationResult<Category, Error, CreateCategorySchema> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ name, description, parent_id }): Promise<Category> =>
            apiBrowserClient("/categories", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    ...(description && { description }),
                    ...(parent_id && { parent_id }),
                }),
            }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["categories", "use-categories"],
            });
        },
    });
};
