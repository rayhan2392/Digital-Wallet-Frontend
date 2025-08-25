import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useSendMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import {
    ArrowUpRight,
    Phone,
    DollarSign,
    Shield,
    Clock,
    AlertCircle,
    CheckCircle,
    Wallet,
    Info,
    Star,
    ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

// Form validation schema - will be enhanced with balance check in component
const createSendMoneySchema = (availableBalance: number) => z.object({
    receiverPhone: z
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
        .refine((val) => Number(val) >= 10, "Minimum amount is ৳10")
        .refine((val) => Number(val) <= 50000, "Maximum amount is ৳50,000 per transaction")
        .refine((val) => {
            const amount = Number(val);
            const fee = Math.max(amount * 0.01, 5);
            const total = amount + fee;
            return total <= availableBalance;
        }, `Insufficient balance. Total amount (including fees) cannot exceed ৳${availableBalance.toLocaleString()}`)
});

type SendMoneyFormData = z.infer<ReturnType<typeof createSendMoneySchema>>;



// Quick amount suggestions
const quickAmounts = [100, 500, 1000, 2000, 5000];

export default function SendMoney() {
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formData, setFormData] = useState<SendMoneyFormData | null>(null);

    const { data: myWallet } = useGetMyWalletQuery(undefined);

    const [sendMoney, { isLoading: isSending }] = useSendMoneyMutation();

    const availableBalance = myWallet?.balance || 0;

    const form = useForm<SendMoneyFormData>({
        resolver: zodResolver(createSendMoneySchema(availableBalance)),
        mode: "onChange", // Validate on change for real-time feedback
        defaultValues: {
            receiverPhone: "",
            amount: ""
        }
    });

    // Update form resolver when balance changes
    useEffect(() => {
        if (availableBalance > 0) {
            form.clearErrors(); // Clear previous errors
            // Re-trigger validation with new balance
            form.trigger();
        }
    }, [availableBalance, form]);

    const watchedAmount = form.watch("amount");
    const watchedPhone = form.watch("receiverPhone");

    // Form validation state
    const { isValid } = form.formState;


    // Calculate fees and final amounts
    const transactionDetails = useMemo(() => {
        const amount = Number(watchedAmount) || 0;
        const fee = amount > 0 ? Math.max(amount * 0.01, 5) : 0; // 1% fee, minimum ৳5
        const total = amount + fee;

        return {
            amount,
            fee,
            total,
            availableBalance: myWallet?.balance || 0,
            canAfford: total <= (myWallet?.balance || 0)
        };
    }, [watchedAmount, myWallet?.balance]);

    const onSubmit = (data: SendMoneyFormData) => {
        setFormData(data);
        setShowConfirmation(true);
    };

    const handleConfirmSend = async () => {
        if (!formData) return;

        const sendMoneyInfo = {
            receiverPhone: formData.receiverPhone,
            amount: Number(formData.amount)
        };

        const toastId = toast.loading("Sending money...");

        try {
            const res = await sendMoney(sendMoneyInfo).unwrap();

            if (res.success) {
                toast.success("Money sent successfully!", { id: toastId });
                form.reset();
                setShowConfirmation(false);
                setFormData(null);
                navigate("/user/my-wallet");
            }
        } catch (error: unknown) {
            let errorMessage = "Failed to send money. Please try again.";

            // Handle different types of errors
            if (error && typeof error === 'object') {
                if ('data' in error && error.data && typeof error.data === 'object') {
                    if ('message' in error.data && typeof error.data.message === 'string') {
                        errorMessage = error.data.message;
                    } else if ('error' in error.data && typeof error.data.error === 'string') {
                        errorMessage = error.data.error;
                    }
                } else if ('message' in error && typeof error.message === 'string') {
                    errorMessage = error.message;
                }
            }

            // Show specific error messages for common scenarios
            if (errorMessage.toLowerCase().includes('insufficient')) {
                errorMessage = "Insufficient balance. Please check your wallet balance.";
            } else if (errorMessage.toLowerCase().includes('invalid phone') || errorMessage.toLowerCase().includes('phone number')) {
                errorMessage = "Invalid phone number. Please enter a valid Bangladeshi phone number.";
            } else if (errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('connection')) {
                errorMessage = "Network error. Please check your connection and try again.";
            } else if (errorMessage.toLowerCase().includes('server')) {
                errorMessage = "Server error. Please try again in a moment.";
            }

            toast.error(errorMessage, { id: toastId });
            console.error("Send money error:", error);

            // Don't close the dialog on error so user can retry
            setShowConfirmation(false);
        }
    };

    const selectQuickAmount = (amount: number) => {
        form.setValue("amount", amount.toString());
    };



    return (
        <div className="min-h-screen fintech-hero-bg">
            <div className="fintech-container space-y-8 py-8">

                {/* Header */}
                <div className="text-center space-y-4 fintech-fade-in">
                    <div className="flex items-center justify-center space-x-4">
                        <Button
                            variant="fintech-ghost"
                            size="sm"
                            onClick={() => navigate("/user/my-wallet")}
                            className="absolute left-4 top-8"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-sm">
                            <ArrowUpRight className="h-12 w-12 text-blue-600" />
                        </div>
                    </div>
                    <div>
                        <h1 className="fintech-gradient-text text-4xl md:text-5xl font-bold tracking-tight">
                            Send Money
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
                            Transfer money instantly to any mobile wallet in Bangladesh
                        </p>
                    </div>

                    {/* Available Balance */}
                    <div className="flex items-center justify-center space-x-2">
                        <Wallet className="h-5 w-5 text-muted-foreground" />
                        <span className="text-muted-foreground">Available Balance:</span>
                        <span className="font-bold text-lg text-primary">
                            ৳{myWallet?.balance?.toLocaleString() || '0'}
                        </span>
                    </div>
                </div>

                {/* Main Form */}
                <div className="max-w-2xl mx-auto fintech-scale-in">
                    <Card variant="fintech">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                                    <ArrowUpRight className="h-5 w-5 text-blue-600" />
                                </div>
                                <span className="fintech-gradient-text">Transfer Details</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">



                                    {/* Phone Number Field */}
                                    <FormField
                                        control={form.control}
                                        name="receiverPhone"
                                        render={({ field }) => (
                                            <FormItem className="fintech-slide-up delay-150">
                                                <FormLabel className="text-sm font-medium flex items-center space-x-2">
                                                    <Phone className="h-4 w-4" />
                                                    <span>Recipient Phone Number</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            type="tel"
                                                            placeholder="01XXXXXXXXX"
                                                            {...field}
                                                            className="pl-10 h-12 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Quick Amount Selection */}
                                    <div className="fintech-slide-up delay-300">
                                        <div className="flex items-center space-x-2 mb-4">
                                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                                            <span className="text-sm font-medium text-muted-foreground">Quick Amounts</span>
                                        </div>
                                        <div className="grid grid-cols-5 gap-2">
                                            {quickAmounts.map((amount) => (
                                                <button
                                                    key={amount}
                                                    type="button"
                                                    onClick={() => selectQuickAmount(amount)}
                                                    className={cn(
                                                        "p-3 rounded-lg border text-sm font-medium",
                                                        Number(watchedAmount) === amount && "border-primary bg-primary/10 text-primary"
                                                    )}
                                                >
                                                    ৳{amount}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Amount Field */}
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem className="fintech-slide-up delay-450">
                                                <FormLabel className="text-sm font-medium flex items-center space-x-2">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>Amount</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter amount"
                                                            {...field}
                                                            className="pl-10 h-12 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Transaction Summary */}
                                    {transactionDetails.amount > 0 && (
                                        <Card className="fintech-card-glass fintech-slide-up delay-600">
                                            <CardContent className="p-4">
                                                <h4 className="font-medium mb-3 flex items-center space-x-2">
                                                    <Info className="h-4 w-4 text-blue-600" />
                                                    <span>Transaction Summary</span>
                                                </h4>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Amount:</span>
                                                        <span className="font-medium">৳{transactionDetails.amount.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Transaction Fee:</span>
                                                        <span className="font-medium">৳{transactionDetails.fee.toFixed(2)}</span>
                                                    </div>
                                                    <div className="border-t pt-2">
                                                        <div className="flex justify-between font-semibold">
                                                            <span>Total Amount:</span>
                                                            <span className={cn(
                                                                transactionDetails.canAfford ? "text-green-600" : "text-red-600"
                                                            )}>
                                                                ৳{transactionDetails.total.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {!transactionDetails.canAfford && (
                                                    <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30">
                                                        <div className="flex items-center space-x-2 text-red-700 dark:text-red-400">
                                                            <AlertCircle className="h-4 w-4" />
                                                            <span className="text-sm font-medium">Insufficient Balance</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Submit Button */}
                                    <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                type="submit"
                                                variant="fintech-primary"
                                                size="lg"
                                                className={cn(
                                                    "w-full fintech-slide-up delay-750",
                                                    (!isValid || !transactionDetails.canAfford || transactionDetails.amount === 0) && "opacity-50 cursor-not-allowed"
                                                )}
                                                disabled={!isValid || !transactionDetails.canAfford || isSending || transactionDetails.amount === 0}
                                            >
                                                <ArrowUpRight className="h-5 w-5 mr-2" />
                                                {isSending ? "Sending..." :
                                                    !watchedPhone.trim() || !watchedAmount.trim() ? "Enter Details" :
                                                        !isValid ? "Invalid Details" :
                                                            !transactionDetails.canAfford ? "Insufficient Balance" :
                                                                "Send Money"}
                                            </Button>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent className="fintech-card">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="flex items-center space-x-2">
                                                    <Shield className="h-5 w-5 text-primary" />
                                                    <span>Confirm Transaction</span>
                                                </AlertDialogTitle>
                                                <AlertDialogDescription asChild>
                                                    <div className="space-y-4">
                                                        <p>Please review your transaction details before confirming.</p>

                                                        {formData && (
                                                            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                                                                <div className="flex justify-between">
                                                                    <span className="text-muted-foreground">To:</span>
                                                                    <span className="font-medium">{formData.receiverPhone}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-muted-foreground">Amount:</span>
                                                                    <span className="font-medium">৳{Number(formData.amount).toLocaleString()}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-muted-foreground">Fee:</span>
                                                                    <span className="font-medium">৳{transactionDetails.fee.toFixed(2)}</span>
                                                                </div>
                                                                <div className="border-t pt-2">
                                                                    <div className="flex justify-between font-semibold">
                                                                        <span>Total:</span>
                                                                        <span>৳{transactionDetails.total.toLocaleString()}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="flex items-center space-x-2 text-sm text-green-600">
                                                            <CheckCircle className="h-4 w-4" />
                                                            <span>Transaction is secured with bank-level encryption</span>
                                                        </div>
                                                    </div>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={handleConfirmSend}
                                                    disabled={isSending}
                                                    className="bg-primary hover:bg-primary/90"
                                                >
                                                    {isSending ? "Sending..." : "Confirm & Send"}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                {/* Security Information */}
                <div className="max-w-2xl mx-auto fintech-slide-up delay-900">
                    <Card className="fintech-card-glass">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                                    <Shield className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
                                    Secure Transfer
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div className="space-y-2">
                                    <Clock className="h-8 w-8 text-blue-600 mx-auto" />
                                    <h4 className="font-semibold">Instant Transfer</h4>
                                    <p className="text-sm text-muted-foreground">Money reaches instantly</p>
                                </div>
                                <div className="space-y-2">
                                    <Shield className="h-8 w-8 text-green-600 mx-auto" />
                                    <h4 className="font-semibold">Bank-Level Security</h4>
                                    <p className="text-sm text-muted-foreground">256-bit encryption</p>
                                </div>
                                <div className="space-y-2">
                                    <Star className="h-8 w-8 text-yellow-600 mx-auto" />
                                    <h4 className="font-semibold">Trusted Platform</h4>
                                    <p className="text-sm text-muted-foreground">5M+ satisfied users</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}