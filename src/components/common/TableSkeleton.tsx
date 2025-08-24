import { Skeleton } from "@/components/ui/skeleton"
import { TableRow, TableCell } from "@/components/ui/table"

interface TableSkeletonProps {
    rows?: number
    columns?: number
}

export function TableSkeleton({ rows = 5, columns = 5 }: TableSkeletonProps) {
    return (
        <>
            {Array.from({ length: rows }).map((_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                    {Array.from({ length: columns }).map((_, j) => (
                        <TableCell key={j}>
                            <Skeleton className="h-4 w-full" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    )
}

// Agent Table Specific Skeleton
export function AgentTableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <>
            {Array.from({ length: rows }).map((_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                    <TableCell>
                        <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-48" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-36" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-8 w-20" />
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}
