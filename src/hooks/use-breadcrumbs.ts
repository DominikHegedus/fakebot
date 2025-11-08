import { usePathname } from "next/navigation";
import { useMemo } from "react";

export type BreadcrumbItemProps = {
  label: string;
  href: string;
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const segments = useMemo(
    () =>
      pathname ? pathname.split("/").filter((segment) => segment !== "") : [],
    [pathname]
  );

  const items = useMemo<BreadcrumbItemProps[]>(
    () =>
      segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`;
        const decodedSegment = decodeURIComponent(segment);
        return {
          label: decodedSegment,
          href: path,
        };
      }),
    [segments]
  );

  return useMemo(
    () => ({
      breadcrumbs: items,
    }),
    [items]
  );
}
