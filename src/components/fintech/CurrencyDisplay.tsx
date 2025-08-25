import { cn } from "@/lib/utils";

interface CurrencyDisplayProps {
    amount: number;
    currency?: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "default" | "positive" | "negative";
    showSign?: boolean;
}

export function CurrencyDisplay({
    amount,
    currency = "৳",
    className,
    size = "md",
    variant = "default",
    showSign = false
}: CurrencyDisplayProps) {
    const sizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg font-semibold",
        xl: "text-2xl font-bold"
    };

    const variantClasses = {
        default: "text-foreground",
        positive: "text-green-600 dark:text-green-400",
        negative: "text-red-600 dark:text-red-400"
    };

    const formattedAmount = amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const sign = showSign && amount > 0 ? "+" : "";

    return (
        <span className={cn(
            "font-mono tracking-tight",
            sizeClasses[size],
            variantClasses[variant],
            className
        )}>
            {sign}{currency}{formattedAmount}
        </span>
    );
}
