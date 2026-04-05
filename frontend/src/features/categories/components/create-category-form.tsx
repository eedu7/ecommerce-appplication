"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useCreateCategory } from "@/features/categories/hooks/use-create-category";
import { useAppForm } from "@/hooks/use-app-form";
import { revalidateLogic } from "@tanstack/form-core";
import { createCategorySchema } from "@/features/categories/category.schemas";
import { PlusIcon } from "lucide-react";

export const CreateCategoryForm = () => {
    const { mutateAsync, isPending } = useCreateCategory();
    const form = useAppForm({
        defaultValues: {
            name: "",
            description: "",
            parent_id: "",
        },
        validationLogic: revalidateLogic(),
        validators: {
            onDynamic: createCategorySchema,
        },
        onSubmit: async ({ value }) => {
            await mutateAsync(value);
        },
    });

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <PlusIcon />
                    Create Category
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create Category</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            await form.handleSubmit();
                        }}
                    >
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <form.AppField
                                        name="name"
                                        children={(field) => (
                                            <field.TextField
                                                label="Name"
                                                name="name"
                                                autoCapitalize="on"
                                                spellCheck="true"
                                            />
                                        )}
                                    />
                                    <form.AppField
                                        name="description"
                                        children={(field) => (
                                            <field.TextField
                                                label="Description"
                                                name="description"
                                                autoCapitalize="sentences"
                                                spellCheck="true"
                                            />
                                        )}
                                    />
                                    <form.AppField
                                        name="parent_id"
                                        children={(field) => <field.CategorySelectField />}
                                    />
                                </FieldGroup>
                            </FieldSet>
                            <form.AppForm>
                                <form.SubmitButton label="Register" isPending={isPending} />
                            </form.AppForm>
                        </FieldGroup>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
};
