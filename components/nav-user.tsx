"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/features/auth/queries/auth.mutations";
import { BellIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export type AppUser = {
	id?: string;
	name?: string | null;
	email?: string | null;
	image?: string | null;
	role?: string;
};

function getInitial(user?: AppUser) {
	return (user?.name || user?.email || "U").charAt(0).toUpperCase();
}

export function NavUser({ user }: { user?: AppUser }) {
	const { mutate: logout, isPending } = useLogoutMutation();
	const displayName = user?.name || "User";
	const displayEmail = user?.email || "No email";
	const roleLabel = user?.role
		? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
		: "Member";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
				<Avatar className="size-8">
					<AvatarImage src={user?.image || ""} />
					<AvatarFallback>{getInitial(user)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-60">
				<div className="flex items-center gap-3 px-1.5 py-2">
					<Avatar className="size-10">
						<AvatarImage src={user?.image || ""} />
						<AvatarFallback>{getInitial(user)}</AvatarFallback>
					</Avatar>
					<div className="min-w-0">
						<span className="font-medium text-foreground">{displayName}</span>
						<div className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-muted-foreground text-xs">
							{displayEmail}
						</div>
						<div className="mt-0.5 text-[10px] text-muted-foreground">
							{roleLabel}
						</div>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem render={<Link href="/dashboard/my-profile" />}>
						<UserIcon
						/>
						Profile
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<BellIcon
						/>
						Notifications
					</DropdownMenuItem>
					<DropdownMenuItem>
						<SettingsIcon
						/>
						Settings
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="w-full cursor-pointer"
						disabled={isPending}
						onClick={() => logout()}
						variant="destructive"
					>
						<LogOutIcon
						/>
						Log out
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
