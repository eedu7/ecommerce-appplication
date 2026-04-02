import { ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext, AuthContextType } from "@/features/auth/context/auth-context";
import { LoginUserSchema, RegisterUserSchema } from "@/features/auth/auth.schema";
import { AuthResponse, User } from "@/features/auth/auth.types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();

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

    const loginMutation = useMutation<AuthResponse, Error, LoginUserSchema>({
        mutationFn: async (data) => {
            return {
                user: {
                    uid: "hello",
                    email: "email",
                    username: "username",
                    role: "ADMIN",
                },
                token: {
                    access_token: "access_token",
                    refresh_token: "refresh_token",
                    token_type: "Bearer",
                    expires_in: 0,
                },
            };
        },
    });
    const registerMutation = useMutation<AuthResponse, Error, RegisterUserSchema>({
        mutationFn: async (data) => {
            return {
                user: {
                    uid: "hello",
                    email: "email",
                    username: "username",
                    role: "ADMIN",
                },
                token: {
                    access_token: "access_token",
                    refresh_token: "refresh_token",
                    token_type: "Bearer",
                    expires_in: 0,
                },
            };
        },
    });

    const logoutMutation = useMutation<void, Error>({
        mutationFn: async () => {},
        onSuccess: () => {
            queryClient.setQueryData(["currentUser"], null);
            queryClient.clear();
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
