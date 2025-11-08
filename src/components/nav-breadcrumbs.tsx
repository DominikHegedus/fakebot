"use client";

import { breadcrumbsTitles } from "@/app/app/breadcrumbs";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import Link from "next/link";
import { Fragment } from "react";

export function NavBreadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((prop, index) => (
          <Fragment key={prop.href}>
            {index < breadcrumbs.length - 1 ? (
              <Fragment key={prop.href}>
                <BreadcrumbItem key={prop.href}>
                  <BreadcrumbLink asChild>
                    <Link href={prop.href}>{breadcrumbsTitles[prop.href]}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </Fragment>
            ) : (
              <BreadcrumbItem key={prop.href}>
                <BreadcrumbPage>{breadcrumbsTitles[prop.href]}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
