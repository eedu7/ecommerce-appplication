"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useAppForm } from "@/hooks/use-app-form";
import { revalidateLogic } from "@tanstack/form-core";
import { updateCategorySchema } from "@/features/category/category.schemas";
import { useUpdateCategory } from "@/features/category/hooks/use-update-category";
import { useEditCategoryStore } from "@/features/category/category.store";
import { useEffect } from "react";

export const EditCategoryForm = () => {
    const { isOpen, onOpenChange, clearCategory, category } = useEditCategoryStore();
    const { mutateAsync, isPending } = useUpdateCategory();

    const form = useAppForm({
        defaultValues: {
            name: "",
            description: "",
            parent_id: "",
        },
        validationLogic: revalidateLogic(),
        validators: {
            onDynamic: updateCategorySchema,
        },
        onSubmit: async ({ value }) => {
            if (!category) return null;

            await mutateAsync(
                {
                    ...value,
                    uid: category.uid,
                },
                {
                    onSuccess: () => {
                        clearCategory();
                        onOpenChange();
                    },
                }
            );
        },
    });

    useEffect(() => {
        if (category) {
            form.setFieldValue("name", category.name ?? "");
            form.setFieldValue("description", category.description ?? "");
            form.setFieldValue("parent_id", category.parent_id ?? "");
        }
    }, [category, form]);

    return (
        <Sheet
            open={isOpen}
            onOpenChange={() => {
                onOpenChange();
                clearCategory();
            }}
        >
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Category</SheetTitle>
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
                                        children={(field) => (
                                            <field.CategorySelectField parentId={category?.parent_id} />
                                        )}
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
