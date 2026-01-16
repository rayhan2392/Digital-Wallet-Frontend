import MyWallet from "@/pages/user/MyWallet";
import SendMoney from "@/pages/user/SendMoney";
import Transactions from "@/pages/user/Transactions";
import UserProfile from "@/pages/user/UserProfile";
import Withdraw from "@/pages/user/Withdraw";
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
            {
                title: "Send Money",
                url: "/user/send-money",
                component: SendMoney
            },
            {
                title: "Withdraw",
                url: "/user/withdraw",
                component: Withdraw
            },
            {
                title: "Transactions",
                url: "/user/transactions",
                component: Transactions
            },
            {
                title: "Update Profile",
                url: "/user/profile",
                component: UserProfile
            },
            

        ]
    }
]