import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { CurrencyDisplay } from "./CurrencyDisplay";
import {
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    Smartphone,
    Clock,
    CheckCircle,
    XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ITransaction } from "@/types";
import { Badge } from "../ui/badge";

interface TransactionItemProps {
    transaction: ITransaction;
    showAvatar?: boolean;
    className?: string;
    onClick?: () => void;
}

export function TransactionItem({
    transaction,
    showAvatar = true,
    className,
    onClick
}: TransactionItemProps) {
    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'cash_in':
                return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
            case 'cash_out':
                return <ArrowUpRight className="h-4 w-4 text-red-600" />;
            case 'send_money':
                return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
            case 'payment':
                return <CreditCard className="h-4 w-4 text-purple-600" />;
            case 'recharge':
                return <Smartphone className="h-4 w-4 text-orange-600" />;
            default:
                return <CheckCircle className="h-4 w-4 text-gray-600" />;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-600" />;
            case 'failed':
                return <XCircle className="h-4 w-4 text-red-600" />;
            default:
                return <Clock className="h-4 w-4 text-gray-600" />;
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'completed':
                return 'default';
            case 'pending':
                return 'secondary';
            case 'failed':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getAmountVariant = (type: string) => {
        switch (type) {
            case 'cash_in':
                return 'positive';
            case 'cash_out':
            case 'send_money':
            case 'payment':
            case 'recharge':
                return 'negative';
            default:
                return 'default';
        }
    };

    const formatTransactionType = (type: string) => {
        return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={cn(
            "flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:bg-accent/20 hover:border-accent cursor-pointer",
            className
        )} onClick={onClick}>
            <div className="flex items-center space-x-4">
                {showAvatar && (
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getInitials(transaction.sender.name)}
                        </AvatarFallback>
                    </Avatar>
                )}

                <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                        {getTransactionIcon(transaction.type)}
                        <span className="font-medium text-sm">
                            {formatTransactionType(transaction.type)}
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {transaction.sender.name} → {transaction.receiver.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {formatTime(transaction.createdAt)}
                    </p>
                </div>
            </div>

            <div className="flex items-center space-x-3">
                <div className="text-right">
                    <CurrencyDisplay
                        amount={transaction.amount}
                        variant={getAmountVariant(transaction.type)}
                        size="md"
                        showSign={transaction.type === 'cash_in'}
                    />
                    <div className="flex items-center justify-end space-x-1 mt-1">
                        {getStatusIcon(transaction.status)}
                        <Badge variant={getStatusVariant(transaction.status)} className="text-xs">
                            {transaction.status}
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    );
}
