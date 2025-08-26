import { ArrowDownLeft, Activity, Plus, Eye, DollarSign } from "lucide-react";
import { useNavigate } from "react-router";

import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BalanceCard } from "@/components/fintech/BalanceCard";
import { CurrencyDisplay } from "@/components/fintech/CurrencyDisplay";
import { SecurityBadge } from "@/components/fintech/SecurityBadge";

export default function AgentOverview() {
  const navigate = useNavigate();
  const { data: transactions = [] } = useGetMyTransactionsQuery({});
  const { data: myWallet } = useGetMyWalletQuery(undefined);

  // Calculate today's stats
  const today = new Date().toDateString();
  const todayTransactions = transactions.filter(t =>
    new Date(t.createdAt).toDateString() === today
  );

  const todayCashIn = todayTransactions.filter(t => t.type === 'cash_in' && t.status === 'completed');
  const todayCommission = todayCashIn.reduce((sum, t) => sum + Math.max(t.amount * 0.002, 2), 0);
  const todayCashInAmount = todayCashIn.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold fintech-gradient-text">Agent Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your overview for today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <SecurityBadge type="verified" size="sm" />
          <SecurityBadge type="ssl" size="sm" />
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Agent Wallet */}
        <BalanceCard
          title="Agent Wallet"
          balance={myWallet?.balance || 0}
          gradient="primary"
          className="md:col-span-2 lg:col-span-1"
        />

        {/* Today's Cash-In */}
        <Card className="fintech-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                <ArrowDownLeft className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Cash-In</p>
                <CurrencyDisplay
                  amount={todayCashInAmount}
                  size="xl"
                  variant="positive"
                />
                <p className="text-xs text-muted-foreground">{todayCashIn.length} transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Commission */}
        <Card className="fintech-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Commission</p>
                <CurrencyDisplay
                  amount={todayCommission}
                  size="xl"
                  variant="positive"
                  showSign
                />
                <p className="text-xs text-green-600">Your earnings today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="fintech-card">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button
              onClick={() => navigate("/agent/add-money")}
              className="h-16 text-left flex items-center space-x-4 justify-start bg-primary hover:bg-primary/90"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Process Cash-In</p>
                <p className="text-sm opacity-90">Add money to customer wallet</p>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/agent/transactions")}
              className="h-16 text-left flex items-center space-x-4 justify-start"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">View Transactions</p>
                <p className="text-sm text-muted-foreground">Check transaction history</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="fintech-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Recent Activity</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/agent/transactions")}
            >
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No transactions yet</h3>
              <p className="text-muted-foreground mb-4">Start by processing your first cash-in transaction</p>
              <Button onClick={() => navigate("/agent/add-money")}>
                Process Cash-In
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 3).map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <ArrowDownLeft className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {transaction.type === 'cash_in' ? 'Cash-In Service' : 'Transaction'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.type === 'cash_in'
                          ? `From ${transaction.sender.name}`
                          : `To ${transaction.receiver.name}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <CurrencyDisplay
                      amount={transaction.amount}
                      size="sm"
                      variant={transaction.type === 'cash_in' ? 'positive' : 'default'}
                    />
                    {transaction.type === 'cash_in' && transaction.status === 'completed' && (
                      <p className="text-xs text-green-600">
                        +৳{Math.max(transaction.amount * 0.002, 2).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}