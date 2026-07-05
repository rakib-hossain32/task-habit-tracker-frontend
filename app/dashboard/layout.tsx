export const dynamic = "force-dynamic";

import { AppShell } from "@/components/app-shell";
import { getSession } from "@/features/auth/services/auth.service";
import { sidebar } from "@/lib/constant/dashboard";
import { redirect } from "next/navigation";

type Role = keyof typeof sidebar;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  const role = user?.role as Role | undefined;

  return (
    <AppShell menu={role ? sidebar[role] : []} user={user}>
      {children}
    </AppShell>
  );
}
