import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import { TextField } from "@/components/form/text-field"
import { PasswordField } from "@/components/form/password-field"
import { SubmitButton } from "@/components/form/submit-button"

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
      TextField, PasswordField
  },
  formComponents: {
      SubmitButton
  },
  fieldContext,
  formContext,
});