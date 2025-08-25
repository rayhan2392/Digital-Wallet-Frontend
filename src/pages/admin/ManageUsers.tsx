import { useBlockUserMutation, useUnBlockUserMutation, useGetAllUsersQuery } from "@/redux/features/admin/admin.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { UserTableSkeleton } from "@/components/common/TableSkeleton";
import { LoadingState } from "@/components/common/LoadingStates";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import type { IUser } from "@/types";
import { Users, Search, Filter, UserX, UserCheck, Mail, Phone, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ManageUsers() {
    const { data: usersResponse, isLoading, error } = useGetAllUsersQuery({ role: "user" });
    const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
    const [unBlockUser, { isLoading: isUnBlocking }] = useUnBlockUserMutation();
    const [openDialog, setOpenDialog] = useState<{ id: string; action: "block" | "unblock"; userName: string } | null>(null);
    const { handleApiError } = useErrorHandler();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "blocked">("all");

    const users = usersResponse?.data || [];

    // Filter users based on search and status
    const filteredUsers = users.filter((user: IUser) => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm);

        const matchesStatus = statusFilter === "all" ||
            (statusFilter === "active" && !user.isBlocked) ||
            (statusFilter === "blocked" && user.isBlocked);

        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: users.length,
        active: users.filter((user: IUser) => !user.isBlocked).length,
        blocked: users.filter((user: IUser) => user.isBlocked).length,
    };

    const handleAction = async () => {
        if (!openDialog) return;

        const toastId = toast.loading(`${openDialog.action === "block" ? "Blocking" : "Unblocking"} ${openDialog.userName}...`);

        try {
            if (openDialog.action === "block") {
                const result = await blockUser({ id: openDialog.id }).unwrap();
                if (result.success) {
                    toast.success(`${openDialog.userName} has been blocked successfully`, { id: toastId });
                }
            } else {
                const result = await unBlockUser({ id: openDialog.id }).unwrap();
                if (result.success) {
                    toast.success(`${openDialog.userName} has been unblocked successfully`, { id: toastId });
                }
            }
            setOpenDialog(null);
        } catch (error) {
            toast.error(`Failed to ${openDialog.action} ${openDialog.userName}`, { id: toastId });
            handleApiError(error);
        }
    };

    if (isLoading) {
        return (
            <div className="fintech-hero-bg min-h-screen">
                <div className="fintech-container space-y-8 py-8">
                    <div className="text-center space-y-4 fintech-fade-in">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-sm mx-auto w-fit">
                            <Users className="h-12 w-12 text-blue-600" />
                        </div>
                        <h1 className="fintech-gradient-text text-4xl font-bold tracking-tight">
                            User Management
                        </h1>
                    </div>
                    <Card variant="fintech">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-semibold">Loading Users...</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow className="bg-primary/5">
                                        <TableHead className="font-semibold">Name</TableHead>
                                        <TableHead className="font-semibold">Email</TableHead>
                                        <TableHead className="font-semibold">Phone</TableHead>
                                        <TableHead className="font-semibold">Status</TableHead>
                                        <TableHead className="font-semibold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <UserTableSkeleton rows={5} />
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
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-sm mx-auto w-fit">
                            <Users className="h-12 w-12 text-blue-600" />
                        </div>
                        <h1 className="fintech-gradient-text text-4xl font-bold tracking-tight">
                            User Management
                        </h1>
                    </div>
                    <Card variant="fintech">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-semibold">Error Loading Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LoadingState
                                type="card"
                                message="Failed to load users. Please try again."
                            />
                            <div className="text-center mt-4">
                                <Button variant="fintech-primary" onClick={() => window.location.reload()}>
                                    Retry
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="fintech-hero-bg min-h-screen">
            <div className="fintech-container space-y-8 py-8">
                {/* Page Header */}
                <div className="text-center space-y-4 fintech-fade-in">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-sm mx-auto w-fit">
                        <Users className="h-12 w-12 text-blue-600" />
                    </div>
                    <h1 className="fintech-gradient-text text-4xl font-bold tracking-tight">
                        User Management
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Monitor and manage all registered users on the SwiftPay platform
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-6 md:grid-cols-3 fintech-scale-in">
                    <Card variant="fintech" className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold fintech-gradient-text">{stats.total}</p>
                                <p className="text-sm text-muted-foreground">Total Users</p>
                            </div>
                        </div>
                    </Card>
                    <Card variant="fintech" className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                                <UserCheck className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                                <p className="text-sm text-muted-foreground">Active Users</p>
                            </div>
                        </div>
                    </Card>
                    <Card variant="fintech" className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-gradient-to-r from-red-500/20 to-rose-500/20">
                                <UserX className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-red-600">{stats.blocked}</p>
                                <p className="text-sm text-muted-foreground">Blocked Users</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Search and Filter */}
                <Card variant="fintech">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name, email, or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "blocked")}
                                    className="px-3 py-2 bg-background border border-border/50 rounded-md text-sm"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active Only</option>
                                    <option value="blocked">Blocked Only</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card variant="fintech">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-semibold">
                                Users ({filteredUsers.length})
                            </CardTitle>
                            {searchTerm || statusFilter !== "all" ? (
                                <Badge variant="secondary" className="text-xs">
                                    Filtered from {users.length} total
                                </Badge>
                            ) : null}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {filteredUsers.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-lg font-medium">No users found</p>
                                <p className="text-muted-foreground">
                                    {searchTerm || statusFilter !== "all"
                                        ? "Try adjusting your search or filter criteria"
                                        : "No users have registered yet"
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-primary/5">
                                            <TableHead className="font-semibold">User Details</TableHead>
                                            <TableHead className="font-semibold">Contact</TableHead>
                                            <TableHead className="font-semibold">Status</TableHead>
                                            <TableHead className="font-semibold">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredUsers.map((user: IUser) => (
                                            <TableRow key={user._id} className="hover:bg-primary/5 transition-colors">
                                                <TableCell>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white font-medium">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{user.name}</p>
                                                            <p className="text-sm text-muted-foreground">ID: {user._id.slice(-8)}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center space-x-2">
                                                            <Mail className="h-3 w-3 text-muted-foreground" />
                                                            <span className="text-sm">{user.email}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Phone className="h-3 w-3 text-muted-foreground" />
                                                            <span className="text-sm">{user.phone}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={user.isBlocked ? "warning" : "success"}
                                                        className="text-xs"
                                                    >
                                                        {user.isBlocked ? "Blocked" : "Active"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="fintech-ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        {user.isBlocked ? (
                                                            <Button
                                                                variant="fintech-success"
                                                                size="sm"
                                                                onClick={() => setOpenDialog({ id: user._id, action: "unblock", userName: user.name })}
                                                                disabled={isBlocking || isUnBlocking}
                                                            >
                                                                <UserCheck className="h-4 w-4 mr-1" />
                                                                Unblock
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="fintech-warning"
                                                                size="sm"
                                                                onClick={() => setOpenDialog({ id: user._id, action: "block", userName: user.name })}
                                                                disabled={isBlocking || isUnBlocking}
                                                            >
                                                                <UserX className="h-4 w-4 mr-1" />
                                                                Block
                                                            </Button>
                                                        )}
                                                    </div>
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

            {/* Confirmation Dialog */}
            <AlertDialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
                <AlertDialogContent className="fintech-card border-primary/20">
                    <AlertDialogHeader>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className={`p-3 rounded-full ${openDialog?.action === 'block'
                                ? 'bg-red-500/20'
                                : 'bg-green-500/20'
                                }`}>
                                {openDialog?.action === 'block' ? (
                                    <UserX className="h-6 w-6 text-red-600" />
                                ) : (
                                    <UserCheck className="h-6 w-6 text-green-600" />
                                )}
                            </div>
                            <div>
                                <AlertDialogTitle className="text-xl">
                                    {openDialog?.action === 'block' ? 'Block User' : 'Unblock User'}
                                </AlertDialogTitle>
                            </div>
                        </div>
                        <AlertDialogDescription className="text-base leading-relaxed">
                            Are you sure you want to {openDialog?.action} <strong>{openDialog?.userName}</strong>?
                            <br />
                            <span className="text-sm text-muted-foreground mt-2 block">
                                {openDialog?.action === 'block'
                                    ? 'This will prevent them from accessing their account and performing transactions.'
                                    : 'This will restore their full access to the platform.'
                                }
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex space-x-3">
                        <AlertDialogCancel asChild>
                            <Button variant="fintech-ghost">
                                Cancel
                            </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                variant={openDialog?.action === 'unblock' ? "fintech-success" : "fintech-warning"}
                                onClick={handleAction}
                                disabled={isBlocking || isUnBlocking}
                            >
                                {isBlocking || isUnBlocking ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                                        <span>{openDialog?.action === 'block' ? 'Blocking...' : 'Unblocking...'}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        {openDialog?.action === 'block' ? (
                                            <UserX className="h-4 w-4" />
                                        ) : (
                                            <UserCheck className="h-4 w-4" />
                                        )}
                                        <span>Confirm {openDialog?.action}</span>
                                    </div>
                                )}
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}