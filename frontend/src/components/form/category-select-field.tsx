"use client";

import { useFieldContext } from "@/context/form";
import { useStore } from "@tanstack/react-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { JSX } from "react";
import { FormFieldError } from "./form-field-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/features/categories/hooks/use-categories";

export const CategorySelectField = ({ parentId }: { parentId?: string | null }): JSX.Element => {
    const { data } = useCategories();

    const field = useFieldContext<string>();

    const errors = useStore(field.store, (state) => state.meta.errors);

    return (
        <Field>
            <FieldLabel className="gap-1">Parent</FieldLabel>
            <Select onValueChange={(e) => field.handleChange(e)} defaultValue={parentId ?? ""}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                    {data?.map(
                        ({ uid, parent_id, name }) =>
                            !parent_id && (
                                <SelectItem value={uid} key={uid}>
                                    {name}
                                </SelectItem>
                            )
                    )}
                </SelectContent>
            </Select>
            <FormFieldError errors={errors} />
        </Field>
    );
};
