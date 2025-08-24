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

export default function ManageUsers() {
    const { data: usersResponse, isLoading, error } = useGetAllUsersQuery({ role: "user" });
    const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
    const [unBlockUser, { isLoading: isUnBlocking }] = useUnBlockUserMutation();
    const [openDialog, setOpenDialog] = useState<{ id: string; action: "block" | "unblock"; userName: string } | null>(null);
    const { handleApiError } = useErrorHandler();

    const users = usersResponse?.data || [];

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
            <section className="bg-gradient-to-br from-[var(--muted)]/50 via-[var(--primary)]/20 to-[var(--success)]/10 min-h-screen py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <Card className="wallet-card bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-lg">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold text-foreground">Manage Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table className="w-full bg-[var(--background)]/80 rounded-lg overflow-hidden">
                                <TableHeader>
                                    <TableRow className="bg-[var(--primary)]/10">
                                        <TableHead className="text-foreground font-semibold">Name</TableHead>
                                        <TableHead className="text-foreground font-semibold">Email</TableHead>
                                        <TableHead className="text-foreground font-semibold">Phone</TableHead>
                                        <TableHead className="text-foreground font-semibold">Status</TableHead>
                                        <TableHead className="text-foreground font-semibold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <UserTableSkeleton rows={5} />
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
                            <CardTitle className="text-3xl font-bold text-foreground">Manage Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LoadingState
                                type="card"
                                message="Failed to load users. Please try again."
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

    return (
        <section className="bg-gradient-to-br from-[var(--muted)]/50 via-[var(--primary)]/20 to-[var(--success)]/10 min-h-screen py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <Card className="wallet-card bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold text-foreground">Manage Users</CardTitle>
                        <p className="text-muted-foreground mt-2">
                            {users.length} user{users.length !== 1 ? 's' : ''} registered
                        </p>
                    </CardHeader>
                    <CardContent>
                        {users.length === 0 ? (
                            <LoadingState
                                type="card"
                                message="No users found"
                            />
                        ) : (
                            <Table className="w-full bg-[var(--background)]/80 rounded-lg overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-700">
                                <TableHeader>
                                    <TableRow className="bg-[var(--primary)]/10">
                                        <TableHead className="text-foreground font-semibold">Name</TableHead>
                                        <TableHead className="text-foreground font-semibold">Email</TableHead>
                                        <TableHead className="text-foreground font-semibold">Phone</TableHead>
                                        <TableHead className="text-foreground font-semibold">Status</TableHead>
                                        <TableHead className="text-foreground font-semibold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user: IUser) => (
                                        <TableRow key={user._id} className="hover:bg-[var(--muted)]/20 transition-colors">
                                            <TableCell className="text-foreground">{user.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                            <TableCell className="text-muted-foreground">{user.phone}</TableCell>
                                            <TableCell className="text-foreground">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isBlocked
                                                    ? "bg-[var(--destructive)]/20 text-[var(--destructive)]"
                                                    : "bg-[var(--success)]/20 text-[var(--success)]"
                                                    }`}>
                                                    {user.isBlocked ? "Blocked" : "Active"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {user.isBlocked ? (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-[var(--success)] text-[var(--success)] hover:bg-[var(--success)]/10"
                                                        onClick={() => setOpenDialog({ id: user._id, action: "unblock", userName: user.name })}
                                                        disabled={isBlocking || isUnBlocking}
                                                    >
                                                        {isUnBlocking ? "Unblocking..." : "Unblock"}
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-[var(--destructive)] text-[var(--destructive)] hover:bg-[var(--destructive)]/10"
                                                        onClick={() => setOpenDialog({ id: user._id, action: "block", userName: user.name })}
                                                        disabled={isBlocking || isUnBlocking}
                                                    >
                                                        {isBlocking ? "Blocking..." : "Block"}
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
                <AlertDialogContent className="bg-[var(--card)] border-[var(--border)]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to {openDialog?.action} user <strong>{openDialog?.userName}</strong>?
                            {openDialog?.action === 'block' && ' This will prevent them from accessing their account and performing transactions.'}
                            {openDialog?.action === 'unblock' && ' This will restore their access to the platform.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-[var(--border)] text-muted-foreground hover:bg-[var(--muted)]">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className={`${openDialog?.action === 'unblock'
                                ? "bg-[var(--success)] hover:bg-[var(--success)]/90"
                                : "bg-[var(--destructive)] hover:bg-[var(--destructive)]/90"
                                } text-white`}
                            onClick={handleAction}
                            disabled={isBlocking || isUnBlocking}
                        >
                            {isBlocking || isUnBlocking ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    {openDialog?.action === 'block' ? 'Blocking...' : 'Unblocking...'}
                                </div>
                            ) : (
                                `Confirm ${openDialog?.action}`
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}