import { create } from "zustand";
import { Category } from "@/features/category/category.types";

interface useEditCategoryStoreProps {
    category?: Category;
    isOpen: boolean;
    onOpenChange: () => void;
    setCategory: (newCategory: Category) => void;
    clearCategory: () => void;
}

export const useEditCategoryStore = create<useEditCategoryStoreProps>((set) => ({
    isOpen: false,
    category: undefined,
    onOpenChange: () => set((state) => ({ isOpen: !state.isOpen })),
    setCategory: (newCategory) => set({ category: newCategory }),
    clearCategory: () => set({ category: undefined }),
}));
