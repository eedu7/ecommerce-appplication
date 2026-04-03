import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CreateCategoryForm } from "@/features/category/components/create-category-form";

export const CreateCategoryFormSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Create Category</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create Category</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <CreateCategoryForm />
                </div>
            </SheetContent>
        </Sheet>
    );
};
