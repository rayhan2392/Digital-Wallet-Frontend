import App from "@/App";
import DashBoardLayout from "@/components/layouts/DashBoardLayout";
import About from "@/pages/About";
import Features from "@/pages/Features";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Pricing from "@/pages/Pricing";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { AdminSidebarItems } from "./AdminSidebarItems";
import { AgentSidebarItems } from "./AgentSidebarItems";
import { UserSidebarItems } from "./UserSidebarItems";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utils/WithAuth";
import { role } from "@/constants/Role";
import type { TRole } from "@/types";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: HomePage,
                path: "/"
            },
            {
                Component: About,
                path: "/about"
            },
            {
                Component: Features,
                path: "/features"
            },
            {
                Component: Pricing,
                path: "/pricing"
            }
        ]
    },
    {
        Component: withAuth(DashBoardLayout,role.admin as TRole),
        path: "/admin",
        children: [...generateRoutes(AdminSidebarItems)]
    },
    {
        Component: withAuth(DashBoardLayout,role.agent as TRole),
        path: "/agent",
        children: [...generateRoutes(AgentSidebarItems)]
    },
    {
        Component: withAuth(DashBoardLayout,role.user as TRole),
        path: "/user",
        children: [...generateRoutes(UserSidebarItems)]
    },
    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component:Unauthorized,
        path:"/unauthorized"
    }
])