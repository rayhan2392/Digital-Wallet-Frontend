import { useGetAllUsersQuery } from "@/redux/features/admin/admin.api";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TransactionChart } from "@/components/dashboard/TransactionChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { LoadingState } from "@/components/common/LoadingStates";
import {
  Users,
  Shield,
  ArrowUpDown,
  DollarSign,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { useMemo } from "react";

export default function Overview() {
  // Fetch all data in parallel
  const {
    data: allUsersResponse,
    isLoading: usersLoading,
    error: usersError
  } = useGetAllUsersQuery({});

  const {
    data: allAgentsResponse,
    isLoading: agentsLoading,
    error: agentsError
  } = useGetAllUsersQuery({ role: "agent" });

  const {
    data: regularUsersResponse,
    isLoading: regularUsersLoading,
    error: regularUsersError
  } = useGetAllUsersQuery({ role: "user" });

  const {
    data: transactions,
    isLoading: transactionsLoading,
    error: transactionsError
  } = useGetAllTransactionsQuery({});

  // Extract data from API responses with memoization
  const allUsers = useMemo(() => allUsersResponse?.data || [], [allUsersResponse?.data]);
  const agents = useMemo(() => allAgentsResponse?.data || [], [allAgentsResponse?.data]);
  const regularUsers = useMemo(() => regularUsersResponse?.data || [], [regularUsersResponse?.data]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalUsers = regularUsers.length;
    const totalAgents = agents.length;
    const totalTransactions = transactions?.length || 0;
    const totalVolume = transactions?.reduce((sum, t) => sum + t.amount, 0) || 0;

    // Calculate growth (mock data for now - you can implement real historical comparison)
    const userGrowth = 12.5;
    const agentGrowth = 8.2;
    const transactionGrowth = 23.7;
    const volumeGrowth = 15.3;

    return {
      totalUsers,
      totalAgents,
      totalTransactions,
      totalVolume,
      userGrowth,
      agentGrowth,
      transactionGrowth,
      volumeGrowth,
    };
  }, [regularUsers, agents, transactions]);

  // Handle loading states
  const isLoading = usersLoading || agentsLoading || regularUsersLoading || transactionsLoading;
  const hasError = usersError || agentsError || regularUsersError || transactionsError;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (hasError) {
    return (
      <LoadingState
        type="page"
        message="Failed to load dashboard data. Please try again."
      />
    );
  }

  return (
    <div className="min-h-screen fintech-hero-bg">
      <div className="fintech-container space-y-8 py-8">
        {/* Page Header */}
        <div className="text-center space-y-4 fintech-fade-in">
          <div className="flex items-center justify-center space-x-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm">
              <BarChart3 className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="fintech-gradient-text text-4xl md:text-5xl font-bold tracking-tight">
            SwiftPay Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome back! Here's your comprehensive overview of the SwiftPay fintech platform performance.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            change={stats.userGrowth}
            icon={<Users className="h-7 w-7" />}
            gradient="blue"
            className="fintech-scale-in"
          />
          <StatsCard
            title="Total Agents"
            value={stats.totalAgents.toLocaleString()}
            change={stats.agentGrowth}
            icon={<Shield className="h-7 w-7" />}
            gradient="green"
            className="fintech-scale-in delay-75"
          />
          <StatsCard
            title="Transactions"
            value={stats.totalTransactions.toLocaleString()}
            change={stats.transactionGrowth}
            icon={<ArrowUpDown className="h-7 w-7" />}
            gradient="purple"
            className="fintech-scale-in delay-150"
          />
          <StatsCard
            title="Total Volume"
            value={`৳${(stats.totalVolume / 1000000).toFixed(1)}M`}
            change={stats.volumeGrowth}
            icon={<DollarSign className="h-7 w-7" />}
            gradient="orange"
            className="fintech-scale-in delay-225"
          />
        </div>

        {/* Middle Section: Charts and Activity */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="fintech-slide-up delay-300">
            <TransactionChart
              transactions={transactions || []}
              loading={transactionsLoading}
            />
          </div>
          <div className="fintech-slide-up delay-375">
            <ActivityFeed
              transactions={transactions || []}
              users={allUsers}
              loading={transactionsLoading || usersLoading}
            />
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="fintech-slide-up delay-450">
            <StatusCard
              title="User Status"
              users={regularUsers}
              loading={regularUsersLoading}
              type="users"
            />
          </div>
          <div className="fintech-slide-up delay-525">
            <StatusCard
              title="Agent Status"
              users={agents}
              loading={agentsLoading}
              type="agents"
            />
          </div>
        </div>

        {/* Success Message */}
        <div className="fintech-card-glass p-8 text-center fintech-slide-up delay-600">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
              Platform Excellence
            </h3>
          </div>
          <p className="text-lg font-medium text-green-700 dark:text-green-300">
            🚀 SwiftPay is performing exceptionally! Your fintech platform is ready to scale.
          </p>
        </div>
      </div>
    </div>
  );
}