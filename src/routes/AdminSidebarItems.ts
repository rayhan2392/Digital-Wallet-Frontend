import ApproveAgent from "@/pages/admin/ApproveAgent";
import type { ISidebarItem } from "@/types";

export const AdminSidebarItems: ISidebarItem[] = [
    {
        title: "dashboard",
        items: [
            {
                title: "Approve Agent",
                url: "/admin/approve-agent",
                component: ApproveAgent
            },
            

        ]
    }
]