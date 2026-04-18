import * as React from "react";
import { GalleryVerticalEnd, Home, BookOpen } from "lucide-react";

import { NavMain } from "@/components/Layout/nav-main";
import { NavUser } from "@/components/Layout/nav-user";
import { TeamSwitcher } from "@/components/Layout/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Updated data for Admin Dashboard
const data = {
  user: {
    name: "Admin User",
    email: "admin@talktaktika.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "TalkTaktika",
      logo: GalleryVerticalEnd,
      plan: "Admin",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      items: [],
    },
    {
      title: "Word Cards",
      url: "/dashboard/cards",
      icon: BookOpen,
      isActive: false,
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
