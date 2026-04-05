import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { apiBrowserClient } from "@/lib/api/api.client";
import { Category } from "@/features/categories/category.types";
import { UpdateCategorySchema } from "@/features/categories/category.schemas";

export const useUpdateCategory = (): UseMutationResult<Category, Error, UpdateCategorySchema & { uid: string }> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ uid, description, parent_id, name }): Promise<Category> =>
            apiBrowserClient(`/categories/${uid}`, {
                method: "PUT",
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
