import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            {/* Stats Cards Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-8 w-16" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="h-12 w-12 rounded-lg" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Middle Section Skeleton */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Transaction Chart Skeleton */}
                <Card className="animate-pulse">
                    <CardHeader>
                        <Skeleton className="h-6 w-40" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-48 w-48 rounded-full" />
                            <div className="space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <Skeleton className="h-3 w-3 rounded-full" />
                                        <div className="space-y-1">
                                            <Skeleton className="h-4 w-20" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Feed Skeleton */}
                <Card className="animate-pulse">
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex items-start space-x-3">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-12" />
                                        </div>
                                        <Skeleton className="h-3 w-48" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Status Cards Skeleton */}
            <div className="grid gap-4 md:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader>
                            <Skeleton className="h-6 w-24" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="text-center space-y-2">
                                    <Skeleton className="h-9 w-16 mx-auto" />
                                    <Skeleton className="h-4 w-20 mx-auto" />
                                </div>
                                <div className="space-y-4">
                                    {Array.from({ length: 2 }).map((_, j) => (
                                        <div key={j} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Skeleton className="h-4 w-16" />
                                                <div className="space-y-1">
                                                    <Skeleton className="h-4 w-8" />
                                                    <Skeleton className="h-3 w-10" />
                                                </div>
                                            </div>
                                            <Skeleton className="h-2 w-full rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
