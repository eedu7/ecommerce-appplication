import { CategoryDataTable } from "@/features/category/components/category-data-table";
import { EditCategoryForm } from "@/features/category/components/edit-category-form";

export const CategoryPage = () => {
    return (
        <main className="flex flex-col gap-12">
            <CategoryDataTable />
            <EditCategoryForm />
        </main>
    );
};
