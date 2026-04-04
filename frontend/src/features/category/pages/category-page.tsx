import { CategoryDataTable } from "@/features/category/components/category-data-table";
import { EditCategoryForm } from "@/features/category/components/edit-category-form";
import { DeleteCategoryDialog } from "@/features/category/components/delete-category-dialog";

export const CategoryPage = () => {
    return (
        <main className="flex flex-col gap-12">
            <CategoryDataTable />
            <EditCategoryForm />
            <DeleteCategoryDialog />
        </main>
    );
};
