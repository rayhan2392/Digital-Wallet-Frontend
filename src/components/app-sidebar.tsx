import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { Link, useLocation } from "react-router"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  User,
  Shield,
  Users,
  BarChart3,
  Home,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

// Icon mapping for navigation items
const getIconForNavItem = (title: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    // Admin icons
    'Overview': Home,
    'Manage Agent\'s': Shield,
    'Manage Users': Users,
    'Transactions': BarChart3,

    // User icons  
    'Wallet': CreditCard,
    'Send Money': ArrowUpRight,
    'Withdraw': ArrowDownLeft,
    'Update Profile': User,

    // Agent icons
    'Overiview': Home,
    'Add Money': ArrowDownLeft,
    'Profile': User,
  }

  return iconMap[title] || CreditCard
}

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



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined)
  const location = useLocation()

  const navItems = getSidebarItems(userData?.role)

  return (
    <Sidebar {...props} className="border-r border-border/50">
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>

          {/* Brand and Role */}
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg fintech-gradient-text">
              SwiftPay
            </h2>
            <Badge
              variant={getRoleBadgeVariant(userData?.role)}
              className="text-xs font-medium"
            >
              {getRoleDisplayName(userData?.role)}
            </Badge>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {navItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = getIconForNavItem(item.title)
                  const isActive = location.pathname === item.url

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          "w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium",
                          isActive && "bg-primary/15 text-primary border-r-2 border-primary font-semibold"
                        )}
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <Icon className={cn(
                            "h-4 w-4 shrink-0",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )} />
                          <span className="truncate">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <SidebarMenuButton
          asChild
          className="w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <Link to="/" className="flex items-center gap-3">
            <Home className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">Go Home</span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
