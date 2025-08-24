import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { IUser } from "@/types";
import { Users, UserCheck, UserX, Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
    title: string;
    users: IUser[];
    loading?: boolean;
    type: 'users' | 'agents';
}

interface StatusData {
    total: number;
    active: number;
    inactive: number;
    activePercentage: number;
    inactivePercentage: number;
}

export function StatusCard({ title, users, loading = false, type }: StatusCardProps) {
    const getStatusData = (): StatusData => {
        if (!users?.length) {
            return {
                total: 0,
                active: 0,
                inactive: 0,
                activePercentage: 0,
                inactivePercentage: 0,
            };
        }

        let active = 0;
        let inactive = 0;

        if (type === 'users') {
            // For users: active = not blocked, inactive = blocked
            active = users.filter(user => !user.isBlocked).length;
            inactive = users.filter(user => user.isBlocked).length;
        } else {
            // For agents: active = approved, inactive = pending/suspended
            active = users.filter(user => user.status === 'approved').length;
            inactive = users.filter(user => user.status !== 'approved').length;
        }

        const total = users.length;

        return {
            total,
            active,
            inactive,
            activePercentage: total > 0 ? (active / total) * 100 : 0,
            inactivePercentage: total > 0 ? (inactive / total) * 100 : 0,
        };
    };

    const statusData = getStatusData();

    const getIcon = () => {
        if (type === 'users') {
            return <Users className="h-5 w-5" />;
        }
        return <Shield className="h-5 w-5" />;
    };

    const getActiveLabel = () => {
        return type === 'users' ? 'Active' : 'Approved';
    };

    const getInactiveLabel = () => {
        return type === 'users' ? 'Blocked' : 'Pending/Suspended';
    };

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        {getIcon()}
                        <span>{title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                    <LoadingSpinner />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    {getIcon()}
                    <span>{title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Total Count */}
                    <div className="text-center">
                        <p className="text-3xl font-bold">{statusData.total}</p>
                        <p className="text-sm text-muted-foreground">Total {title}</p>
                    </div>

                    {/* Status Breakdown */}
                    <div className="space-y-4">
                        {/* Active Status */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="flex h-3 w-3 items-center justify-center">
                                    {type === 'users' ? (
                                        <UserCheck className="h-3 w-3 text-green-600" />
                                    ) : (
                                        <ShieldCheck className="h-3 w-3 text-green-600" />
                                    )}
                                </div>
                                <span className="text-sm font-medium">{getActiveLabel()}</span>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-green-600">{statusData.active}</p>
                                <p className="text-xs text-muted-foreground">
                                    {statusData.activePercentage.toFixed(1)}%
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar for Active */}
                        <div className="w-full bg-muted rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${statusData.activePercentage}%` }}
                            />
                        </div>

                        {/* Inactive Status */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="flex h-3 w-3 items-center justify-center">
                                    {type === 'users' ? (
                                        <UserX className="h-3 w-3 text-red-600" />
                                    ) : (
                                        <ShieldAlert className="h-3 w-3 text-orange-600" />
                                    )}
                                </div>
                                <span className="text-sm font-medium">{getInactiveLabel()}</span>
                            </div>
                            <div className="text-right">
                                <p className={cn(
                                    "text-sm font-bold",
                                    type === 'users' ? "text-red-600" : "text-orange-600"
                                )}>
                                    {statusData.inactive}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {statusData.inactivePercentage.toFixed(1)}%
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar for Inactive */}
                        <div className="w-full bg-muted rounded-full h-2">
                            <div
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    type === 'users' ? "bg-red-500" : "bg-orange-500"
                                )}
                                style={{ width: `${statusData.inactivePercentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Health Score */}
                    <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Health Score</span>
                            <span className={cn(
                                "text-sm font-bold",
                                statusData.activePercentage >= 80 ? "text-green-600" :
                                    statusData.activePercentage >= 60 ? "text-yellow-600" : "text-red-600"
                            )}>
                                {statusData.activePercentage.toFixed(0)}%
                            </span>
                        </div>
                        <div className="mt-2 w-full bg-muted rounded-full h-2">
                            <div
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    statusData.activePercentage >= 80 ? "bg-green-500" :
                                        statusData.activePercentage >= 60 ? "bg-yellow-500" : "bg-red-500"
                                )}
                                style={{ width: `${statusData.activePercentage}%` }}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
