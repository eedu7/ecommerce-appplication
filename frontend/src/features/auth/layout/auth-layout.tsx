import { ReactNode } from "react";
import { auth } from "@/features/auth/auth.server";

export const AuthLayout = async ({ children }: { children: ReactNode }) => {
    await auth.requireUnAuth();
    return <main className="flex h-screen items-center justify-center">{children}</main>;
};
