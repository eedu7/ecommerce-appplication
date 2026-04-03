import { ColumnDef } from "@tanstack/react-table";

export interface Category {
    uid: string;
    name: string;
    description?: string;
    parent_id?: string;
    created_at: string;
    updated_at: string;
}

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
