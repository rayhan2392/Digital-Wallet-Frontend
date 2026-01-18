import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ModeToggle } from "./mode-toggle"
import { Link, useLocation } from "react-router"
import { authApi, useLogOutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { useState } from "react"
import { Zap, User, Home, LogOut } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// Navigation links array
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
]

const getRoleBadgeVariant = (role?: string) => {
  const variantMap: Record<string, "default" | "secondary" | "success" | "warning"> = {
    'super_admin': 'default',
    'admin': 'default',
    'agent': 'success',
    'user': 'secondary'
  }
  return variantMap[role || ''] || 'secondary'
}

const getRoleDisplayName = (role?: string) => {
  const roleMap: Record<string, string> = {
    'super_admin': 'Super Admin',
    'admin': 'Administrator',
    'agent': 'Agent',
    'user': 'User'
  }
  return roleMap[role || ''] || 'User'
}

const getDashboardUrl = (role?: string) => {
  const urlMap: Record<string, string> = {
    'super_admin': '/admin',
    'admin': '/admin',
    'agent': '/agent',
    'user': '/user'
  }
  return urlMap[role || ''] || '/'
}

// Utility function to scroll to top smoothly
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined)
  const [logout] = useLogOutMutation();
  const dispatch = useAppDispatch();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const location = useLocation();

  const handleLogOut = async () => {
    try {
      await logout("");
      dispatch(authApi.util.resetApiState());
      toast.success("Successfully logged out! 👋");
      setIsLogoutDialogOpen(false);
    } catch {
      toast.error("Failed to logout. Please try again.");
    }
  }

  const openLogoutDialog = () => {
    setIsLogoutDialogOpen(true);
  }

  // Handle navigation link click with scroll to top
  const handleNavLinkClick = (href: string) => {
    // If clicking on the same page, scroll to top
    if (location.pathname === href) {
      scrollToTop();
    }
    // If navigating to a different page, the new page will start at the top
  }

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-4 md:px-6 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        href={link.href}
                        className="py-1.5 cursor-pointer"
                        onClick={() => handleNavLinkClick(link.href)}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2 group">
              {/* SwiftPay Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SwiftPay
              </span>
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-1">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${location.pathname === link.href
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                      <Link to={link.href} onClick={() => handleNavLinkClick(link.href)}>
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ModeToggle></ModeToggle>
          </div>
          {/* User menu */}
          {data?.email ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-200 hover:scale-105 group relative"
                >
                  {/* Enhanced circular border and background */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-200"></div>
                  <User className="h-5 w-5 text-primary relative z-10 group-hover:text-primary/80 transition-colors duration-200" />
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-4">
                <div className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/20">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {data?.name || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {data?.email || 'user@swiftpay.com'}
                      </p>
                      <Badge
                        variant={getRoleBadgeVariant(data?.role)}
                        className="text-xs mt-1"
                      >
                        {getRoleDisplayName(data?.role)}
                      </Badge>
                    </div>
                  </div>

                  <div className="border-t border-border/50 pt-3 space-y-2">
                    {/* Dashboard Link */}
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start gap-3 text-sm hover:bg-primary/5"
                    >
                      <Link to={getDashboardUrl(data?.role)}>
                        <Home className="h-4 w-4" />
                        Go to Dashboard
                      </Link>
                    </Button>

                    {/* Logout Button with Confirmation Dialog */}
                    <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={openLogoutDialog}
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to logout? You'll need to log in again to access your account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleLogOut}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Yes, Logout
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
