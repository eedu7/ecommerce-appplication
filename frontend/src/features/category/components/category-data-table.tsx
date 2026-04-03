"use client";

import { DataTable } from "@/features/dashboard/components/data-table";
import { categoryColumns } from "@/features/category/components/category-columns";
import { useCategories } from "@/features/category/hooks/use-categories";
import { CreateCategoryForm } from "@/features/category/components/create-category-form";

export const CategoryDataTable = () => {
    const { data } = useCategories();
    return <DataTable createData={<CreateCategoryForm />} columns={categoryColumns} data={data || []} />;
};
