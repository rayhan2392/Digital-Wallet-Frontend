import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useMemo } from "react";
import { TransactionTableSkeleton } from "@/components/common/TableSkeleton";
import { LoadingState } from "@/components/common/LoadingStates";
import type { ITransaction } from "@/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight, ArrowDownLeft, Search, Filter, Eye, TrendingUp,
  Activity, CreditCard, DollarSign, Calendar, RefreshCw
} from "lucide-react";

export default function AllTransactions() {
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    search: ""
  });

  // Build query params - keeping existing {type:"cash_out"} as default when type is "all"
  const queryParams = {
    ...(filters.type !== "all" ? { type: filters.type } : {}), // Maintains existing behavior
    ...(filters.status !== "all" && { status: filters.status }),
    ...(filters.search && { search: filters.search })
  };

  const { data: transactions = [], isLoading, error } = useGetAllTransactionsQuery(queryParams);

  // Safe data extraction - handle both direct array and nested response
  const transactionList = useMemo(() => {
    return Array.isArray(transactions) ? transactions : [];
  }, [transactions]);

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalAmount = transactionList.reduce((sum: number, t: ITransaction) => sum + t.amount, 0);
    const completedTransactions = transactionList.filter((t: ITransaction) => t.status === "completed");
    const todayTransactions = transactionList.filter((t: ITransaction) => {
      const today = new Date().toDateString();
      const transactionDate = new Date(t.createdAt).toDateString();
      return today === transactionDate;
    });

    return {
      total: transactionList.length,
      totalAmount,
      completed: completedTransactions.length,
      pending: transactionList.filter((t: ITransaction) => t.status === "pending").length,
      failed: transactionList.filter((t: ITransaction) => t.status === "failed").length,
      todayCount: todayTransactions.length,
      averageAmount: transactionList.length > 0 ? totalAmount / transactionList.length : 0,
      byType: {
        cash_in: transactionList.filter((t: ITransaction) => t.type === "cash_in").length,
        cash_out: transactionList.filter((t: ITransaction) => t.type === "cash_out").length,
        send_money: transactionList.filter((t: ITransaction) => t.type === "send_money").length,
        payment: transactionList.filter((t: ITransaction) => t.type === "payment").length,
      }
    };
  }, [transactionList]);

  if (isLoading) {
    return (
      <div className="fintech-hero-bg min-h-screen">
        <div className="fintech-container space-y-8 py-8">
          <div className="text-center space-y-4 fintech-fade-in">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-sm mx-auto w-fit">
              <Activity className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="fintech-gradient-text text-4xl font-bold tracking-tight">
              Transaction Analytics
            </h1>
          </div>
          <Card variant="fintech">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">Loading Transactions...</CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-primary/5">
                    <TableHead className="font-semibold">Transaction</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Parties</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TransactionTableSkeleton rows={8} />
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fintech-hero-bg min-h-screen">
        <div className="fintech-container space-y-8 py-8">
          <div className="text-center space-y-4 fintech-fade-in">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-sm mx-auto w-fit">
              <Activity className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="fintech-gradient-text text-4xl font-bold tracking-tight">
              Transaction Analytics
            </h1>
          </div>
          <Card variant="fintech">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">Error Loading Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <LoadingState
                type="card"
                message="Failed to load transactions. Please try again."
              />
              <div className="text-center mt-4">
                <Button variant="fintech-primary" onClick={() => window.location.reload()}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }



  const formatAmount = (amount: number, type: string) => {
    const prefix = type === "cash_in" ? "+" : "-";
    return `${prefix}৳${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fintech-hero-bg min-h-screen">
      <div className="fintech-container space-y-8 py-8">
        {/* Page Header */}
        <div className="text-center space-y-4 fintech-fade-in">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-sm mx-auto w-fit">
            <Activity className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="fintech-gradient-text text-4xl font-bold tracking-tight">
            Transaction Analytics
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor and analyze all platform transactions in real-time
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 fintech-scale-in">
          <Card variant="fintech" className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold fintech-gradient-text">{analytics.total}</p>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
              </div>
            </div>
          </Card>
          <Card variant="fintech" className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">৳{analytics.totalAmount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Volume</p>
              </div>
            </div>
          </Card>
          <Card variant="fintech" className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{analytics.todayCount}</p>
                <p className="text-sm text-muted-foreground">Today's Transactions</p>
              </div>
            </div>
          </Card>
          <Card variant="fintech" className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">৳{Math.round(analytics.averageAmount).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Average Amount</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Status Overview */}
        <div className="grid gap-6 md:grid-cols-3 fintech-scale-in delay-200">
          <Card variant="fintech" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-green-600">{analytics.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <Badge variant="success" className="text-xs">
                {analytics.total > 0 ? Math.round((analytics.completed / analytics.total) * 100) : 0}%
              </Badge>
            </div>
          </Card>
          <Card variant="fintech" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-yellow-600">{analytics.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              <Badge variant="pending" className="text-xs">
                {analytics.total > 0 ? Math.round((analytics.pending / analytics.total) * 100) : 0}%
              </Badge>
            </div>
          </Card>
          <Card variant="fintech" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-red-600">{analytics.failed}</p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
              <Badge variant="warning" className="text-xs">
                {analytics.total > 0 ? Math.round((analytics.failed / analytics.total) * 100) : 0}%
              </Badge>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card variant="fintech">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by transaction ID, sender, or receiver..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20"
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="px-3 py-2 bg-background border border-border/50 rounded-md text-sm min-w-[120px]"
                  >
                    <option value="all">All Types</option>
                    <option value="cash_in">Cash In</option>
                    <option value="cash_out">Cash Out</option>
                    <option value="send_money">Send Money</option>
                    <option value="payment">Payment</option>
                  </select>
                </div>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="px-3 py-2 bg-background border border-border/50 rounded-md text-sm min-w-[120px]"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card variant="fintech">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Transactions ({transactionList.length})
              </CardTitle>
              <Button variant="fintech-ghost" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {transactionList.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No transactions found</p>
                <p className="text-muted-foreground">
                  {filters.search || filters.type !== "all" || filters.status !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "No transactions have been made yet"
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/5">
                      <TableHead className="font-semibold">Transaction Details</TableHead>
                      <TableHead className="font-semibold">Type & Amount</TableHead>
                      <TableHead className="font-semibold">Parties</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionList.map((transaction: ITransaction) => (
                      <TableRow key={transaction._id} className="hover:bg-primary/5 transition-colors">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === "cash_in" ? "bg-green-500/20" :
                              transaction.type === "cash_out" ? "bg-red-500/20" :
                                transaction.type === "send_money" ? "bg-blue-500/20" :
                                  "bg-purple-500/20"
                              }`}>
                              {transaction.type === "cash_in" ? (
                                <ArrowDownLeft className="h-5 w-5 text-green-600" />
                              ) : transaction.type === "cash_out" ? (
                                <ArrowUpRight className="h-5 w-5 text-red-600" />
                              ) : (
                                <ArrowUpRight className="h-5 w-5 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">TX-{transaction._id.slice(-8).toUpperCase()}</p>
                              <p className="text-sm text-muted-foreground">
                                {transaction.type.replace('_', ' ').toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge variant={
                              transaction.type === "cash_in" ? "success" :
                                transaction.type === "cash_out" ? "warning" :
                                  "secondary"
                            } className="text-xs">
                              {transaction.type.replace('_', ' ')}
                            </Badge>
                            <p className={`font-semibold ${transaction.type === "cash_in" ? "text-green-600" : "text-red-600"
                              }`}>
                              {formatAmount(transaction.amount, transaction.type)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">From: {transaction.sender.name}</p>
                            <p className="text-sm font-medium">To: {transaction.receiver.name}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "completed" ? "success" :
                                transaction.status === "pending" ? "pending" :
                                  "warning"
                            }
                            className="text-xs"
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{formatDate(transaction.createdAt)}</p>
                        </TableCell>
                        <TableCell>
                          <Button variant="fintech-ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}