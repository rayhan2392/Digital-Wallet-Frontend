import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { QuickAction } from "@/constants/quickActions";

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


