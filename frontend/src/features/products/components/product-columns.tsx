import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/features/products/product.types";
import { SelectColumn } from "@/components/data-table/select-column";
import { ProductColumnsActions } from "@/features/products/components/product-columns-actions";

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
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ProductColumnsActions product={row.original} />,
    },
];
