import { useApproveAgentMutation, useSuspendAgentMutation, useGetAllUsersQuery } from "@/redux/features/admin/admin.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { AgentTableSkeleton } from "@/components/common/TableSkeleton";
import { LoadingState } from "@/components/common/LoadingStates";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import type { IUser } from "@/types";

export default function ManageAgent() {
  const { data: agentsResponse, isLoading, error } = useGetAllUsersQuery({ role: "agent" });
  const [approveAgent, { isLoading: isApproving }] = useApproveAgentMutation();
  const [suspendAgent, { isLoading: isSuspending }] = useSuspendAgentMutation();
  const [openDialog, setOpenDialog] = useState<{ id: string; action: "approve" | "suspend"; agentName: string } | null>(null);
  const { handleApiError } = useErrorHandler();

  const agents = agentsResponse?.data || [];

  const handleAction = async () => {
    if (!openDialog) return;

    const toastId = toast.loading(`${openDialog.action === "approve" ? "Approving" : "Suspending"} ${openDialog.agentName}...`);

    try {
      if (openDialog.action === "approve") {
        const result = await approveAgent({ id: openDialog.id }).unwrap();
        if (result.success) {
          toast.success(`${openDialog.agentName} has been approved successfully`, { id: toastId });
        }
      } else {
        const result = await suspendAgent({ id: openDialog.id }).unwrap();
        if (result.success) {
          toast.success(`${openDialog.agentName} has been suspended successfully`, { id: toastId });
        }
      }
      setOpenDialog(null);
    } catch (error) {
      toast.error(`Failed to ${openDialog.action} ${openDialog.agentName}`, { id: toastId });
      handleApiError(error);
    }
  };

  if (isLoading) {
    return (
      <section className="bg-gradient-to-br from-[var(--muted)]/50 via-[var(--primary)]/20 to-[var(--success)]/10 min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="wallet-card bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-foreground">Manage Agents</CardTitle>
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
                  <AgentTableSkeleton rows={5} />
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
              <CardTitle className="text-3xl font-bold text-foreground">Manage Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <LoadingState
                type="card"
                message="Failed to load agents. Please try again."
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
            <CardTitle className="text-3xl font-bold text-foreground">Manage Agents</CardTitle>
            <p className="text-muted-foreground mt-2">
              {agents.length} agent{agents.length !== 1 ? 's' : ''} registered
            </p>
          </CardHeader>
          <CardContent>
            {agents.length === 0 ? (
              <LoadingState
                type="card"
                message="No agents found"
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
                  {agents.map((agent: IUser) => (
                    <TableRow key={agent._id} className="hover:bg-[var(--muted)]/20 transition-colors">
                      <TableCell className="text-foreground">{agent.name}</TableCell>
                      <TableCell className="text-muted-foreground">{agent.email}</TableCell>
                      <TableCell className="text-muted-foreground">{agent.phone}</TableCell>
                      <TableCell className="text-foreground">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${agent.isApproved
                          ? "bg-[var(--success)]/20 text-[var(--success)]"
                          : "bg-[var(--destructive)]/20 text-[var(--destructive)]"
                          }`}>
                          {agent.isApproved ? "Approved" : "Pending"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {agent.isApproved ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[var(--destructive)] text-[var(--destructive)] hover:bg-[var(--destructive)]/10"
                            onClick={() => setOpenDialog({ id: agent._id, action: "suspend", agentName: agent.name })}
                            disabled={isApproving || isSuspending}
                          >
                            {isSuspending ? "Suspending..." : "Suspend"}
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[var(--success)] text-[var(--success)] hover:bg-[var(--success)]/10"
                            onClick={() => setOpenDialog({ id: agent._id, action: "approve", agentName: agent.name })}
                            disabled={isApproving || isSuspending}
                          >
                            {isApproving ? "Approving..." : "Approve"}
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
              Are you sure you want to {openDialog?.action} agent <strong>{openDialog?.agentName}</strong>?
              {openDialog?.action === 'suspend' && ' This will revoke their agent privileges.'}
              {openDialog?.action === 'approve' && ' This will grant them agent privileges.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[var(--border)] text-muted-foreground hover:bg-[var(--muted)]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={`${openDialog?.action === 'approve'
                ? "bg-[var(--success)] hover:bg-[var(--success)]/90"
                : "bg-[var(--destructive)] hover:bg-[var(--destructive)]/90"
                } text-white`}
              onClick={handleAction}
              disabled={isApproving || isSuspending}
            >
              {isApproving || isSuspending ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {openDialog?.action === 'approve' ? 'Approving...' : 'Suspending...'}
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