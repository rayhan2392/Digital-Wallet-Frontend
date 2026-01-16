import type { ISidebarItem } from "@/types";
import type { ReactNode } from "react";

export const generateRoutes = (sidebarItems: ISidebarItem[], errorElement?: ReactNode) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
      ...(errorElement && { errorElement }),
    }))
  );
};