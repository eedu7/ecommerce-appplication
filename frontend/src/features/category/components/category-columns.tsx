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
    },
];
