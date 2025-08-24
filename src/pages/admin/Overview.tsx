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
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <span>Dashboard Overview</span>
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your digital wallet platform.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change={stats.userGrowth}
          icon={<Users className="h-6 w-6" />}
          gradient="blue"
          className="animate-in slide-in-from-left-1 duration-300"
        />
        <StatsCard
          title="Total Agents"
          value={stats.totalAgents.toLocaleString()}
          change={stats.agentGrowth}
          icon={<Shield className="h-6 w-6" />}
          gradient="green"
          className="animate-in slide-in-from-left-2 duration-300 delay-75"
        />
        <StatsCard
          title="Transactions"
          value={stats.totalTransactions.toLocaleString()}
          change={stats.transactionGrowth}
          icon={<ArrowUpDown className="h-6 w-6" />}
          gradient="purple"
          className="animate-in slide-in-from-left-3 duration-300 delay-150"
        />
        <StatsCard
          title="Total Volume"
          value={`৳${(stats.totalVolume / 1000000).toFixed(1)}M`}
          change={stats.volumeGrowth}
          icon={<DollarSign className="h-6 w-6" />}
          gradient="orange"
          className="animate-in slide-in-from-left-4 duration-300 delay-225"
        />
      </div>

      {/* Middle Section: Charts and Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="animate-in slide-in-from-bottom-1 duration-500 delay-300">
          <TransactionChart
            transactions={transactions || []}
            loading={transactionsLoading}
          />
        </div>
        <div className="animate-in slide-in-from-bottom-2 duration-500 delay-375">
          <ActivityFeed
            transactions={transactions || []}
            users={allUsers}
            loading={transactionsLoading || usersLoading}
          />
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="animate-in slide-in-from-bottom-3 duration-500 delay-450">
          <StatusCard
            title="User Status"
            users={regularUsers}
            loading={regularUsersLoading}
            type="users"
          />
        </div>
        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-525">
          <StatusCard
            title="Agent Status"
            users={agents}
            loading={agentsLoading}
            type="agents"
          />
        </div>
      </div>

      {/* Success Message */}
      <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg animate-in slide-in-from-bottom-5 duration-500 delay-600">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <p className="text-sm font-medium text-green-800">
            Your platform is performing excellently! Keep up the great work.
          </p>
        </div>
      </div>
    </div>
  );
}