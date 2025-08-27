import App from "@/App";
import DashBoardLayout from "@/components/layouts/DashBoardLayout";
import About from "@/pages/About";
import Features from "@/pages/Features";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Pricing from "@/pages/Pricing";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { AdminSidebarItems } from "./AdminSidebarItems";
import { AgentSidebarItems } from "./AgentSidebarItems";
import { UserSidebarItems } from "./UserSidebarItems";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utils/WithAuth";
import { role } from "@/constants/Role";
import type { TRole } from "@/types";
import { RouteErrorBoundary } from "@/components/common/RouteErrorBoundary";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",

        children: [
            {
                Component: HomePage,
                path: "/",
                errorElement: <RouteErrorBoundary />
            },
            {
                Component: About,
                path: "/about",
                errorElement: <RouteErrorBoundary />
            },
            {
                Component: Features,
                path: "/features",
                errorElement: <RouteErrorBoundary />
            },
            {
                Component: Pricing,
                path: "/pricing",
                errorElement: <RouteErrorBoundary />
            }
        ]
    },
    {
        Component: withAuth(DashBoardLayout, role.admin as TRole),
        path: "/admin",
        errorElement: <RouteErrorBoundary />,
        children: [{ index: true, element: <Navigate to="/admin/overview" /> }, ...generateRoutes(AdminSidebarItems, <RouteErrorBoundary />)]
    },
    {
        Component: withAuth(DashBoardLayout, role.agent as TRole),
        path: "/agent",

        children: [{ index: true, element: <Navigate to="/agent/overview" /> }, ...generateRoutes(AgentSidebarItems, <RouteErrorBoundary />)]
    },
    {
        Component: withAuth(DashBoardLayout, role.user as TRole),
        path: "/user",
        errorElement: <RouteErrorBoundary />,
        children: [{ index: true, element: <Navigate to="/user/my-wallet" /> }, ...generateRoutes(UserSidebarItems, <RouteErrorBoundary />)]
    },
    {
        Component: Login,
        path: "/login",
        errorElement: <RouteErrorBoundary />
    },
    {
        Component: Register,
        path: "/register",
        errorElement: <RouteErrorBoundary />
    },
    {
        Component: Unauthorized,
        path: "/unauthorized",
        errorElement: <RouteErrorBoundary />
    },
    {
        Component: NotFound,
        path: "*",
        errorElement: <RouteErrorBoundary />
    }
])