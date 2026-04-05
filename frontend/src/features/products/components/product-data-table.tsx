"use client";

import { DataTable } from "@/features/dashboard/components/data-table";
import { Button } from "@/components/ui/button";
import { productSeedData } from "@/features/products/product.seed";
import { productColumns } from "@/features/products/components/product-columns";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export const ProductDataTable = () => {
    return <DataTable columns={productColumns} createData={<ActionButton />} data={productSeedData} />;
};

const ActionButton = () => {
    return (
        <Button asChild variant="outline">
            <Link href="/dashboard/products/create">
                <PlusIcon />
                Create Category
            </Link>
        </Button>
    );
};
