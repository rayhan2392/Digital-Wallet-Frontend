import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingStateProps {
    type?: "page" | "card" | "inline"
    message?: string
    className?: string
}

export function LoadingState({
    type = "inline",
    message = "Loading...",
    className
}: LoadingStateProps) {

    if (type === "page") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <LoadingSpinner size="lg" />
                    <p className="text-muted-foreground">{message}</p>
                </div>
            </div>
        )
    }

    if (type === "card") {
        return (
            <Card className="wallet-card">
                <CardContent className="flex items-center justify-center py-8">
                    <div className="text-center space-y-4">
                        <LoadingSpinner />
                        <p className="text-muted-foreground">{message}</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className={`flex items-center justify-center py-4 ${className}`}>
            <div className="flex items-center space-x-2">
                <LoadingSpinner size="sm" />
                <span className="text-muted-foreground">{message}</span>
            </div>
        </div>
    )
}

// Card Skeleton
export function CardSkeleton() {
    return (
        <div className="wallet-card p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-20" />
            </div>
        </div>
    )
}

// Form Skeleton
export function FormSkeleton() {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    )
}
