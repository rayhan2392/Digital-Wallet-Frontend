import ManageAgent from "@/pages/admin/ManageAgent";
import type { ISidebarItem } from "@/types";

export const AdminSidebarItems: ISidebarItem[] = [
    {
        title: "dashboard",
        items: [
            {
                title: "Manage Agent's",
                url: "/admin/approve-agent",
                component: ManageAgent
            },
            

        ]
    }
]