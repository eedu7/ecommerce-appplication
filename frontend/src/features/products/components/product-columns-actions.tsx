"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, PenIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Product } from "@/features/products/product.types";
import { DeleteProductDialog } from "@/features/products/components/delete-product-dialog";
import Link from "next/link";

export const ProductColumnsActions = ({ product }: { product: Product }) => {
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
                    <DropdownMenuItem asChild>
                        <Link href={`/dashboard/products/${product.uid}`}>
                            <PenIcon />
                            Edit
                        </Link>
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
            <DeleteProductDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} uid={product.uid} />
        </>
    );
};
