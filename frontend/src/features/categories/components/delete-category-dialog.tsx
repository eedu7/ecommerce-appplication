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
import { useDeleteCategory } from "@/features/categories/hooks/use-delete-category";
import { Spinner } from "@/components/ui/spinner";

interface Props {
    uid: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const DeleteCategoryDialog = ({ uid, open, onOpenChange }: Props) => {
    const { mutateAsync, isPending } = useDeleteCategory();
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
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
