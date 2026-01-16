import {
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    Smartphone,
    Users,
    BarChart3
} from "lucide-react";

interface QuickAction {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    onClick: () => void;
    gradient?: "blue" | "green" | "purple" | "orange";
    disabled?: boolean;
}

// Pre-defined action sets for different user types
export const adminQuickActions: QuickAction[] = [
    {
        id: "users",
        label: "Manage Users",
        icon: Users,
        gradient: "blue",
        onClick: () => {/* Navigate to users */ }
    },
    {
        id: "agents",
        label: "Manage Agents",
        icon: BarChart3,
        gradient: "green",
        onClick: () => {/* Navigate to agents */ }
    },
    {
        id: "transactions",
        label: "View Transactions",
        icon: CreditCard,
        gradient: "purple",
        onClick: () => {/* Navigate to transactions */ }
    },
    {
        id: "analytics",
        label: "Analytics",
        icon: BarChart3,
        gradient: "orange",
        onClick: () => {/* Navigate to analytics */ }
    }
];

export const userQuickActions: QuickAction[] = [
    {
        id: "send",
        label: "Send Money",
        icon: ArrowUpRight,
        gradient: "blue",
        onClick: () => {/* Open send modal */ }
    },
    {
        id: "request",
        label: "Request Money",
        icon: ArrowDownLeft,
        gradient: "green",
        onClick: () => {/* Open request modal */ }
    },
    {
        id: "pay",
        label: "Pay Bills",
        icon: CreditCard,
        gradient: "purple",
        onClick: () => {/* Open pay modal */ }
    },
    {
        id: "recharge",
        label: "Mobile Recharge",
        icon: Smartphone,
        gradient: "orange",
        onClick: () => {/* Open recharge modal */ }
    }
];

export type { QuickAction };
