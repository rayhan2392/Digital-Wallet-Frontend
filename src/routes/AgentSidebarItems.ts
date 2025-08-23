import MyTransactions from "@/pages/agent/MyTransactions";
import type { ISidebarItem } from "@/types";

export const AgentSidebarItems: ISidebarItem[] = [
    {
        title: "dashboard",
        items: [
            {
                title: "Transactions",
                url: "/agent/transactions",
                component: MyTransactions
            },
            

        ]
    }
]