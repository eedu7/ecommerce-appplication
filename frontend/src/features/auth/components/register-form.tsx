"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { revalidateLogic } from "@tanstack/form-core";
import { registerUserSchema } from "@/features/auth/auth.schema";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useAuth } from "@/features/auth/hooks/use-auth";

export const RegisterForm = () => {
    const { register, isLoading } = useAuth();
    const form = useAppForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationLogic: revalidateLogic(),
        validators: {
            onDynamic: registerUserSchema,
        },
        onSubmit: async ({ value }) => {
            await register(value);
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
                            name="username"
                            children={(field) => (
                                <field.TextField
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoCapitalize="none"
                                    spellCheck="false"
                                />
                            )}
                        />
                        <form.AppField
                            name="email"
                            children={(field) => (
                                <field.TextField
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoCapitalize="none"
                                    spellCheck="false"
                                    type="email"
                                />
                            )}
                        />
                        <form.AppField
                            name="password"
                            children={(field) => (
                                <field.PasswordField label="Password" name="password" autoComplete="new-password" />
                            )}
                        />
                        <form.AppField
                            name="confirmPassword"
                            children={(field) => (
                                <field.PasswordField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    autoComplete="new-password"
                                />
                            )}
                        />
                    </FieldGroup>
                </FieldSet>
                <form.AppForm>
                    <form.SubmitButton label="Register" isPending={isLoading} />
                </form.AppForm>
            </FieldGroup>
        </form>
    );
};
