import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    Smartphone,
    Users,
    BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAction {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    onClick: () => void;
    gradient?: "blue" | "green" | "purple" | "orange";
    disabled?: boolean;
}

interface QuickActionsProps {
    actions: QuickAction[];
    className?: string;
    title?: string;
}

export function QuickActions({ actions, className, title = "Quick Actions" }: QuickActionsProps) {
    const gradientClasses = {
        blue: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border-blue-500/20",
        green: "bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border-green-500/20",
        purple: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border-purple-500/20",
        orange: "bg-gradient-to-br from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 border-orange-500/20",
    };

    const iconColors = {
        blue: "text-blue-600",
        green: "text-green-600",
        purple: "text-purple-600",
        orange: "text-orange-600",
    };

    return (
        <Card className={cn("fintech-card", className)}>
            <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">{title}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {actions.map((action) => {
                        const Icon = action.icon;
                        const gradient = action.gradient || "blue";

                        return (
                            <Button
                                key={action.id}
                                variant="ghost"
                                onClick={action.onClick}
                                disabled={action.disabled}
                                className={cn(
                                    "h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-300 hover:scale-105",
                                    gradientClasses[gradient],
                                    action.disabled && "opacity-50 cursor-not-allowed hover:scale-100"
                                )}
                            >
                                <div className={cn(
                                    "p-2 rounded-lg bg-background/50",
                                    iconColors[gradient]
                                )}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <span className="text-xs font-medium text-center leading-tight">
                                    {action.label}
                                </span>
                            </Button>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
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
