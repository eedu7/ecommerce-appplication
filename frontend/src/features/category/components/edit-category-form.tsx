"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useAppForm } from "@/hooks/use-app-form";
import { revalidateLogic } from "@tanstack/form-core";
import { updateCategorySchema } from "@/features/category/category.schemas";
import { useUpdateCategory } from "@/features/category/hooks/use-update-category";
import { Category } from "@/features/category/category.types";

export const EditCategoryForm = () => {
    const category: Category = {
        uid: "",
        parent_id: "",
        description: "",
        name: "",
        children: [],
    };
    const { mutateAsync, isPending } = useUpdateCategory();
    const form = useAppForm({
        defaultValues: {
            name: category.name,
            description: category.description || "",
            parent_id: category.parent_id || "",
        },
        validationLogic: revalidateLogic(),
        validators: {
            onDynamic: updateCategorySchema,
        },
        onSubmit: async ({ value }) => {
            await mutateAsync({
                ...value,
                uid: category.uid,
            });
        },
    });

    return (
        <Sheet>
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
                                <form.SubmitButton label="Edit" isPending={isPending} />
                            </form.AppForm>
                        </FieldGroup>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
};
