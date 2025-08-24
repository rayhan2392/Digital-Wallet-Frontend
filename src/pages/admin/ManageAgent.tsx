import { useGetAllUsersQuery } from "@/redux/features/admin/admin.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function ManageAgent() {
  const { data: agents = { data: [] } } = useGetAllUsersQuery({ role: "agent" });
  const [openDialog, setOpenDialog] = useState<{ id: string; action: "approve" | "suspend" } | null>(null);

  const handleStatusChange = (id: string, isApproved: boolean) => {
    setOpenDialog({ id, action: isApproved ? "suspend" : "approve" });
  };

  const confirmAction = () => {
    if (openDialog) {
      console.log(`Performing ${openDialog.action} on agent ${openDialog.id}`);
      setOpenDialog(null);
    }
  };

  return (
    <section className="bg-gradient-to-br from-[var(--muted)]/50 via-[var(--primary)]/20 to-[var(--success)]/10 min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="wallet-card bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-foreground">Manage Agents</CardTitle>
          </CardHeader>
          <CardContent>
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
                {agents.data.map((agent) => (
                  <TableRow key={agent._id} className="hover:bg-[var(--muted)]/20 transition-colors">
                    <TableCell className="text-foreground">{agent.name}</TableCell>
                    <TableCell className="text-muted-foreground">{agent.email}</TableCell>
                    <TableCell className="text-muted-foreground">{agent.phone}</TableCell>
                    <TableCell className="text-foreground">
                      <span className={`px-2 py-1 rounded-full ${agent.isApproved ? "bg-[var(--success)]/20 text-[var(--success)]" : "bg-[var(--destructive)]/20 text-[var(--destructive)]"}`}>
                        {agent.isApproved ? "Approved" : "Pending"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <AlertDialog open={openDialog?.id === agent._id} onOpenChange={() => setOpenDialog(null)}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2 border-[var(--border)] text-[var(--primary)] hover:bg-[var(--accent)]"
                            onClick={() => handleStatusChange(agent._id, agent.isApproved)}
                          >
                            {agent.isApproved ? "Suspend" : "Approve"}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[var(--card)] border-[var(--border)]">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to {openDialog?.action} agent {agent.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-[var(--border)] text-muted-foreground hover:bg-[var(--muted)]">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
                              onClick={confirmAction}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}