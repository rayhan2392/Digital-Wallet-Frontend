import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon: React.ReactNode;
    loading?: boolean;
    gradient?: "blue" | "green" | "purple" | "orange";
    className?: string;
}

export function StatsCard({
    title,
    value,
    change,
    changeLabel = "vs last month",
    icon,
    loading = false,
    gradient = "blue",
    className,
}: StatsCardProps) {
    const gradientClasses = {
        blue: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20",
        green: "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20",
        purple: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20",
        orange: "bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20",
    };

    const iconClasses = {
        blue: "text-blue-600 bg-blue-500/10",
        green: "text-green-600 bg-green-500/10",
        purple: "text-purple-600 bg-purple-500/10",
        orange: "text-orange-600 bg-orange-500/10",
    };

    const getTrendIcon = () => {
        if (change === undefined || change === 0) return <Minus className="h-3 w-3" />;
        return change > 0 ? (
            <TrendingUp className="h-3 w-3" />
        ) : (
            <TrendingDown className="h-3 w-3" />
        );
    };

    const getTrendColor = () => {
        if (change === undefined || change === 0) return "text-muted-foreground";
        return change > 0 ? "text-green-600" : "text-red-600";
    };

    return (
        <Card
            className={cn(
                "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border",
                gradientClasses[gradient],
                className
            )}
        >
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        {loading ? (
                            <div className="flex items-center space-x-2">
                                <LoadingSpinner size="sm" />
                                <span className="text-2xl font-bold">--</span>
                            </div>
                        ) : (
                            <p className="text-3xl font-bold tracking-tight">{value}</p>
                        )}
                        {change !== undefined && !loading && (
                            <div className={cn("flex items-center space-x-1 text-xs", getTrendColor())}>
                                {getTrendIcon()}
                                <span>{Math.abs(change)}% {changeLabel}</span>
                            </div>
                        )}
                    </div>
                    <div
                        className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-lg",
                            iconClasses[gradient]
                        )}
                    >
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
