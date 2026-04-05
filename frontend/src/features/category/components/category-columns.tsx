"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/features/category/category.types";
import { CategoryColumnsActions } from "@/features/category/components/category-columns-actions";
import { SelectColumn } from "@/components/data-table/select-column";

export const categoryColumns: ColumnDef<Category>[] = [
    SelectColumn<Category>(),
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "parent_id",
        header: "Parent",
        cell: ({ row, table }) => {
            const parentId = row.original.parent_id;

            if (!parentId) {
                return null;
            }

            const allData = table.options.data as Category[];
            const parent = allData.find((cat) => cat.uid === parentId);

            return parent?.name;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <CategoryColumnsActions category={row.original} />,
    },
];
