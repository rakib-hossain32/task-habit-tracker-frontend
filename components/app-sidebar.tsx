"use client";

import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/nav-group";
import {
	footerNavLinks,
	getSidebarNavGroups,
	type DashboardMenuGroup,
	type DashboardMenuItem,
} from "@/components/app-shared";
import { LatestChange } from "@/components/latest-change";
import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppUser } from "@/components/nav-user";

type AppSidebarProps = {
	menu?: DashboardMenuItem[] | DashboardMenuGroup[];
	user?: AppUser;
};

export function AppSidebar({ menu = [], user }: AppSidebarProps) {
	const pathname = usePathname();
	const navGroups = getSidebarNavGroups(menu, pathname);
	const footerLinks = footerNavLinks.map((item) => ({
		...item,
		isActive:
			item.path === "/dashboard" || item.path === "/dashboard/admin"
				? pathname === item.path
				: !!item.path && pathname.startsWith(item.path),
	}));

	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarHeader className="h-14 justify-center">
				<SidebarMenuButton render={<Link href="/dashboard" />}>
					<LogoIcon />
					<span className="font-medium">Task Habit</span>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenuItem className="flex items-center gap-2">
						<SidebarMenuButton
							className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
							tooltip="Add task"
						>
							<PlusIcon
							/>
							<span>Add task</span>
						</SidebarMenuButton>
						<Button
							aria-label="Search dashboard"
							className="size-8 group-data-[collapsible=icon]:opacity-0"
							size="icon"
							variant="outline"
						>
							<SearchIcon
							/>
							<span className="sr-only">Search dashboard</span>
						</Button>
					</SidebarMenuItem>
				</SidebarGroup>
				{navGroups.map((group, index) => (
					<NavGroup key={`sidebar-group-${index}`} {...group} />
				))}
			</SidebarContent>
			<SidebarFooter>
				
				<SidebarMenu className="mt-2">
					{footerLinks.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton className="text-muted-foreground" isActive={item.isActive} size="sm" render={<Link href={item.path ?? "#"} />}>{item.icon}<span>{item.title}</span></SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
