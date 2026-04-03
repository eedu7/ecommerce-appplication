"use client";

import { DataTable } from "@/features/dashboard/components/data-table";
import { categoryColumns } from "@/features/category/components/category-columns";

export const CategoryDataTable = () => {
    return <DataTable columns={categoryColumns} data={[]} />;
};
