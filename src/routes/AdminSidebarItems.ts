import AllTransactions from "@/pages/admin/AllTransactions";
import ManageAgent from "@/pages/admin/ManageAgent";
import ManageUsers from "@/pages/admin/ManageUsers";
import Overview from "@/pages/admin/Overview";
import type { ISidebarItem } from "@/types";

export const AdminSidebarItems: ISidebarItem[] = [
    {
        title: "dashboard",
        items: [
            {
                title: "Overview",
                url: "/admin/overview",
                component: Overview
            },
            {
                title: "Manage Agent's",
                url: "/admin/manage-agents",
                component: ManageAgent
            },
            {
                title: "Manage Users",
                url: "/admin/manage-users",
                component: ManageUsers
            },
            {
                title: "Transactions",
                url: "/admin/transactions",
                component: AllTransactions
            },
            


        ]
    }
]