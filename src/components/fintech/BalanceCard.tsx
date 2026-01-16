import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
    title: string;
    balance: number;
    currency?: string;
    change?: number;
    changeLabel?: string;
    hideBalance?: boolean;
    className?: string;
    gradient?: "primary" | "success" | "warning";
}

export function BalanceCard({
    title,
    balance,
    currency = "৳",
    change,
    changeLabel = "vs last month",
    hideBalance = false,
    className,
    gradient = "primary"
}: BalanceCardProps) {
    const [isHidden, setIsHidden] = useState(hideBalance);

    const gradientClasses = {
        primary: "bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20",
        success: "bg-gradient-to-br from-green-500/10 via-green-500/5 to-background border-green-500/20",
        warning: "bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-background border-yellow-500/20",
    };

    const formatBalance = (amount: number) => {
        if (isHidden) return "****";
        return amount.toLocaleString();
    };

    const getTrendIcon = () => {
        if (!change) return null;
        return change > 0 ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
        ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
        );
    };

    const getTrendColor = () => {
        if (!change) return "text-muted-foreground";
        return change > 0 ? "text-green-600" : "text-red-600";
    };

    return (
        <Card className={cn(
            "fintech-card overflow-hidden relative",
            gradientClasses[gradient],
            className
        )}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <div className="flex items-center space-x-3">
                            <p className="text-3xl font-bold tracking-tight">
                                {currency}{formatBalance(balance)}
                            </p>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsHidden(!isHidden)}
                                className="h-8 w-8 p-0 hover:bg-background/50"
                            >
                                {isHidden ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                        {change && (
                            <div className={cn("flex items-center space-x-2 text-sm", getTrendColor())}>
                                {getTrendIcon()}
                                <span>{Math.abs(change)}% {changeLabel}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16 blur-xl" />
            </CardContent>
        </Card>
    );
}
