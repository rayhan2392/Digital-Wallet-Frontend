import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { ITransaction } from "@/types";
import { useMemo } from "react";

interface TransactionChartProps {
    transactions: ITransaction[];
    loading?: boolean;
}



export function TransactionChart({ transactions, loading = false }: TransactionChartProps) {
    const chartData = useMemo(() => {
        if (!transactions?.length) return [];

        const typeStats = transactions.reduce((acc, transaction) => {
            const type = transaction.type;
            if (!acc[type]) {
                acc[type] = { count: 0, totalAmount: 0 };
            }
            acc[type].count += 1;
            acc[type].totalAmount += transaction.amount;
            return acc;
        }, {} as Record<string, { count: number; totalAmount: number }>);

        const totalTransactions = transactions.length;
        const colors = {
            cash_in: "#10b981", // green
            cash_out: "#ef4444", // red
            send_money: "#3b82f6", // blue
            payment: "#8b5cf6", // purple
            recharge: "#f59e0b", // orange
        };

        return Object.entries(typeStats).map(([type, stats]) => ({
            type: type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            count: stats.count,
            percentage: (stats.count / totalTransactions) * 100,
            color: colors[type as keyof typeof colors] || "#6b7280",
            totalAmount: stats.totalAmount,
        }));
    }, [transactions]);

    const totalAmount = useMemo(() => {
        return transactions?.reduce((sum, transaction) => sum + transaction.amount, 0) || 0;
    }, [transactions]);

    if (loading) {
        return (
            <Card variant="fintech" className="col-span-1">
                <CardHeader>
                    <CardTitle className="fintech-gradient-text">Transaction Distribution</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                    <LoadingSpinner />
                </CardContent>
            </Card>
        );
    }

    if (!chartData.length) {
        return (
            <Card variant="fintech" className="col-span-1">
                <CardHeader>
                    <CardTitle className="fintech-gradient-text">Transaction Distribution</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                    <p className="text-muted-foreground">No transaction data available</p>
                </CardContent>
            </Card>
        );
    }

    const radius = 80;
    const centerX = 120;
    const centerY = 120;
    let currentAngle = -90; // Start from top

    return (
        <Card variant="fintech" className="col-span-1 relative overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                        <svg className="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z" />
                        </svg>
                    </div>
                    <span className="fintech-gradient-text">Transaction Distribution</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    {/* SVG Donut Chart */}
                    <div className="relative">
                        <svg width="240" height="240" className="transform -rotate-90">
                            {chartData.map((item, index) => {
                                const strokeDasharray = `${(item.percentage / 100) * 2 * Math.PI * radius} ${2 * Math.PI * radius
                                    }`;
                                const strokeDashoffset = -((currentAngle + 90) / 360) * 2 * Math.PI * radius;
                                currentAngle += (item.percentage / 100) * 360;

                                return (
                                    <circle
                                        key={index}
                                        cx={centerX}
                                        cy={centerY}
                                        r={radius}
                                        fill="none"
                                        stroke={item.color}
                                        strokeWidth="20"
                                        strokeDasharray={strokeDasharray}
                                        strokeDashoffset={strokeDashoffset}
                                        className="transition-all duration-300 hover:stroke-width-[25]"
                                    />
                                );
                            })}
                        </svg>
                        {/* Center text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold">৳{(totalAmount / 1000000).toFixed(1)}M</p>
                            <p className="text-sm text-muted-foreground">Total Volume</p>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="space-y-3">
                        {chartData.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <div
                                    className="h-3 w-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">{item.type}</p>
                                        <p className="text-sm text-muted-foreground">{item.percentage.toFixed(1)}%</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {item.count} transactions • ৳{(item.totalAmount / 1000).toFixed(0)}K
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
