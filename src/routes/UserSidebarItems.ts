import MyWallet from "@/pages/user/MyWallet";
import type { ISidebarItem } from "@/types";

export const UserSidebarItems: ISidebarItem[] = [
    {
        title: "dashboard",
        items: [
            {
                title: "Wallet",
                url: "/user/my-wallet",
                component: MyWallet
            },
            

        ]
    }
]