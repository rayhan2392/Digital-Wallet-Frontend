import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { BalanceCard } from "@/components/fintech/BalanceCard";
import { QuickActions } from "@/components/fintech/QuickActions";
import { TransactionItem } from "@/components/fintech/TransactionItem";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingState } from "@/components/common/LoadingStates";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  TrendingUp,
  RefreshCw,
  Plus,
  History,
  PiggyBank,
  Target
} from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export default function MyWallet() {
  const navigate = useNavigate();

  const { data: myWallet, isLoading: walletLoading, refetch: refetchWallet } = useGetMyWalletQuery(undefined);
  const { data: userData } = useUserInfoQuery(undefined);
  const { data: transactions = [], isLoading: transactionsLoading } = useGetMyTransactionsQuery({});

  // Calculate wallet statistics
  const walletStats = useMemo(() => {
    if (!transactions.length) return { totalSpent: 0, totalReceived: 0, thisMonth: 0, transactionCount: 0 };

    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    const stats = transactions.reduce((acc, transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      const isThisMonth = transactionDate.getMonth() === thisMonth && transactionDate.getFullYear() === thisYear;

      if (transaction.type === 'cash_in') {
        acc.totalReceived += transaction.amount;
      } else {
        acc.totalSpent += transaction.amount;
      }

      if (isThisMonth) {
        acc.thisMonth += transaction.amount;
      }

      return acc;
    }, { totalSpent: 0, totalReceived: 0, thisMonth: 0 });

    return {
      ...stats,
      transactionCount: transactions.length
    };
  }, [transactions]);

  // Quick actions configuration
  const quickActions = [
    {
      id: "send",
      label: "Send Money",
      icon: ArrowUpRight,
      gradient: "blue" as const,
      onClick: () => navigate("/user/send-money")
    },
    {
      id: "withdraw",
      label: "Withdraw",
      icon: ArrowDownLeft,
      gradient: "green" as const,
      onClick: () => navigate("/user/withdraw")
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: History,
      gradient: "purple" as const,
      onClick: () => navigate("/user/transactions")
    },
    {
      id: "profile",
      label: "Profile",
      icon: CreditCard,
      gradient: "orange" as const,
      onClick: () => navigate("/user/profile")
    }
  ];

  // Recent transactions (last 5)
  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 5);
  }, [transactions]);

  if (walletLoading) {
    return (
      <LoadingState
        type="page"
        message="Loading your wallet..."
      />
    );
  }

  return (
    <div className="min-h-screen fintech-hero-bg">
      <div className="fintech-container space-y-8 py-8">

        {/* Wallet Header */}
        <div className="text-center space-y-4 fintech-fade-in">
          <div className="flex items-center justify-center space-x-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm">
              <Wallet className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="fintech-gradient-text text-4xl md:text-5xl font-bold tracking-tight">
              My Wallet
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
              {getGreeting()}, {userData?.name || 'User'}! Manage your finances with ease.
            </p>
          </div>

          {/* Refresh Button */}
          <Button
            variant="fintech-ghost"
            size="sm"
            onClick={() => refetchWallet()}
            className="mt-4"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Balance
          </Button>
        </div>

        {/* Main Balance Card */}
        <div className="fintech-scale-in">
          <BalanceCard
            title="Available Balance"
            balance={myWallet?.balance || 0}
            currency="৳"
            hideBalance={false}
            className="max-w-md mx-auto"
            gradient="primary"
          />
        </div>

        {/* Quick Actions */}
        <div className="fintech-slide-up delay-150">
          <QuickActions
            actions={quickActions}
            title="Quick Actions"
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 fintech-slide-up delay-300">
          <StatsCard
            title="Total Spent"
            value={`৳${walletStats.totalSpent.toLocaleString()}`}
            icon={<ArrowUpRight className="h-6 w-6" />}
            gradient="blue"
            className="fintech-scale-in"
          />
          <StatsCard
            title="Total Received"
            value={`৳${walletStats.totalReceived.toLocaleString()}`}
            icon={<ArrowDownLeft className="h-6 w-6" />}
            gradient="green"
            className="fintech-scale-in delay-75"
          />
          <StatsCard
            title="This Month"
            value={`৳${walletStats.thisMonth.toLocaleString()}`}
            icon={<TrendingUp className="h-6 w-6" />}
            gradient="purple"
            className="fintech-scale-in delay-150"
          />
          <StatsCard
            title="Transactions"
            value={walletStats.transactionCount.toString()}
            icon={<CreditCard className="h-6 w-6" />}
            gradient="orange"
            className="fintech-scale-in delay-225"
          />
        </div>

        {/* Recent Transactions */}
        <div className="fintech-slide-up delay-450">
          <Card variant="fintech" className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                    <History className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="fintech-gradient-text">Recent Transactions</span>
                </CardTitle>
                <Button
                  variant="fintech-ghost"
                  size="sm"
                  onClick={() => navigate("/user/transactions")}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {transactionsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingState type="card" message="Loading transactions..." />
                </div>
              ) : recentTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="p-4 rounded-full bg-muted/20 w-fit mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Transactions Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start using your wallet by sending money or making payments.
                  </p>
                  <Button
                    variant="fintech-primary"
                    onClick={() => navigate("/user/send-money")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Send Money
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <TransactionItem
                      key={transaction._id}
                      transaction={transaction}
                      showAvatar={true}
                      className="fintech-fade-in"
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Wallet Tips Card */}
        <div className="fintech-slide-up delay-600">
          <Card className="fintech-card-glass max-w-2xl mx-auto">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                  <PiggyBank className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
                  Smart Spending Tip
                </h3>
              </div>
              <p className="text-lg font-medium text-green-700 dark:text-green-300 mb-4">
                💡 Track your spending patterns to make better financial decisions!
              </p>
              <Badge variant="success" className="text-sm">
                <Target className="h-3 w-3 mr-1" />
                Your wallet is secured with bank-level encryption
              </Badge>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}