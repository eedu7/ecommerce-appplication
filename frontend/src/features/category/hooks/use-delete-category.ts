import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { apiBrowserClient } from "@/lib/api/api.client";

interface Data {
    uid: string;
}

export const useDeleteCategory = (): UseMutationResult<void, Error, Data> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ uid }): Promise<void> =>
            apiBrowserClient(`/categories/${uid}`, {
                method: "DELETE",
            }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["categories", "use-categories"],
            });
        },
    });
};
