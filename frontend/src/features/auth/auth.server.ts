import { User } from "@/features/auth/auth.types";
import { apiServerClient } from "@/lib/api/api.server";
import { cookies } from "next/headers";
import { cache } from "react";

class AuthServer {
    logout = cache(async (): Promise<void> => {
        const cookieStore = await cookies();
        await apiServerClient("/auth/logout", {
            method: "POST",
            body: JSON.stringify({
                access_token: cookieStore.get("ACCESS_TOKEN"),
                refresh_token: cookieStore.get("REFRESH_TOKEN"),
            }),
        });
    });

    currentUser = async (): Promise<User | null> => {
        return apiServerClient("/users");
    };
}

export const auth = new AuthServer();
