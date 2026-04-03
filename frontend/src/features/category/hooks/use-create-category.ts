import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { CreateCategorySchema } from "@/features/category/category.schemas";
import { Category } from "@/features/category/category.types";
import { apiBrowserClient } from "@/lib/api/api.client";

export const useCreateCategory = (): UseMutationResult<Category, Error, CreateCategorySchema> =>
    useMutation({
        mutationFn: async (data): Promise<Category> =>
            apiBrowserClient("/categories", {
                method: "POST",
                body: JSON.stringify(data),
            }),
    });
