import { CategoryDataTable } from "@/features/category/components/category-data-table";
import { categoryColumns } from "@/features/category/components/category-columns";

export const CategoryPage = () => {
    return (
        <main>
            <CategoryDataTable columns={categoryColumns} data={[]} />
        </main>
    );
};
