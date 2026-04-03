import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/features/category/category.types";

export const categoryColumns: ColumnDef<Category>[] = [
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
];
