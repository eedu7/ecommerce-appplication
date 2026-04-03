import { CategoryDataTable } from "@/features/category/components/category-data-table";
import { CreateCategoryFormSheet } from "@/features/category/components/create-category-form-sheet";

export const CategoryPage = () => {
    return (
        <main className="flex flex-col gap-12">
            <CategoryDataTable />
            <div>
                <CreateCategoryFormSheet />
            </div>
        </main>
    );
};
