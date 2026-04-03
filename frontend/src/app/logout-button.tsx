"use client";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export const LogoutButton = () => {
    const { logout, isLoading } = useAuth();
    return (
        <Button type="button" variant="outline" onClick={() => logout()}>
            {isLoading ? <Spinner /> : "Logout"}
        </Button>
    );
};
