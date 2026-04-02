"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { revalidateLogic } from "@tanstack/form-core";
import { loginUserSchema } from "@/features/auth/auth.schema";
import { FieldGroup, FieldSet } from "@/components/ui/field";

export const LoginForm = () => {
    const form = useAppForm({
        defaultValues: {
            username_or_email: "",
            password: "",
        },
        validationLogic: revalidateLogic(),
        validators: {
            onDynamic: loginUserSchema,
        },
        onSubmit: async ({ value }) => {
            console.table(value);
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
                            name="username_or_email"
                            children={(field) => (
                                <field.TextField
                                    label="Username or Email"
                                    name="username_or_email"
                                    autoComplete="username email"
                                    autoCapitalize="none"
                                    spellCheck="false"
                                />
                            )}
                        />
                        <form.AppField
                            name="password"
                            children={(field) => (
                                <field.PasswordField label="Password" name="password" autoComplete="current-password" />
                            )}
                        />
                    </FieldGroup>
                </FieldSet>
                <form.AppForm>
                    <form.SubmitButton label="Login" isPending={false} />
                </form.AppForm>
            </FieldGroup>
        </form>
    );
};
