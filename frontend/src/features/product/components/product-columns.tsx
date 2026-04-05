import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/features/product/product.types";

export const productColumns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "sku",
        header: "Slug",
    },
];
