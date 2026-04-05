"use client";

import { DataTable } from "@/features/dashboard/components/data-table";
import { productColumns } from "@/features/product/components/product-columns-actions";
import { Button } from "@/components/ui/button";
import { productSeedData } from "@/features/product/product.seed";

export const ProductDataTable = () => {
    return <DataTable columns={productColumns} createData={<Button>Create Product</Button>} data={productSeedData} />;
};
