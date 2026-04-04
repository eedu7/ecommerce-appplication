import { create } from "zustand";
import { Category } from "@/features/category/category.types";

interface useEditCategoryStoreProps {
    category?: Category | null;
    isOpen: boolean;
    onOpenChange: () => void;
    setCategory: (newCategory: Category) => void;
    clearCategory: () => void;
}

export const useEditCategoryStore = create<useEditCategoryStoreProps>((set) => ({
    isOpen: false,
    category: null,
    onOpenChange: () => set((state) => ({ isOpen: !state.isOpen })),
    setCategory: (newCategory) => set({ category: newCategory }),
    clearCategory: () => set({ category: null }),
}));

interface useDeleteCategoryStoreProps {
    uid?: string | null;
    isOpen: boolean;
    onOpenChange: () => void;
    setUid: (uid: string) => void;
}

export const useDeleteCategoryStore = create<useDeleteCategoryStoreProps>((set) => ({
    uid: null,
    isOpen: false,
    onOpenChange: () => set((state) => ({ isOpen: !state.isOpen })),
    setUid: (uid) => set(() => ({ uid })),
}));
