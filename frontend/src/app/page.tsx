import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ButtonGroup } from "@/components/ui/button-group";
import { auth } from "@/features/auth/auth.server";
import { LogoutButton } from "@/app/logout-button";

export default async function Home() {
    const authenticated = await auth.isAuthenticated();
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex w-md items-center justify-center gap-4 rounded-md p-12 shadow">
                {!authenticated ? (
                    <ButtonGroup>
                        <Button asChild variant="outline">
                            <Link href="/login" prefetch>
                                Login
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/register" prefetch>
                                Register
                            </Link>
                        </Button>
                    </ButtonGroup>
                ) : (
                    <ButtonGroup>
                        <LogoutButton />
                    </ButtonGroup>
                )}
                <ButtonGroup>
                    <Button asChild variant="outline">
                        <Link href="/dashboard" prefetch>
                            Dashboard
                        </Link>
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}
