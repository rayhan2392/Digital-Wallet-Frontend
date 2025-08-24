import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { TransactionTableSkeleton } from "@/components/common/TableSkeleton";
import { LoadingState } from "@/components/common/LoadingStates";
import type { ITransaction } from "@/types";
import { Input } from "@/components/ui/input";

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
  const transactionList = Array.isArray(transactions) ? transactions : [];

  if (isLoading) {
    return (
      <section className="bg-gradient-to-br from-[var(--muted)]/50 via-[var(--primary)]/20 to-[var(--success)]/10 min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="wallet-card bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-foreground">All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="w-full bg-[var(--background)]/80 rounded-lg overflow-hidden">
                <TableHeader>
                  <TableRow className="bg-[var(--primary)]/10">
                    <TableHead className="text-foreground font-semibold">TX ID</TableHead>
                    <TableHead className="text-foreground font-semibold">Type</TableHead>
                    <TableHead className="text-foreground font-semibold">Amount</TableHead>
                    <TableHead className="text-foreground font-semibold">From</TableHead>
                    <TableHead className="text-foreground font-semibold">To</TableHead>
                    <TableHead className="text-foreground font-semibold">Status</TableHead>
                    <TableHead className="text-foreground font-semibold">Date</TableHead>
                    <TableHead className="text-foreground font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TransactionTableSkeleton rows={8} />
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-br from-[var(--muted)]/50 via-[var(--primary)]/20 to-[var(--success)]/10 min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="wallet-card bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-foreground">All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <LoadingState
                type="card"
                message="Failed to load transactions. Please try again."
              />
              <div className="text-center mt-4">
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "cash_in":
        return "bg-[var(--success)]/20 text-[var(--success)]";
      case "cash_out":
        return "bg-[var(--destructive)]/20 text-[var(--destructive)]";
      case "send_money":
        return "bg-blue-500/20 text-blue-500";
      case "payment":
        return "bg-purple-500/20 text-purple-500";
      default:
        return "bg-[var(--muted)]/20 text-[var(--muted-foreground)]";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[var(--success)]/20 text-[var(--success)]";
      case "pending":
        return "bg-yellow-500/20 text-yellow-600";
      case "failed":
        return "bg-[var(--destructive)]/20 text-[var(--destructive)]";
      default:
        return "bg-[var(--muted)]/20 text-[var(--muted-foreground)]";
    }
  };

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
    <section className="bg-gradient-to-br from-[var(--muted)]/50 via-[var(--primary)]/20 to-[var(--success)]/10 min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="wallet-card bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-foreground">All Transactions</CardTitle>
            <p className="text-muted-foreground mt-2">
              {transactionList.length} transaction{transactionList.length !== 1 ? 's' : ''} found
            </p>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search transactions..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="bg-[var(--background)]/50"
                />
              </div>
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="w-full sm:w-40 bg-[var(--background)]/50 border border-[var(--border)] rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                <option value="cash_in">Cash In</option>
                <option value="cash_out">Cash Out</option>
                <option value="send_money">Send Money</option>
                <option value="payment">Payment</option>
              </select>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full sm:w-40 bg-[var(--background)]/50 border border-[var(--border)] rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {transactionList.length === 0 ? (
              <LoadingState
                type="card"
                message="No transactions found"
              />
            ) : (
              <Table className="w-full bg-[var(--background)]/80 rounded-lg overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-700">
                <TableHeader>
                  <TableRow className="bg-[var(--primary)]/10">
                    <TableHead className="text-foreground font-semibold">TX ID</TableHead>
                    <TableHead className="text-foreground font-semibold">Type</TableHead>
                    <TableHead className="text-foreground font-semibold">Amount</TableHead>
                    <TableHead className="text-foreground font-semibold">From</TableHead>
                    <TableHead className="text-foreground font-semibold">To</TableHead>
                    <TableHead className="text-foreground font-semibold">Status</TableHead>
                    <TableHead className="text-foreground font-semibold">Date</TableHead>
                    <TableHead className="text-foreground font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionList.map((transaction: ITransaction) => (
                    <TableRow key={transaction._id} className="hover:bg-[var(--muted)]/20 transition-colors">
                      <TableCell className="font-mono text-sm">
                        {transaction._id.slice(-8)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeStyle(transaction.type)}`}>
                          {transaction.type.replace('_', ' ')}
                        </span>
                      </TableCell>
                      <TableCell className={`font-semibold ${transaction.type === "cash_in" ? "text-[var(--success)]" : "text-[var(--destructive)]"
                        }`}>
                        {formatAmount(transaction.amount, transaction.type)}
                      </TableCell>
                      <TableCell className="text-foreground font-medium">
                        {transaction.sender.name}
                      </TableCell>
                      <TableCell className="text-foreground font-medium">
                        {transaction.receiver.name}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(transaction.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-[var(--primary)] hover:bg-[var(--primary)]/10">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}