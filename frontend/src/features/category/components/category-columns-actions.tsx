"use client";
import { Category } from "@/features/category/category.types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, PenIcon, TrashIcon } from "lucide-react";
import { DeleteCategoryDialog } from "@/features/category/components/delete-category-dialog";
import { useState } from "react";

export const CategoryColumnsActions = ({ category }: { category: Category }) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontalIcon className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {}}>
                        <PenIcon />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => {
                            setIsDeleteOpen(true);
                        }}
                    >
                        <TrashIcon />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteCategoryDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} uid={category.uid} />
        </>
    );
};
