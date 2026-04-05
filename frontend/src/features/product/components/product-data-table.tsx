"use client";

import { DataTable } from "@/features/dashboard/components/data-table";
import { Button } from "@/components/ui/button";
import { productSeedData } from "@/features/product/product.seed";
import { productColumns } from "@/features/product/components/product-columns";

export const ProductDataTable = () => {
    return <DataTable columns={productColumns} createData={<Button>Create Product</Button>} data={productSeedData} />;
};
