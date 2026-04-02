import { ReactNode } from "react";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
    return <main className="flex h-screen items-center justify-center">{children}</main>;
};
