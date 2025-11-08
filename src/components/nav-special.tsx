"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { RainbowButton } from "./ui/rainbow-button";
import Link from "next/link";

export function NavSpecial({
  item,
}: {
  item: {
    title: string;
    url: string;
    icon?: LucideIcon;
  };
}) {
  return (
    <SidebarMenu className="px-2">
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <RainbowButton asChild>
            <Link href={item.url}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </Link>
          </RainbowButton>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
