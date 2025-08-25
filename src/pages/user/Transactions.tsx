import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// Note: Using a simple modal state since Dialog component is not available

import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Smartphone,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,

  TrendingUp,
  TrendingDown,
  Activity,
  Wallet,
  ArrowLeft,
  Eye,
  Users,
  Phone,
  Mail,
  CalendarDays,
  Hash,
  DollarSign,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ITransaction, TTransactionType, TTransactionStatus } from "@/types";

// Transaction filtering types
interface TransactionFilters {
  search: string;
  type: TTransactionType | "all";
  status: TTransactionStatus | "all";
  dateRange: "all" | "today" | "week" | "month" | "year";
}

export default function Transactions() {
  const navigate = useNavigate();
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
  const [filters, setFilters] = useState<TransactionFilters>({
    search: "",
    type: "all",
    status: "all",
    dateRange: "all"
  });

  // API hooks
  const { data: transactions = [], isLoading, error } = useGetMyTransactionsQuery({});
  const { data: userData } = useUserInfoQuery(undefined);

  // Helper functions
  const getTransactionIcon = (type: TTransactionType, status?: TTransactionStatus) => {
    if (status === 'failed') return <XCircle className="h-4 w-4 text-red-600" />;
    if (status === 'pending') return <Clock className="h-4 w-4 text-yellow-600" />;

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

  const getStatusBadge = (status: TTransactionStatus) => {
    const variants = {
      completed: { variant: "default" as const, color: "text-green-700 bg-green-50 border-green-200" },
      pending: { variant: "secondary" as const, color: "text-yellow-700 bg-yellow-50 border-yellow-200" },
      failed: { variant: "destructive" as const, color: "text-red-700 bg-red-50 border-red-200" },
      cancelled: { variant: "outline" as const, color: "text-gray-700 bg-gray-50 border-gray-200" }
    };

    const config = variants[status] || variants.cancelled;

    return (
      <Badge variant={config.variant} className={cn("text-xs font-medium", config.color)}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatTransactionType = (type: TTransactionType) => {
    const typeLabels = {
      cash_in: "Cash In",
      cash_out: "Cash Out",
      send_money: "Send Money",
      payment: "Payment",
      recharge: "Recharge"
    };
    return typeLabels[type] || type;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays === 1) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const isUserSender = useCallback((transaction: ITransaction) => {
    return transaction.sender._id === userData?._id;
  }, [userData?._id]);

  const getTransactionDirection = useCallback((transaction: ITransaction) => {
    return isUserSender(transaction) ? 'outgoing' : 'incoming';
  }, [isUserSender]);

  const getAmountDisplay = (transaction: ITransaction) => {
    const direction = getTransactionDirection(transaction);
    const sign = direction === 'outgoing' ? '-' : '+';
    const colorClass = direction === 'outgoing' ? 'text-red-600' : 'text-green-600';

    return (
      <span className={cn("font-semibold", colorClass)}>
        {sign}৳{transaction.amount.toLocaleString()}
      </span>
    );
  };

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      // Search filter
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = !filters.search ||
        transaction.sender.name.toLowerCase().includes(searchLower) ||
        transaction.receiver.name.toLowerCase().includes(searchLower) ||
        transaction.sender.phone.includes(filters.search) ||
        transaction.receiver.phone.includes(filters.search) ||
        formatTransactionType(transaction.type).toLowerCase().includes(searchLower);

      // Type filter
      const matchesType = filters.type === "all" || transaction.type === filters.type;

      // Status filter
      const matchesStatus = filters.status === "all" || transaction.status === filters.status;

      // Date range filter
      const transactionDate = new Date(transaction.createdAt);
      const now = new Date();
      let matchesDate = true;

      switch (filters.dateRange) {
        case "today":
          matchesDate = transactionDate.toDateString() === now.toDateString();
          break;
        case "week": {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = transactionDate >= weekAgo;
          break;
        }
        case "month": {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = transactionDate >= monthAgo;
          break;
        }
        case "year": {
          const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          matchesDate = transactionDate >= yearAgo;
          break;
        }
        default:
          matchesDate = true;
      }

      return matchesSearch && matchesType && matchesStatus && matchesDate;
    });
  }, [transactions, filters]);

  // Transaction statistics
  const transactionStats = useMemo(() => {
    const stats = {
      total: filteredTransactions.length,
      completed: 0,
      pending: 0,
      failed: 0,
      cancelled: 0,
      totalAmount: 0,
      incoming: 0,
      outgoing: 0
    };

    filteredTransactions.forEach(transaction => {
      // Safely increment status count
      if (transaction.status in stats) {
        (stats as Record<string, number>)[transaction.status]++;
      }

      const direction = getTransactionDirection(transaction);
      if (direction === 'incoming') {
        stats.incoming += transaction.amount;
      } else {
        stats.outgoing += transaction.amount;
      }

      if (transaction.status === 'completed') {
        stats.totalAmount += transaction.amount;
      }
    });

    return stats;
  }, [filteredTransactions, getTransactionDirection]);

  const handleExport = () => {
    // Simple CSV export functionality
    const csvContent = [
      'Date,Type,From,To,Amount,Status',
      ...filteredTransactions.map(t =>
        `${t.createdAt},${formatTransactionType(t.type)},${t.sender.name},${t.receiver.name},${t.amount},${t.status}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      type: "all",
      status: "all",
      dateRange: "all"
    });
  };

  if (error) {
    return (
      <div className="min-h-screen fintech-hero-bg">
        <div className="fintech-container py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Failed to load transactions</h3>
              <p className="text-muted-foreground mb-4">
                There was an error loading your transaction history.
              </p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen fintech-hero-bg">
      <div className="fintech-container space-y-8 py-8">

        {/* Header */}
        <div className="text-center space-y-4 fintech-fade-in">
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="fintech-ghost"
              size="sm"
              onClick={() => navigate("/user/my-wallet")}
              className="absolute left-4 top-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/10 backdrop-blur-sm">
              <Activity className="h-12 w-12 text-purple-600" />
            </div>
          </div>
          <div>
            <h1 className="fintech-gradient-text text-4xl md:text-5xl font-bold tracking-tight">
              Transaction History
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
              View and manage all your financial transactions
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 fintech-scale-in">
          <Card variant="fintech">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                  <p className="text-2xl font-bold">{transactionStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="fintech">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Money Received</p>
                  <p className="text-2xl font-bold text-green-600">৳{transactionStats.incoming.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="fintech">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/20">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Money Sent</p>
                  <p className="text-2xl font-bold text-red-600">৳{transactionStats.outgoing.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="fintech">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{transactionStats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card variant="fintech" className="fintech-slide-up delay-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, or type..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-10"
                />
              </div>

              {/* Type Filter */}
              <Select
                value={filters.type}
                onValueChange={(value) => setFilters({ ...filters, type: value as TTransactionType | "all" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="cash_in">Cash In</SelectItem>
                  <SelectItem value="cash_out">Cash Out</SelectItem>
                  <SelectItem value="send_money">Send Money</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="recharge">Recharge</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters({ ...filters, status: value as TTransactionStatus | "all" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range Filter */}
              <Select
                value={filters.dateRange}
                onValueChange={(value) => setFilters({ ...filters, dateRange: value as "all" | "today" | "week" | "month" | "year" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Showing {filteredTransactions.length} of {transactions.length} transactions
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Clear Filters
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card variant="fintech" className="fintech-slide-up delay-450">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <span>Recent Transactions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg animate-pulse">
                    <div className="w-10 h-10 bg-muted rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                    <div className="h-4 bg-muted rounded w-20"></div>
                  </div>
                ))}
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No transactions found</h3>
                <p className="text-muted-foreground mb-4">
                  {filters.search || filters.type !== "all" || filters.status !== "all" || filters.dateRange !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "You haven't made any transactions yet."}
                </p>
                {filters.search || filters.type !== "all" || filters.status !== "all" || filters.dateRange !== "all" ? (
                  <Button variant="outline" onClick={resetFilters}>
                    Clear Filters
                  </Button>
                ) : (
                  <Button onClick={() => navigate("/user/send-money")}>
                    Make Your First Transaction
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction._id}>
                    <div
                      className="flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:bg-accent/20 hover:border-accent cursor-pointer"
                      onClick={() => setSelectedTransaction(selectedTransaction?._id === transaction._id ? null : transaction)}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getInitials(isUserSender(transaction) ? transaction.receiver.name : transaction.sender.name)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            {getTransactionIcon(transaction.type, transaction.status)}
                            <span className="font-medium text-sm">
                              {formatTransactionType(transaction.type)}
                            </span>
                            {getStatusBadge(transaction.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {isUserSender(transaction)
                              ? `To ${transaction.receiver.name}`
                              : `From ${transaction.sender.name}`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {getAmountDisplay(transaction)}
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Transaction Details Expandable */}
                    {selectedTransaction?._id === transaction._id && (
                      <Card className="mt-2 fintech-card-glass">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            {getTransactionIcon(transaction.type, transaction.status)}
                            <span>Transaction Details</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Transaction Info */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
                              <div className="flex items-center space-x-2">
                                <Hash className="h-4 w-4 text-muted-foreground" />
                                <code className="text-sm bg-muted px-2 py-1 rounded">{transaction._id}</code>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-muted-foreground">Status</p>
                              <div className="flex items-center space-x-2">
                                {getStatusBadge(transaction.status)}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-muted-foreground">Type</p>
                              <div className="flex items-center space-x-2">
                                {getTransactionIcon(transaction.type)}
                                <span className="text-sm">{formatTransactionType(transaction.type)}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-muted-foreground">Amount</p>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="text-lg font-semibold">৳{transaction.amount.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>

                          {/* Parties Involved */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center space-x-2">
                                  <Users className="h-4 w-4" />
                                  <span>From</span>
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="flex items-center space-x-3">
                                  <Avatar>
                                    <AvatarFallback className="bg-blue-100 text-blue-700">
                                      {getInitials(transaction.sender.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{transaction.sender.name}</p>
                                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                      <Phone className="h-3 w-3" />
                                      <span>{transaction.sender.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                      <Mail className="h-3 w-3" />
                                      <span>{transaction.sender.email}</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center space-x-2">
                                  <Users className="h-4 w-4" />
                                  <span>To</span>
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="flex items-center space-x-3">
                                  <Avatar>
                                    <AvatarFallback className="bg-green-100 text-green-700">
                                      {getInitials(transaction.receiver.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{transaction.receiver.name}</p>
                                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                      <Phone className="h-3 w-3" />
                                      <span>{transaction.receiver.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                      <Mail className="h-3 w-3" />
                                      <span>{transaction.receiver.email}</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Timestamps */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-muted-foreground">Created At</p>
                              <div className="flex items-center space-x-2">
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{formatDate(transaction.createdAt)}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                              <div className="flex items-center space-x-2">
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{formatDate(transaction.updatedAt)}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}