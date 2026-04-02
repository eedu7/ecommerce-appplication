import { User } from "@/features/auth/auth.types";
import { apiServerClient } from "@/lib/api/api.server";
import { cache } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

class AuthServer {
    currentUser = cache(async (): Promise<User | null> => {
        return apiServerClient("/users");
    });

    logout = async (): Promise<void> => {
        await apiServerClient("/auth/logout", {
            method: "POST",
        });
    };

    isAuthenticated = async (): Promise<boolean> => {
        const user = await this.currentUser();
        return !!user;
    };

    requireAuth = async (redirectTo: string = "/login") => {
        const authenticated = await this.isAuthenticated();

        if (!authenticated) {
            redirect(redirectTo);
        }
    };

    requireUnAuth = async (redirectTo: string = "/") => {
        const authenticated = await this.isAuthenticated();

        if (authenticated) {
            const _headers = await headers();
            const referer = _headers.get("referer");
            redirect(referer || redirectTo);
        }
    };
}

export const auth = new AuthServer();
