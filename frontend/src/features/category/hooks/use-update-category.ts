import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { apiBrowserClient } from "@/lib/api/api.client";
import { Category } from "@/features/category/category.types";
import { UpdateCategorySchema } from "@/features/category/category.schemas";

export const useUpdateCategory = (): UseMutationResult<Category, Error, UpdateCategorySchema & { uid: string }> =>
    useMutation({
        mutationFn: async ({ uid, ...data }): Promise<Category> =>
            apiBrowserClient(`/categories/${uid}`, {
                method: "PUT",
                body: JSON.stringify(data),
            }),
    });
