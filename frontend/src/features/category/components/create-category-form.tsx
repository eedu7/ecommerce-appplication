"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { revalidateLogic } from "@tanstack/form-core";
import { createCategorySchema } from "@/features/category/category.schemas";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useCreateCategory } from "@/features/category/hooks/use-create-category";

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
                                <field.TextField label="Name" name="name" autoCapitalize="on" spellCheck="true" />
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
                            children={(field) => <field.TextField label="Parent" name="parent_id" />}
                        />
                    </FieldGroup>
                </FieldSet>
                <form.AppForm>
                    <form.SubmitButton label="Register" isPending={isPending} />
                </form.AppForm>
            </FieldGroup>
        </form>
    );
};
