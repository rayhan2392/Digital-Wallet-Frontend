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
import { Link } from "react-router"
import { authApi, useLogOutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { useState } from "react"
import { Zap, User, Home, LogOut } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// Navigation links array (public only)
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

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined)
  const [logout] = useLogOutMutation();
  const dispatch = useAppDispatch();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await logout(undefined);
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

  return (
    <header className="fintech-border bg-background/95 backdrop-blur-md border-b px-4 md:px-6 sticky top-0 z-50 fintech-shadow">
      <div className="fintech-container flex h-16 items-center justify-between gap-4">
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
                      <NavigationMenuLink href={link.href} className="py-1.5">
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
            <Link to="/" className="flex items-center space-x-3 text-primary hover:text-primary/90">
              {/* SwiftPay Icon - Same as sidebar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg fintech-gradient-text">SwiftPay</span>
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      <Link to={link.href}>{link.label}</Link>
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
            <Link to={"/login"}>
              <Button variant="fintech-primary" className="font-semibold">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
