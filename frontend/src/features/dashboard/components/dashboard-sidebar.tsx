import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";

export const DashboardSidebar = () => {
    return (
        <Sidebar collapsible="icon">
            <DashboardSidebarHeader />
        </Sidebar>
    );
};

const DashboardSidebarHeader = () => (
    <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarTrigger />
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarHeader>
);
