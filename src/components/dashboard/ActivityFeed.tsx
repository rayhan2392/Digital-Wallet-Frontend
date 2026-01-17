import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { ITransaction, IUser } from "@/types";
import {
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    Smartphone,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityFeedProps {
    transactions: ITransaction[];
    users: IUser[];
    loading?: boolean;
}

interface ActivityItem {
    id: string;
    type: 'transaction' | 'user_activity';
    title: string;
    description: string;
    time: string;
    icon: React.ReactNode;
    color: string;
    amount?: number;
}

export function ActivityFeed({ transactions, users, loading = false }: ActivityFeedProps) {

    // Add recent transactions (last 10)
    const recentTransactions = transactions
        ?.slice(-10)
        .reverse()
        .map((transaction): ActivityItem => {
            const getTransactionIcon = (type: string, status: string) => {
                if (status === 'failed') return <XCircle className="h-4 w-4" />;
                if (status === 'pending') return <Clock className="h-4 w-4" />;

                switch (type) {
                    case 'cash_in':
                        return <ArrowDownLeft className="h-4 w-4" />;
                    case 'cash_out':
                        return <ArrowUpRight className="h-4 w-4" />;
                    case 'send_money':
                        return <ArrowUpRight className="h-4 w-4" />;
                    case 'payment':
                        return <CreditCard className="h-4 w-4" />;
                    case 'recharge':
                        return <Smartphone className="h-4 w-4" />;
                    default:
                        return <CheckCircle className="h-4 w-4" />;
                }
            };

            const getTransactionColor = (type: string, status: string) => {
                if (status === 'failed') return 'text-red-600 bg-red-50';
                if (status === 'pending') return 'text-yellow-600 bg-yellow-50';

                switch (type) {
                    case 'cash_in':
                        return 'text-green-600 bg-green-50';
                    case 'cash_out':
                        return 'text-red-600 bg-red-50';
                    case 'send_money':
                        return 'text-blue-600 bg-blue-50';
                    case 'payment':
                        return 'text-purple-600 bg-purple-50';
                    case 'recharge':
                        return 'text-orange-600 bg-orange-50';
                    default:
                        return 'text-gray-600 bg-gray-50';
                }
            };

            const formatType = (type: string) => {
                return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            };

            return {
                id: transaction._id,
                type: 'transaction',
                title: `${formatType(transaction.type)} Transaction`,
                description: `${transaction?.sender?.name} → ${transaction?.receiver?.name}`,
                time: new Date(transaction.createdAt).toLocaleTimeString(),
                icon: getTransactionIcon(transaction.type, transaction.status),
                color: getTransactionColor(transaction.type, transaction.status),
                amount: transaction.amount,
            };
        }) || [];

    // Add recent user activities (last 5 users)
    const recentUsers = users
        ?.slice(-5)
        .reverse()
        .map((user): ActivityItem => ({
            id: `user-${user._id}`,
            type: 'user_activity',
            title: 'New User Registration',
            description: `${user?.name} joined as ${user.role}`,
            time: new Date().toLocaleTimeString(), // Since we don't have createdAt
            icon: <CheckCircle className="h-4 w-4" />,
            color: 'text-blue-600 bg-blue-50',
        })) || [];

    // Combine and sort activities
    const allActivities = [...recentTransactions, ...recentUsers]
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 8);

    if (loading) {
        return (
            <Card variant="fintech" className="col-span-1">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                            <AlertCircle className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="fintech-gradient-text">Recent Activities</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                    <LoadingSpinner />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card variant="fintech" className="col-span-1 relative overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="fintech-gradient-text">Recent Activities</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {allActivities.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">No recent activities</p>
                    ) : (
                        allActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-3 group">
                                <div className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full",
                                    activity.color
                                )}>
                                    {activity.icon}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium group-hover:text-primary transition-colors">
                                            {activity.title}
                                        </p>
                                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                                    {activity.amount && (
                                        <p className="text-xs font-medium text-green-600">
                                            ৳{activity.amount.toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {allActivities.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                        <button className="text-sm text-primary hover:underline w-full text-center">
                            View all activities
                        </button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
