import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/features/product/product.types";
import { SelectColumn } from "@/components/data-table/select-column";

export const productColumns: ColumnDef<Product>[] = [
    SelectColumn<Product>(),
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
