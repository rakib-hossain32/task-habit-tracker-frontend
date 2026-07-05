"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppBreadcrumbs } from "@/components/app-breadcrumbs";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import {
	getActiveNavItem,
	getSidebarNavGroups,
	type DashboardMenuGroup,
	type DashboardMenuItem,
} from "@/components/app-shared";
import { NavUser } from "@/components/nav-user";
import type { AppUser } from "@/components/nav-user";
import { BellIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";

type AppHeaderProps = {
	menu?: DashboardMenuItem[] | DashboardMenuGroup[];
	user?: AppUser;
};

export function AppHeader({ menu = [], user }: AppHeaderProps) {
	const pathname = usePathname();
	const navGroups = getSidebarNavGroups(menu, pathname);
	const activeItem = getActiveNavItem(navGroups, pathname);

	return (
		<header
			className={cn(
				"sticky top-0 z-40 -mx-4 -mt-4 mb-6 flex h-16 items-center justify-between gap-2 border-b border-border/45 bg-background/45 px-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/30 md:-mx-6 md:-mt-6 md:px-6"
			)}
		>
			<div className="flex items-center gap-3">
				<CustomSidebarTrigger />
				<Separator
					className="mr-2 h-4 data-[orientation=vertical]:self-center"
					orientation="vertical"
				/>
				<AppBreadcrumbs page={activeItem} />
			</div>
			<div className="flex items-center gap-3">
				<Button aria-label="Notifications" size="icon" variant="ghost">
					<BellIcon
					/>
				</Button>
				<ModeToggle />
				<Separator
					className="h-4 data-[orientation=vertical]:self-center"
					orientation="vertical"
				/>
				<NavUser user={user} />
			</div>
		</header>
	);
}
