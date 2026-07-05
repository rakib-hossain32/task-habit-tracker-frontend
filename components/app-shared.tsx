import type { ReactNode } from "react";
import {
	ActivityIcon,
	ClapperboardIcon,
	HeartIcon,
	HelpCircleIcon,
	ImageIcon,
	LayoutGridIcon,
	LifeBuoyIcon,
	ListIcon,
	PackageIcon,
	ShieldIcon,
	ShoppingCartIcon,
	TagIcon,
	UsersIcon,
} from "lucide-react";

export const dashboardIconMap = {
	Clapperboard: ClapperboardIcon,
	Heart: HeartIcon,
	Image: ImageIcon,
	LayoutDashboard: LayoutGridIcon,
	LifeBuoy: LifeBuoyIcon,
	List: ListIcon,
	Package: PackageIcon,
	Shield: ShieldIcon,
	ShoppingCart: ShoppingCartIcon,
	Tag: TagIcon,
	Users: UsersIcon,
} as const;

export type DashboardIconName = keyof typeof dashboardIconMap;

export type DashboardMenuItem = {
	title: string;
	url: string;
	icon: DashboardIconName;
};

export type DashboardMenuGroup = {
	label: string;
	items: DashboardMenuItem[];
};

export type SidebarNavItem = {
	title: string;
	path?: string;
	icon?: ReactNode;
	isActive?: boolean;
	subItems?: SidebarNavItem[];
};

export type SidebarNavGroup = {
	label: string;
	items: SidebarNavItem[];
};

function isActivePath(pathname: string, path?: string) {
	if (!path) {
		return false;
	}

	return path === "/dashboard" || path === "/dashboard/admin"
		? pathname === path
		: pathname.startsWith(path);
}

function isGroupedMenu(
	menu: DashboardMenuItem[] | DashboardMenuGroup[]
): menu is DashboardMenuGroup[] {
	return menu.length > 0 && "items" in menu[0];
}

export function getSidebarNavGroups(
	menu: DashboardMenuItem[] | DashboardMenuGroup[] = [],
	pathname: string
): SidebarNavGroup[] {
	const groupedMenu = isGroupedMenu(menu)
		? menu
		: [{ label: "Navigation", items: menu }];

	return groupedMenu
		.filter((group) => group.items.length > 0)
		.map((group) => ({
			label: group.label,
			items: group.items.map((item) => {
				const Icon = dashboardIconMap[item.icon] ?? LayoutGridIcon;

				return {
					title: item.title,
					path: item.url,
					icon: <Icon />,
					isActive: isActivePath(pathname, item.url),
				};
			}),
		}));
}

export const footerNavLinks: SidebarNavItem[] = [
	{
		title: "Help",
		path: "/dashboard/support",
		icon: (
			<HelpCircleIcon
			/>
		),
	},
	{
		title: "System status",
		path: "/dashboard/status",
		icon: (
			<ActivityIcon
			/>
		),
	},
];

export function getActiveNavItem(
	groups: SidebarNavGroup[],
	pathname: string
) {
	const navLinks: SidebarNavItem[] = [
		...groups.flatMap((group) =>
			group.items.flatMap((item) =>
				item.subItems?.length ? [item, ...item.subItems] : [item]
			)
		),
		...footerNavLinks.map((item) => ({
			...item,
			isActive: isActivePath(pathname, item.path),
		})),
	];

	return navLinks.find((item) => item.isActive) ?? null;
}

export const navLinks: SidebarNavItem[] = footerNavLinks;
