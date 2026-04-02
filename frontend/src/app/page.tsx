"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ButtonGroup } from "@/components/ui/button-group";

export default function Home() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex w-md items-center justify-center gap-4 rounded-md p-12 shadow">
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
