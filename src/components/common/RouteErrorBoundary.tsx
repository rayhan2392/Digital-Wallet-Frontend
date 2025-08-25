import { useRouteError, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

export function RouteErrorBoundary() {
    const error = useRouteError() as Error & { status?: number; statusText?: string };

    console.error('Route error:', error);

    const getErrorMessage = () => {
        if (error?.status === 404) {
            return {
                title: "Page Not Found",
                message: "The page you're looking for doesn't exist or has been moved.",
                showBackButton: true
            };
        }

        if (error?.status === 403) {
            return {
                title: "Access Denied",
                message: "You don't have permission to access this page.",
                showBackButton: true
            };
        }

        if (error?.status && error.status >= 500) {
            return {
                title: "Server Error",
                message: "Something went wrong on our end. Please try again later.",
                showBackButton: true
            };
        }

        return {
            title: "Something went wrong",
            message: error?.statusText || error?.message || "An unexpected error occurred.",
            showBackButton: true
        };
    };

    const errorInfo = getErrorMessage();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--muted)]/50 via-[var(--primary)]/20 to-[var(--success)]/10 flex items-center justify-center p-4">
            <Card className="wallet-card max-w-md w-full bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-lg">
                <CardHeader className="text-center">
                    <AlertTriangle className="h-16 w-16 text-[var(--destructive)] mx-auto mb-4" />
                    <CardTitle className="text-2xl font-bold text-foreground">
                        {errorInfo.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground text-center">
                        {errorInfo.message}
                    </p>

                    {error?.status === 404 && (
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-4">
                                Error Code: 404
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        <Button asChild className="w-full">
                            <Link to="/">
                                <Home className="h-4 w-4 mr-2" />
                                Go to Homepage
                            </Link>
                        </Button>

                        {errorInfo.showBackButton && (
                            <Button
                                variant="outline"
                                onClick={() => window.history.back()}
                                className="w-full"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Go Back
                            </Button>
                        )}

                        <Button
                            variant="ghost"
                            onClick={() => window.location.reload()}
                            className="w-full"
                        >
                            Refresh Page
                        </Button>
                    </div>

                    {process.env.NODE_ENV === 'development' && error && (
                        <details className="mt-4 p-3 bg-[var(--muted)] rounded-md">
                            <summary className="cursor-pointer text-sm font-medium">
                                Debug Information
                            </summary>
                            <pre className="mt-2 text-xs overflow-auto whitespace-pre-wrap">
                                {JSON.stringify(error, null, 2)}
                            </pre>
                        </details>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
