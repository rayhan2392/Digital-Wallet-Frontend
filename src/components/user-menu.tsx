import {
  LogOutIcon,
  UserIcon,
  SettingsIcon,
  ShieldIcon,
  WalletIcon,
  CreditCardIcon,
  PhoneIcon,
  UsersIcon,
  BarChart3Icon
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useUserInfoQuery, useLogOutMutation } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { authApi } from "@/redux/features/auth/auth.api"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"

const getInitials = (name?: string) => {
  if (!name) return 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
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

const getRoleSpecificMenuItems = (role?: string) => {
  switch (role) {
    case 'admin':
    case 'super_admin':
      return [
        { icon: UsersIcon, label: 'Manage Users', href: '/admin/manage-users' },
        { icon: ShieldIcon, label: 'Manage Agents', href: '/admin/manage-agents' },
        { icon: BarChart3Icon, label: 'Analytics', href: '/admin/overview' }
      ]
    case 'agent':
      return [
        { icon: CreditCardIcon, label: 'Add Money', href: '/agent/add-money' },
        { icon: BarChart3Icon, label: 'Transactions', href: '/agent/transactions' }
      ]
    case 'user':
      return [
        { icon: WalletIcon, label: 'My Wallet', href: '/user/my-wallet' },
        { icon: CreditCardIcon, label: 'Send Money', href: '/user/send-money' },
        { icon: BarChart3Icon, label: 'Transactions', href: '/user/transactions' }
      ]
    default:
      return []
  }
}

export default function UserMenu() {
  const { data: userData } = useUserInfoQuery(undefined)
  const [logout, { isLoading: isLoggingOut }] = useLogOutMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const roleSpecificItems = getRoleSpecificMenuItems(userData?.role)

  const handleLogout = async () => {
    try {
      const toastId = toast.loading("Signing out...")
      await logout(undefined).unwrap()
      dispatch(authApi.util.resetApiState())
      toast.success("Successfully signed out", { id: toastId })
      navigate('/login')
    } catch (error) {
      toast.error("Failed to sign out")
    }
  }

  const getProfileLink = () => {
    switch (userData?.role) {
      case 'admin':
      case 'super_admin':
        return '/admin/profile'
      case 'agent':
        return '/agent/profile'
      case 'user':
        return '/user/profile'
      default:
        return '/profile'
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-primary/10 transition-colors rounded-full">
          <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
            <AvatarImage src={userData?.avatar} alt="Profile image" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
              {getInitials(userData?.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 fintech-card" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col p-3">
          <div className="flex items-center space-x-3 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userData?.avatar} alt="Profile image" />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(userData?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-foreground truncate text-sm font-medium">
                {userData?.name || 'User'}
              </p>
              <p className="text-muted-foreground truncate text-xs font-normal">
                {userData?.email || 'user@swiftpay.com'}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Badge
              variant={getRoleBadgeVariant(userData?.role)}
              className="text-xs"
            >
              {getRoleDisplayName(userData?.role)}
            </Badge>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Role-specific quick actions */}
        {roleSpecificItems.length > 0 && (
          <>
            <DropdownMenuGroup>
              {roleSpecificItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link to={item.href} className="flex items-center cursor-pointer">
                    <item.icon size={16} className="opacity-60 mr-2" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Common user actions */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={getProfileLink()} className="flex items-center cursor-pointer">
              <UserIcon size={16} className="opacity-60 mr-2" aria-hidden="true" />
              <span>Edit Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <SettingsIcon size={16} className="opacity-60 mr-2" aria-hidden="true" />
            <span>Settings</span>
          </DropdownMenuItem>

          {userData?.phone && (
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <PhoneIcon size={16} className="opacity-60 mr-2" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">Phone</span>
              </div>
              <span className="text-xs font-mono">{userData.phone}</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOutIcon size={16} className="opacity-60 mr-2" aria-hidden="true" />
          <span>{isLoggingOut ? 'Signing out...' : 'Sign out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
