import { Shield, Lock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecurityBadgeProps {
    type: "ssl" | "encrypted" | "verified";
    className?: string;
    size?: "sm" | "md" | "lg";
}

export function SecurityBadge({ type, className, size = "md" }: SecurityBadgeProps) {
    const configs = {
        ssl: {
            icon: Shield,
            text: "SSL Secured",
            color: "text-green-600",
            bg: "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800/30"
        },
        encrypted: {
            icon: Lock,
            text: "256-bit Encrypted",
            color: "text-blue-600",
            bg: "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800/30"
        },
        verified: {
            icon: CheckCircle,
            text: "Bank Verified",
            color: "text-emerald-600",
            bg: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800/30"
        }
    };

    const sizeClasses = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base"
    };

    const iconSizes = {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5"
    };

    const config = configs[type];
    const Icon = config.icon;

    return (
        <div className={cn(
            "inline-flex items-center space-x-2 rounded-full border font-medium transition-all duration-200 hover:scale-105",
            config.bg,
            config.color,
            sizeClasses[size],
            className
        )}>
            <Icon className={iconSizes[size]} />
            <span>{config.text}</span>
        </div>
    );
}
