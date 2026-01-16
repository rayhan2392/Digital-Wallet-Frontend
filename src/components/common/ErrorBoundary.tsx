import React, { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <Card className="wallet-card max-w-md mx-auto mt-8">
                    <CardHeader className="text-center">
                        <AlertTriangle className="h-12 w-12 text-[var(--destructive)] mx-auto mb-4" />
                        <CardTitle className="text-[var(--destructive)]">Something went wrong</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground text-center">
                            An unexpected error occurred. Please try refreshing the page.
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-4 p-3 bg-[var(--muted)] rounded-md">
                                <summary className="cursor-pointer text-sm font-medium">Error Details</summary>
                                <pre className="mt-2 text-xs overflow-auto">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                        <Button
                            onClick={() => window.location.reload()}
                            className="w-full"
                        >
                            Refresh Page
                        </Button>
                    </CardContent>
                </Card>
            )
        }

        return this.props.children
    }
}
