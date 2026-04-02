import { User } from "@/features/auth/auth.types";
import { apiServerClient } from "@/lib/api/api.server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ApiError } from "@/lib/api/api.error";

class AuthServer {
    currentUser = async (): Promise<User | null> => {
        try {
            return await apiServerClient("/users/me", {
                method: "GET",
            });
        } catch (error) {
            if (error instanceof ApiError && error.status >= 400 && error.status < 600) {
                return null;
            }
            throw error;
        }
    };

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
