"use client";

import { useFieldContext } from "@/context/form";
import { useStore } from "@tanstack/react-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes, JSX, useState } from "react";
import { FormFieldError } from "./form-field-error";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    required?: boolean;
}

export const PasswordField = ({ label, required = false, ...props }: Props): JSX.Element => {
    const field = useFieldContext<string>();

    const errors = useStore(field.store, (state) => state.meta.errors);

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = () => setIsVisible((prev) => !prev);

    return (
        <Field>
            <FieldLabel className="gap-1">
                {label}
                {required && <span className="text-rose-700">*</span>}
            </FieldLabel>
            <div className="relative">
                <Input
                    type={isVisible ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    {...props}
                />
                <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-xs text-muted-foreground underline-offset-2 transition-all hover:text-black hover:underline focus:text-black"
                    aria-label={isVisible ? "Hide password" : "Show password"}
                >
                    {isVisible ? "Hide" : "Show"}
                </button>
            </div>
            <FormFieldError errors={errors} />
        </Field>
    );
};
