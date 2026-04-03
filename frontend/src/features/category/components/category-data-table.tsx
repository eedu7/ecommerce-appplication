"use client";

import { DataTable } from "@/features/dashboard/components/data-table";
import { categoryColumns } from "@/features/category/components/category-columns";
import { useCategories } from "@/features/category/hooks/use-categories";

export const CategoryDataTable = () => {
    const { data } = useCategories();
    return <DataTable columns={categoryColumns} data={data || []} />;
};
