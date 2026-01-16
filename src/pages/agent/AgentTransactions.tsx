
import { ArrowUpRight, ArrowDownLeft, Activity, ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react";
import { useNavigate } from "react-router";

import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CurrencyDisplay } from "@/components/fintech/CurrencyDisplay";
import { cn } from "@/lib/utils";
import type { TTransactionType, TTransactionStatus } from "@/types";

export default function AgentTransactions() {
  const navigate = useNavigate();
  const { data: transactions = [], isLoading } = useGetMyTransactionsQuery({});

  const getTransactionIcon = (type: TTransactionType, status?: TTransactionStatus) => {
    if (status === 'failed') return <XCircle className="h-4 w-4 text-red-600" />;
    if (status === 'pending') return <Clock className="h-4 w-4 text-yellow-600" />;

    switch (type) {
      case 'cash_in':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'cash_out':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: TTransactionStatus) => {
    const variants = {
      completed: "bg-green-500/10 text-green-700",
      pending: "bg-yellow-500/10 text-yellow-700",
      failed: "bg-red-500/10 text-red-700",
      cancelled: "bg-gray-500/10 text-gray-700"
    };

    return (
      <Badge className={cn("text-xs", variants[status])}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const cashInTransactions = transactions.filter(t => t.type === 'cash_in' && t.status === 'completed');
  const totalCommission = cashInTransactions.reduce((sum, t) => sum + Math.max(t.amount * 0.002, 2), 0);

  return (
    <div className="min-h-screen fintech-hero-bg">
      <div className="fintech-container py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/agent/overiview")}
              className="h-9 w-9 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold fintech-gradient-text">My Transactions</h1>
              <p className="text-muted-foreground">View your transaction history</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="fintech-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Activity className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Transactions</p>
                    <p className="text-xl font-bold">{transactions.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fintech-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <ArrowDownLeft className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cash-In Count</p>
                    <p className="text-xl font-bold">{cashInTransactions.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fintech-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <span className="text-green-600 font-bold">৳</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Commission</p>
                    <CurrencyDisplay amount={totalCommission} size="lg" variant="positive" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transactions List */}
          <Card className="fintech-card">
            <CardHeader>
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No transactions yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.slice(0, 10).map((transaction) => (
                    <div
                      key={transaction._id}
                      className="flex items-start justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mt-1",
                          transaction.type === "cash_in" ? "bg-green-500/20" : "bg-blue-500/20"
                        )}>
                          {getTransactionIcon(transaction.type, transaction.status)}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {transaction.type === 'cash_in' ? 'Cash-In Service' :
                                transaction.type === 'cash_out' ? 'Cash-Out Service' :
                                  transaction.type === 'send_money' ? 'Money Transfer' : 'Transaction'}
                            </span>
                            {getStatusBadge(transaction.status)}
                          </div>
                          <div className="text-sm space-y-1">
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">From:</span> {transaction.sender.name} ({transaction.sender.phone})
                            </p>
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">To:</span> {transaction.receiver.name} ({transaction.receiver.phone})
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="text-right mt-1">
                        <CurrencyDisplay
                          amount={transaction.amount}
                          size="md"
                          variant={transaction.type === 'cash_in' ? 'positive' : 'default'}
                        />
                        {transaction.type === 'cash_in' && transaction.status === 'completed' && (
                          <p className="text-xs text-green-600 mt-1">
                            +৳{Math.max(transaction.amount * 0.002, 2).toFixed(2)} commission
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {transactions.length > 10 && (
                    <div className="text-center pt-4">
                      <p className="text-sm text-muted-foreground">
                        Showing latest 10 transactions of {transactions.length} total
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}