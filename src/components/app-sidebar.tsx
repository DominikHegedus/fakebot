"use client";

import * as React from "react";
import { BookOpen, BotIcon, LifeBuoy, Search, Settings2 } from "lucide-react";

import { NavGroup } from "@/components/nav-group";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavSpecial } from "./nav-special";
import type { User } from "better-auth";
import { NavBots } from "./nav-bots";
import { NavSimple } from "./nav-simple";
import Image from "next/image";
import Link from "next/link";

const data = {
  navSpecial: {
    title: "Create your own bot ✨",
    url: "/app/create",
    icon: BotIcon,
  },
  navGeneral: [
    {
      title: "Discover bots",
      url: "/app/discover",
      icon: Search,
    },
    {
      title: "Manage my bots",
      url: "/app/my-bots",
      icon: Settings2,
    },
  ],
  navRegular: [
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/docs/introduction",
        },
        {
          title: "Get Started",
          url: "/docs/get-started",
        },
        {
          title: "Tutorials",
          url: "/docs/tutorials",
        },
      ],
    },
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
      items: [
        {
          title: "FAQ",
          url: "/support/faq",
        },
        {
          title: "Contact Us",
          url: "/support/contact-us",
        },
        {
          title: "Report a Bug",
          url: "/support/report-a-bug",
        },
        {
          title: "Terms of Service",
          url: "/support/terms-of-service",
        },
        {
          title: "Privacy Policy",
          url: "/support/privacy-policy",
        },
      ],
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) {
  const { open, openMobile } = useSidebar();

  const navUser = {
    name: user.name ?? "Anonymous",
    email: user.email ?? "anonymous@fakebots.com",
    avatar: user.image ?? null,
  };

  const bots = [
    {
      name: "Bot 1",
      url: "#",
      icon: BotIcon,
    },
  ];

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="flex items-center justify-center gap-2">
        <Link href="/app">
          <Image
            className="rounded-md"
            src={
              open || openMobile
                ? "/fakebot-w-text.png"
                : "/fakebot-wo-text.png"
            }
            alt="FakeBot"
            width={open || openMobile ? 64 : 32}
            height={open || openMobile ? 64 : 32}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex flex-col items-center justfiy-start gap-2">
        <NavSpecial
          item={data.navSpecial}
          compact={!open && !openMobile}
        />
        <NavSimple
          heading="General"
          items={data.navGeneral}
        />
        <NavBots
          heading="Your Bots"
          bots={bots}
        />
        <NavBots
          heading="Shared with You"
          bots={bots}
        />
        <NavGroup
          heading="Other"
          items={data.navRegular}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
