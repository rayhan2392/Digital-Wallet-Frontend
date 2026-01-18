import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {
    Phone,
    DollarSign,
    ArrowDown,
    ArrowLeft,
    CheckCircle,
    Info,
    Shield
} from "lucide-react";

import { useAddMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { BalanceCard } from "@/components/fintech/BalanceCard";
import { SecurityBadge } from "@/components/fintech/SecurityBadge";
import { CurrencyDisplay } from "@/components/fintech/CurrencyDisplay";
import { cn } from "@/lib/utils";

// Form validation schema
const addMoneySchema = z.object({
    userPhone: z
        .string()
        .min(1, "Phone number is required")
        .min(11, "Phone number must be exactly 11 digits")
        .max(11, "Phone number must be exactly 11 digits")
        .regex(/^01[3-9][0-9]{8}$/, "Enter a valid Bangladeshi phone number (01XXXXXXXXX)"),
    amount: z
        .string()
        .min(1, "Amount is required")
        .refine((val) => !isNaN(Number(val)), "Please enter a valid number")
        .refine((val) => Number(val) > 0, "Amount must be greater than 0")
        .refine((val) => Number(val) >= 5, "Minimum cash-in amount is ৳5")
        .refine((val) => Number(val) <= 100000, "Maximum cash-in amount is ৳100,000 per transaction")
});

type AddMoneyFormData = z.infer<typeof addMoneySchema>;

// Quick amount suggestions for agents
const quickAmounts = [5, 10, 50, 100, 500, 1000];

export default function AddMoney() {
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formData, setFormData] = useState<AddMoneyFormData | null>(null);

    // API hooks
    const { data: myWallet } = useGetMyWalletQuery(undefined);
    const [addMoney, { isLoading: isProcessing }] = useAddMoneyMutation();

    const form = useForm<AddMoneyFormData>({
        resolver: zodResolver(addMoneySchema),
        mode: "onTouched",
        defaultValues: {
            userPhone: "",
            amount: ""
        }
    });

    const watchedAmount = form.watch("amount");
    const watchedPhone = form.watch("userPhone");

    // Calculate transaction details
    const transactionDetails = useMemo(() => {
        const amount = Number(watchedAmount) || 0;

        return {
            amount,
            customerReceives: amount
        };
    }, [watchedAmount]);

    const onSubmit = (data: AddMoneyFormData) => {
        setFormData(data);
        setShowConfirmation(true);
    };

    const handleConfirmAddMoney = async () => {
        if (!formData) return;

        const addMoneyInfo = {
            userPhone: formData.userPhone,
            amount: Number(formData.amount)
        };

        const toastId = toast.loading("Processing cash-in transaction...", {
            description: "Please wait while we add money to the customer's wallet"
        });

        try {
            const res = await addMoney(addMoneyInfo).unwrap();

            if (res.success) {
                toast.success("Cash-in completed successfully!", {
                    id: toastId,
                    description: `৳${formData.amount} has been added to ${formData.userPhone}`
                });

                // Reset form and close dialog
                form.reset();
                setShowConfirmation(false);
                setFormData(null);
            }
        } catch (error) {
            console.error("Add money error:", error);
            const errorMessage = error && typeof error === 'object' && 'data' in error
                ? (error as { data?: { message?: string } }).data?.message
                : undefined;
            toast.error("Transaction failed", {
                id: toastId,
                description: errorMessage || "Unable to process cash-in transaction. Please try again."
            });
        }
    };

    const handleQuickAmount = (amount: number) => {
        form.setValue("amount", amount.toString());
        form.trigger("amount");
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate("/agent/overiview")}
                            className="h-9 w-9 p-0"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold fintech-gradient-text">Cash-In Service</h1>
                            <p className="text-muted-foreground">Add money to customer wallets</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <SecurityBadge type="verified" size="sm" />
                    <SecurityBadge type="encrypted" size="sm" />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Form */}
                <div className="lg:col-span-2">
                    <Card className="fintech-card hover:scale-100 hover:translate-y-0 hover:shadow-lg">
                        <CardHeader className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                                    <ArrowDown className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">Add Money to Customer</CardTitle>
                                    <CardDescription>Process cash-in transactions securely</CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Phone Number Field */}
                                    <FormField
                                        control={form.control}
                                        name="userPhone"
                                        render={({ field }) => (
                                            <FormItem className="fintech-slide-up delay-150">
                                                <FormLabel className="text-sm font-medium flex items-center space-x-2">
                                                    <Phone className="h-4 w-4" />
                                                    <span>Customer Phone Number</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            type="tel"
                                                            placeholder="01XXXXXXXXX"
                                                            {...field}
                                                            onInput={(e) => {
                                                                // Only allow digits
                                                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                                                                field.onChange(e.currentTarget.value);
                                                            }}
                                                            className="pl-10 h-12 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Amount Field */}
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem className="fintech-slide-up delay-200">
                                                <FormLabel className="text-sm font-medium flex items-center space-x-2">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>Cash-In Amount</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter amount (৳5 - ৳100,000)"
                                                            min="0"
                                                            {...field}
                                                            onInput={(e) => {
                                                                // Only allow non-negative numbers
                                                                const value = e.currentTarget.value;
                                                                if (value && parseFloat(value) < 0) {
                                                                    e.currentTarget.value = '0';
                                                                    field.onChange('0');
                                                                } else {
                                                                    field.onChange(value);
                                                                }
                                                            }}
                                                            className="pl-10 h-12 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Quick Amount Buttons */}
                                    <div className="fintech-slide-up delay-250">
                                        <label className="text-sm font-medium text-muted-foreground block mb-3">
                                            Quick Amounts
                                        </label>
                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                            {quickAmounts.map((amount) => (
                                                <Button
                                                    key={amount}
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleQuickAmount(amount)}
                                                    className={cn(
                                                        "h-10 text-xs font-medium transition-all duration-200",
                                                        watchedAmount === amount.toString()
                                                            ? "border-primary bg-primary/10 text-primary"
                                                            : "hover:border-primary/50 hover:bg-primary/5"
                                                    )}
                                                >
                                                    ৳{amount.toLocaleString()}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={isProcessing || !watchedPhone.trim() || !watchedAmount.trim()}
                                        className="w-full h-12 text-base font-semibold fintech-slide-up delay-300"
                                    >
                                        {isProcessing ? (
                                            <div className="flex items-center space-x-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                                <span>Processing...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center space-x-2">
                                                <ArrowDown className="h-4 w-4" />
                                                <span>Process Cash-In</span>
                                            </div>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Agent Wallet Balance */}
                    <BalanceCard
                        title="Agent Wallet"
                        balance={myWallet?.balance || 0}
                        gradient="success"
                        className="fintech-slide-up delay-100 hover:scale-100 hover:translate-y-0"
                    />

                    {/* Transaction Summary */}
                    {transactionDetails.amount > 0 && (
                        <Card className="fintech-card fintech-slide-up delay-200 hover:scale-100 hover:translate-y-0 hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center space-x-2">
                                    <Info className="h-5 w-5" />
                                    <span>Transaction Summary</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Cash-In Amount</span>
                                        <CurrencyDisplay
                                            amount={transactionDetails.amount}
                                            size="sm"
                                            variant="default"
                                        />
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between items-center font-semibold">
                                        <span className="text-sm">Customer Receives</span>
                                        <CurrencyDisplay
                                            amount={transactionDetails.customerReceives}
                                            size="md"
                                            variant="default"
                                        />
                                    </div>
                                </div>

                                <div className="bg-muted/50 rounded-lg p-3">
                                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                        <CheckCircle className="h-3 w-3 text-green-500" />
                                        <span>No fees - Customer gets full amount</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Agent Guidelines */}
                    <Card className="fintech-card-glass fintech-slide-up delay-300 hover:shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center space-x-2">
                                <Shield className="h-5 w-5" />
                                <span>Agent Guidelines</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Verify customer identity before processing</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Check phone number carefully</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Collect cash before processing</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Daily limit: ৳500,000</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <AlertDialogContent className="fintech-card-glass">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center space-x-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <ArrowDown className="h-5 w-5 text-primary" />
                            </div>
                            <span>Confirm Cash-In Transaction</span>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-4">
                            <p>Please review the transaction details before confirming:</p>

                            {formData && (
                                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium">Customer Phone:</span>
                                        <span className="text-sm">{formData.userPhone}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium">Cash-In Amount:</span>
                                        <CurrencyDisplay
                                            amount={Number(formData.amount)}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium">Customer Receives:</span>
                                        <CurrencyDisplay
                                            amount={Number(formData.amount)}
                                            size="sm"
                                            variant="positive"
                                        />
                                    </div>
                                </div>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmAddMoney}
                            disabled={isProcessing}
                            className="bg-primary hover:bg-primary/90"
                        >
                            {isProcessing ? "Processing..." : "Confirm Cash-In"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}