"use client";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { SidebarNavGroup, SidebarNavItem } from "@/components/app-shared";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function NavGroupItem({ item }: { item: SidebarNavItem }) {
	const hasSubItems = !!item.subItems?.length;
	const activeBranch =
		!!item.isActive || item.subItems?.some((subItem) => !!subItem.isActive);
	const [isOpen, setIsOpen] = useState(() => !!activeBranch);

	if (!hasSubItems) {
		return (
			<SidebarMenuItem>
				<SidebarMenuButton
					isActive={item.isActive}
					render={<Link href={item.path ?? "#"} />}
				>
					{item.icon}
					<span>{item.title}</span>
				</SidebarMenuButton>
			</SidebarMenuItem>
		);
	}

	return (
		<Collapsible
			className="group/collapsible"
			open={activeBranch || isOpen}
			onOpenChange={setIsOpen}
			render={<SidebarMenuItem />}
		>
			<CollapsibleTrigger
				render={<SidebarMenuButton isActive={item.isActive} />}
			>
				{item.icon}
				<span>{item.title}</span>
				<ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
			</CollapsibleTrigger>
			<CollapsibleContent>
				<SidebarMenuSub>
					{item.subItems?.map((subItem) => (
						<SidebarMenuSubItem key={subItem.title}>
							<SidebarMenuSubButton
								isActive={subItem.isActive}
								render={<Link href={subItem.path ?? "#"} />}
							>
								{subItem.icon}
								<span>{subItem.title}</span>
							</SidebarMenuSubButton>
						</SidebarMenuSubItem>
					))}
				</SidebarMenuSub>
			</CollapsibleContent>
		</Collapsible>
	);
}

export function NavGroup({ label, items }: SidebarNavGroup) {
	return (
		<SidebarGroup>
			{label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
			<SidebarMenu>
				{items.map((item) => (
					<NavGroupItem item={item} key={item.title} />
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
