import { role } from "@/constants/Role";
import { AdminSidebarItems } from "@/routes/AdminSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.super_admin:
            return [...AdminSidebarItems]
        case role.admin:
            return [...AdminSidebarItems]


        default:
            return []
    }
}