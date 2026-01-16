import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Home } from "lucide-react";
import { Link } from "react-router";

export default function NotApproved() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--muted)]/50 via-[var(--primary)]/20 to-[var(--success)]/10 flex items-center justify-center p-4">
            <Card className="wallet-card max-w-md w-full bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-lg">
                <CardHeader className="text-center">
                    <Shield className="h-16 w-16 text-[var(--warning)] mx-auto mb-4" />
                    <CardTitle className="text-2xl font-bold text-foreground">
                        Account Not Approved
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground text-center">
                        Your account is not yet approved for dashboard access. Please contact the administrator to get access to your dashboard.
                    </p>

                    <div className="flex flex-col gap-3">
                        <Button asChild className="w-full">
                            <Link to="/">
                                <Home className="h-4 w-4 mr-2" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
