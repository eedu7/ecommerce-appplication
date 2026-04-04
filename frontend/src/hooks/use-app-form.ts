import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextField } from "@/components/form/text-field";
import { PasswordField } from "@/components/form/password-field";
import { SubmitButton } from "@/components/form/submit-button";
import { CategorySelectField } from "@/components/form/category-select-field";

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
    fieldComponents: {
        TextField,
        PasswordField,
        CategorySelectField,
    },
    formComponents: {
        SubmitButton,
    },
    fieldContext,
    formContext,
});
