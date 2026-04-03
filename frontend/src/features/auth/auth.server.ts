import { User } from "@/features/auth/auth.types";
import { apiServerClient } from "@/lib/api/api.server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ApiError } from "@/lib/api/api.error";
import { cache } from "react";

class AuthServer {
    currentUser = cache(async (): Promise<User | null> => {
        try {
            return await apiServerClient("/users/me", {
                method: "GET",
            });
        } catch (error) {
            if (error instanceof ApiError) {
                return null;
            }
            throw error;
        }
    });

    isAuthenticated = async (): Promise<boolean> => {
        const user = await this.currentUser();
        return !!user;
    };

    isAdmin = async (): Promise<boolean> => {
        const user = await this.currentUser();
        if (!user) return false;
        return user.role === "ADMIN";
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
