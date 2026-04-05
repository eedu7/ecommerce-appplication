"use client";

import { DataTable } from "@/features/dashboard/components/data-table";
import { categoryColumns } from "@/features/categories/components/category-columns";
import { useCategories } from "@/features/categories/hooks/use-categories";
import { CreateCategoryForm } from "@/features/categories/components/create-category-form";

export const CategoryDataTable = () => {
    const { data } = useCategories();
    return <DataTable createData={<CreateCategoryForm />} columns={categoryColumns} data={data || []} />;
};
