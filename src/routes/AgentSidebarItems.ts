import AddMoney from "@/pages/agent/AddMoney";
import AgentOverview from "@/pages/agent/AgentOverview";
import AgentProfile from "@/pages/agent/AgentProfile";
import AgentTransactions from "@/pages/agent/AgentTransactions";
import type { ISidebarItem } from "@/types";

export const AgentSidebarItems: ISidebarItem[] = [
    {
        title: "dashboard",
        items: [
            {
                title: "Overiview",
                url: "/agent/overiview",
                component: AgentOverview
            },
            {
                title: "Add Money",
                url: "/agent/add-money",
                component: AddMoney
            },
            {
                title: "Transactions",
                url: "/agent/transactions",
                component: AgentTransactions
            },
            {
                title: "Profile",
                url: "/agent/profile",
                component: AgentProfile
            },


        ]
    }
]