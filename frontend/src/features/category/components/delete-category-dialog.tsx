"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteCategoryStore } from "@/features/category/category.store";
import { useDeleteCategory } from "@/features/category/hooks/use-delete-category";
import { Spinner } from "@/components/ui/spinner";

export const DeleteCategoryDialog = () => {
    const { uid, isOpen, onOpenChange } = useDeleteCategoryStore();
    const { mutateAsync, isPending } = useDeleteCategory();
    if (!uid) return null;
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        onClick={async () => {
                            await mutateAsync({ uid });
                        }}
                    >
                        {isPending ? <Spinner /> : "Confirm"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
