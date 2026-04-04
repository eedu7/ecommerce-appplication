"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/features/category/category.types";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryColumnsActions } from "@/features/category/components/category-columns-actions";

export const categoryColumns: ColumnDef<Category>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const description = row.original.description;

            return description ? description : "-";
        },
    },
    {
        accessorKey: "parent_id",
        header: "Parent",
        cell: ({ row, table }) => {
            const parentId = row.original.parent_id;

            if (!parentId) {
                return "-";
            }

            const allData = table.options.data as Category[];
            const parent = allData.find((cat) => cat.uid === parentId);

            return parent ? parent.name : "-";
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <CategoryColumnsActions category={row.original} />,
    },
];
