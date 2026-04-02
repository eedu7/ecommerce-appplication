import { LoginUserSchema, RegisterUserSchema } from "@/features/auth/auth.schema";
import { createContext } from "react";
import { AuthResponse, User, UserRole } from "@/features/auth/auth.types";

export type AuthContextType = {
    user?: User | null;
    userRole: UserRole | "GUEST";
    isAuthenticated: boolean;
    login: (data: LoginUserSchema) => Promise<AuthResponse>;
    register: (data: RegisterUserSchema) => Promise<AuthResponse>;
    logout: () => void;
    isLoading: boolean;
    error: Error | null;
    refetchUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
