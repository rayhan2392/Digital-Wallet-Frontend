import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet, useLocation } from "react-router"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { ModeToggle } from "@/components/layouts/mode-toggle"
import UserMenu from "@/components/user-menu"
import { Separator } from "@/components/ui/separator"
import {
  ChevronRight,
  Home,
  Users,
  Shield,
  Wallet,
  ArrowUpDown,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"

// Breadcrumb mapping for different routes
const getBreadcrumbs = (pathname: string, userRole?: string) => {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ label: 'Dashboard', href: `/${userRole}`, icon: Home }]

  if (segments.length > 1) {
    const routeMap: Record<string, { label: string; icon: any }> = {
      // Admin routes
      'overview': { label: 'Overview', icon: Home },
      'manage-users': { label: 'Manage Users', icon: Users },
      'manage-agents': { label: 'Manage Agents', icon: Shield },
      'transactions': { label: 'Transactions', icon: ArrowUpDown },

      // User routes
      'my-wallet': { label: 'My Wallet', icon: Wallet },
      'send-money': { label: 'Send Money', icon: ArrowUpDown },
      'withdraw': { label: 'Withdraw', icon: ArrowUpDown },
      'profile': { label: 'Profile', icon: User },

      // Agent routes
      'overiview': { label: 'Overview', icon: Home },
      'add-money': { label: 'Add Money', icon: ArrowUpDown },
    }

    const currentRoute = segments[segments.length - 1]
    if (routeMap[currentRoute]) {
      breadcrumbs.push({
        label: routeMap[currentRoute].label,
        href: pathname,
        icon: routeMap[currentRoute].icon
      })
    }
  }

  return breadcrumbs
}

const getRoleDisplayName = (role?: string) => {
  const roleMap: Record<string, string> = {
    'super_admin': 'Super Admin',
    'admin': 'Administrator',
    'agent': 'Agent',
    'user': 'User'
  }
  return roleMap[role || ''] || 'Dashboard'
}

const getRoleGreeting = (role?: string) => {
  const greetingMap: Record<string, string> = {
    'super_admin': 'Welcome back, Super Admin',
    'admin': 'Welcome back, Administrator',
    'agent': 'Welcome back, Agent',
    'user': 'Welcome to your wallet'
  }
  return greetingMap[role || ''] || 'Welcome back'
}

export default function DashBoardLayout() {
  const location = useLocation()
  const { data: userData } = useUserInfoQuery(undefined)

  const breadcrumbs = getBreadcrumbs(location.pathname, userData?.role)
  const roleDisplayName = getRoleDisplayName(userData?.role)
  const greeting = getRoleGreeting(userData?.role)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="fintech-card-glass border-b border-border/50 backdrop-blur-md">
          <div className="flex h-16 shrink-0 items-center gap-4 px-4">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1 hover:bg-primary/10 transition-colors" />
              <Separator orientation="vertical" className="h-6" />

              {/* Breadcrumbs */}
              <nav className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.href} className="flex items-center space-x-2">
                    {index > 0 && (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div className="flex items-center space-x-1.5">
                      <crumb.icon className="h-4 w-4 text-muted-foreground" />
                      <span className={cn(
                        "font-medium transition-colors",
                        index === breadcrumbs.length - 1
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}>
                        {crumb.label}
                      </span>
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* Center Section - Role and Greeting */}
            <div className="flex-1 text-center">
              <p className="text-sm font-medium fintech-gradient-text">
                {roleDisplayName}
              </p>
              <p className="text-xs text-muted-foreground">
                {greeting}
              </p>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <ModeToggle />
              <Separator orientation="vertical" className="h-6" />
              <UserMenu />
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
