import { useFormContext } from "@/context/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
import { JSX } from "react";
import { Field } from "@/components/ui/field";

export const SubmitButton = ({ label, isPending = false }: { label: string; isPending: boolean }): JSX.Element => {
    const form = useFormContext();
    return (
        <Field orientation="horizontal">
            <form.Subscribe selector={(state) => state.isSubmitting}>
                {(isSubmitting) => (
                    <Button type="submit" disabled={isSubmitting || isPending} className="w-full">
                        {isSubmitting || isPending ? <Spinner /> : label}
                    </Button>
                )}
            </form.Subscribe>
        </Field>
    );
};
