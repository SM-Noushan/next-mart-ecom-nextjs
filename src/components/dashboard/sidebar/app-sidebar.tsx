"use client";

import Link from "next/link";
import * as React from "react";
import {
  Sidebar,
  SidebarMenu,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Logo from "@/app/assets/svgs/Logo";
import { Bot, Settings2, SquareTerminal } from "lucide-react";
import { NavMain } from "@/components/dashboard/sidebar/nav-main";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Shop",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Manage Products",
          url: "/user/shop/product",
        },
        {
          title: "Manage Categories",
          url: "/user/shop/category",
        },
        {
          title: "Manage Brands",
          url: "/user/shop/brand",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/profile",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Logo />
                </div>
                <h2 className="font-bold text-xl">NextMart</h2>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
