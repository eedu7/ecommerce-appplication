export type UserRole = "ADMIN" | "CUSTOMER" | "VENDOR";

export type User = {
    uid: string;
    email: string;
    username: string;
    role: UserRole;
};

export interface Token {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
}

export interface AuthResponse {
    token: Token;
    user: User;
}
