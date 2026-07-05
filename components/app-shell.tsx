import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import type {
	DashboardMenuGroup,
	DashboardMenuItem,
} from "@/components/app-shared";
import type { AppUser } from "@/components/nav-user";

type AppShellProps = {
	children: React.ReactNode;
	menu?: DashboardMenuItem[] | DashboardMenuGroup[];
	user?: AppUser;
};

export function AppShell({ children, menu = [], user }: AppShellProps) {
	return (
		<SidebarProvider>
			<AppSidebar menu={menu} user={user} />
			<SidebarInset className="min-h-svh p-4 md:p-6">
				<AppHeader menu={menu} user={user} />
				<div className="flex flex-1 flex-col gap-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
