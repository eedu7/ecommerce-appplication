"use client";
import { ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext, AuthContextType } from "@/features/auth/context/auth-context";
import { LoginUserSchema, RegisterUserSchema } from "@/features/auth/auth.schema";
import { AuthResponse, User } from "@/features/auth/auth.types";
import { useRouter } from "next/navigation";
import { apiBrowserClient } from "@/lib/api/api.client";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const {
        data: user,
        isLoading,
        error,
        refetch: refetchUser,
    } = useQuery<User | null, Error>({
        queryKey: ["currentUser"],
        queryFn: async () => {
            return {
                uid: "hello",
                email: "email",
                username: "username",
                role: "ADMIN",
            };
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });

    const onSuccess = (data: AuthResponse) => {
        localStorage.setItem("userData", JSON.stringify(data.user));
        queryClient.setQueryData(["currentUser"], data.user);
        router.replace("/");
    };

    const loginMutation = useMutation<AuthResponse, Error, LoginUserSchema>({
        mutationFn: async (data) =>
            apiBrowserClient("/auth/login", {
                method: "POST",
                body: JSON.stringify(data),
            }),
        onSuccess,
    });

    const registerMutation = useMutation<AuthResponse, Error, RegisterUserSchema>({
        mutationFn: async (data) =>
            apiBrowserClient("/auth/", {
                method: "POST",
                body: JSON.stringify({ ...data, role: "CUSTOMER" }),
            }),
        onSuccess,
    });

    const logoutMutation = useMutation<void, Error>({
        mutationFn: async () =>
            apiBrowserClient("/auth/logout", {
                method: "POST",
            }),
        onSuccess: () => {
            queryClient.setQueryData(["currentUser"], null);
            queryClient.clear();
            router.replace("/");
        },
    });

    const login = async (credentials: LoginUserSchema) => {
        return loginMutation.mutateAsync(credentials);
    };
    const register = async (credentials: RegisterUserSchema) => {
        return registerMutation.mutateAsync(credentials);
    };
    const logout = async () => {
        return logoutMutation.mutateAsync();
    };

    const refetch = async (): Promise<void> => {
        await refetchUser();
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        userRole: user ? user.role : "GUEST",
        isLoading: isLoading || loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
        error: error || loginMutation.error || registerMutation.error || logoutMutation.error,
        login,
        register,
        logout,
        refetchUser: refetch,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
