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
       Component:DashBoardLayout,
       path:"/admin",
       children:[ ...generateRoutes(AdminSidebarItems)  ]
    },
    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    }
])