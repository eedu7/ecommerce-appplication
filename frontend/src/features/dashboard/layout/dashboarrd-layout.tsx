import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { auth } from "@/features/auth/auth.server";
import { notFound } from "next/navigation";

export const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const admin = await auth.isAdmin();
    if (!admin) notFound();

    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <main className="p-8">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
};
