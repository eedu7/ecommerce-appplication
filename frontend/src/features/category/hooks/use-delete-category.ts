import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { apiBrowserClient } from "@/lib/api/api.client";

interface Data {
    uid: string;
}

export const useDeleteCategory = (): UseMutationResult<void, Error, Data> => {
    return useMutation({
        mutationFn: async ({ uid }): Promise<void> =>
            apiBrowserClient(`/category/${uid}`, {
                method: "DELETE",
            }),
    });
};
