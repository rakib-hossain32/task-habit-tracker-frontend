import type {
  DashboardIconName,
  DashboardMenuGroup,
} from "@/components/app-shared";

export const ADMIN: DashboardMenuGroup[] = [
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard/admin",
        icon: "LayoutDashboard" as DashboardIconName,
      },
      {
        title: "Users",
        url: "/dashboard/admin/users",
        icon: "Users" as DashboardIconName,
      },
      {
        title: "Content",
        url: "/dashboard/admin/content",
        icon: "Package" as DashboardIconName,
      },
      {
        title: "Categories",
        url: "/dashboard/admin/categories",
        icon: "Tag" as DashboardIconName,
      },
    ],
  },
  {
    label: "Media",
    items: [
      {
        title: "Images",
        url: "/dashboard/admin/media/images",
        icon: "Image" as DashboardIconName,
      },
      {
        title: "Videos",
        url: "/dashboard/admin/media/videos",
        icon: "Clapperboard" as DashboardIconName,
      },
    ],
  },
  {
    label: "Security & Support",
    items: [
      {
        title: "Roles & Permissions",
        url: "/dashboard/admin/roles",
        icon: "Shield" as DashboardIconName,
      },
      {
        title: "Support",
        url: "/dashboard/admin/support",
        icon: "LifeBuoy" as DashboardIconName,
      },
    ],
  },
];

export const USER: DashboardMenuGroup[] = [
  {
    label: "Navigation",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: "LayoutDashboard" as DashboardIconName,
      },
      {
        title: "Activity",
        url: "/dashboard/activity",
        icon: "List" as DashboardIconName,
      },
      {
        title: "Saved",
        url: "/dashboard/saved",
        icon: "Heart" as DashboardIconName,
      },
    ],
  },
];

export const sidebar = {
  ADMIN,
  USER,
};
