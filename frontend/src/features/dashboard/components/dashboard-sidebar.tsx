import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, LucideIcon, PackageIcon, ShoppingBagIcon } from "lucide-react"
import Link from "next/link"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarUserButton } from "@/features/dashboard/components/sidebar-user-button"

interface DashboardSidebarContentItemProps {
    title: string;
    icon: LucideIcon;
    href: string;
}

const items: DashboardSidebarContentItemProps[] = [
    {
        title: "Home",
        icon: LayoutDashboardIcon,
        href: "/dashboard",
    },
    {
        title: "Category",
        icon: PackageIcon,
        href: "/dashboard/categories",
    },
    {
        title: "Product",
        icon: ShoppingBagIcon,
        href: "/dashboard/products",
    },
];

export const DashboardSidebar = () => {
    return (
        <TooltipProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarTrigger />
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Catalog</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map(({ title, icon: Icon, href }) => (
                                    <SidebarMenuItem key={href}>
                                        <Link href={href}>
                                            <SidebarMenuButton tooltip={title}>
                                                <Icon />
                                                {title}
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarUserButton />
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </TooltipProvider>
    );
};
