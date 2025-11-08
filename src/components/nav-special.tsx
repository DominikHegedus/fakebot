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
  compact = false,
}: {
  item: {
    title: string;
    url: string;
    icon?: LucideIcon;
  };
  compact?: boolean;
}) {
  return (
    <SidebarMenu className="p-2">
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={item.title}
          asChild
        >
          <RainbowButton
            variant="outline"
            asChild
          >
            <Link href={item.url}>
              {item.icon && <item.icon />}
              {!compact && <span>{item.title}</span>}
            </Link>
          </RainbowButton>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
