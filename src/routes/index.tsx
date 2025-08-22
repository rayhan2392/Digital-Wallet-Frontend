import App from "@/App";
import About from "@/pages/About";
import Features from "@/pages/Features";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Pricing from "@/pages/Pricing";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

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
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    }
])