import { role } from "@/constants/Role";
import { AdminSidebarItems } from "@/routes/AdminSidebarItems";
import { AgentSidebarItems } from "@/routes/AgentSidebarItems";
import { UserSidebarItems } from "@/routes/UserSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.super_admin:
            return [...AdminSidebarItems]
        case role.admin:
            return [...AdminSidebarItems]
        case role.agent:
            return [...AgentSidebarItems]
        case role.user:
            return [...UserSidebarItems]


        default:
            return []
    }
}