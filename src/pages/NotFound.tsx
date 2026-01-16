import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--muted)]/50 via-[var(--primary)]/20 to-[var(--success)]/10 flex items-center justify-center p-4">
            <Card className="wallet-card max-w-lg w-full bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-lg">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-6">
                        <div className="text-8xl font-bold text-[var(--primary)] mb-2">404</div>
                        <Search className="h-16 w-16 text-[var(--muted-foreground)] mx-auto" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-foreground mb-2">
                        Page Not Found
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center space-y-3">
                        <p className="text-lg text-muted-foreground">
                            Oops! The page you're looking for doesn't exist.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            It might have been moved, deleted, or you entered the wrong URL.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button asChild size="lg" className="w-full">
                            <Link to="/">
                                <Home className="h-5 w-5 mr-2" />
                                Back to Home
                            </Link>
                        </Button>

                        <div className="grid grid-cols-2 gap-3">
                            <Button asChild variant="outline">
                                <Link to="/features">Features</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link to="/about">About</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                            Need help? Contact our support team
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
