import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

import { useAgentInfoQuery } from "@/redux/features/auth/auth.api";
import { useWithdrawMutation } from "@/redux/features/wallet/wallet.api";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import {
    ArrowDownToLine,
    DollarSign,
    Shield,
    Users,
    AlertCircle,
    CheckCircle,
    Wallet,
    Info,
    Star,
    MapPin,
    Phone,
    Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

// Agent type definition
interface Agent {
    _id: string;
    name: string;
    phone: string;
    location?: string;
    rating?: number;
    isAvailable?: boolean;
}

// Form validation schema - will be enhanced with balance check in component
const createWithdrawSchema = (availableBalance: number) => z.object({
    agent: z
        .string()
        .min(1, "Please select an agent"),
    amount: z
        .string()
        .min(1, "Amount is required")
        .refine((val) => !isNaN(Number(val)), "Please enter a valid number")
        .refine((val) => Number(val) > 0, "Amount must be greater than 0")
        .refine((val) => Number(val) >= 50, "Minimum withdrawal amount is ৳50")
        .refine((val) => Number(val) <= 25000, "Maximum withdrawal amount is ৳25,000 per transaction")
        .refine((val) => {
            const amount = Number(val);
            const fee = Math.max(amount * 0.005, 2); // 0.5% fee, minimum ৳2
            const total = amount + fee;
            return total <= availableBalance;
        }, `Insufficient balance. Total amount (including fees) cannot exceed ৳${availableBalance.toLocaleString()}`)
});

type WithdrawFormData = z.infer<ReturnType<typeof createWithdrawSchema>>;

// Quick amount suggestions for withdrawal
const quickAmounts = [500, 1000, 2000, 5000, 10000];

export default function Withdraw() {
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formData, setFormData] = useState<WithdrawFormData | null>(null);

    // API hooks
    const { data: agents } = useAgentInfoQuery({});
    const { data: myWallet } = useGetMyWalletQuery(undefined);
    const [withdraw, { isLoading: isWithdrawing }] = useWithdrawMutation();

    const availableBalance = myWallet?.balance || 0;

    const form = useForm<WithdrawFormData>({
        resolver: zodResolver(createWithdrawSchema(availableBalance)),
        mode: "onChange", // Validate on change for real-time feedback
        defaultValues: {
            agent: "",
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
    const watchedAgent = form.watch("agent");

    // Form validation state
    const { isValid } = form.formState;

    // Calculate fees and final amounts
    const transactionDetails = useMemo(() => {
        const amount = Number(watchedAmount) || 0;
        const fee = amount > 0 ? Math.max(amount * 0.005, 2) : 0; // 0.5% fee, minimum ৳2
        const total = amount + fee;

        return {
            amount,
            fee,
            total,
            availableBalance: myWallet?.balance || 0,
            canAfford: total <= (myWallet?.balance || 0)
        };
    }, [watchedAmount, myWallet?.balance]);

    // Get selected agent details
    const selectedAgent = useMemo(() => {
        return agents?.find((agent: Agent) => agent.phone === watchedAgent);
    }, [agents, watchedAgent]);

    const onSubmit = (data: WithdrawFormData) => {
        setFormData(data);
        setShowConfirmation(true);
    };

    const handleConfirmWithdraw = async () => {
        if (!formData) return;

        const withdrawInfo = {
            agentPhone: formData.agent,
            amount: Number(formData.amount)
        };

        const toastId = toast.loading("Processing withdrawal...");

        try {
            const res = await withdraw(withdrawInfo).unwrap();

            if (res.success) {
                toast.success("Withdrawal successful!", { id: toastId });
                form.reset();
                setShowConfirmation(false);
                setFormData(null);
                navigate("/user/my-wallet");
            }
        } catch (error: unknown) {
            let errorMessage = "Failed to process withdrawal. Please try again.";

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
            } else if (errorMessage.toLowerCase().includes('agent not available') || errorMessage.toLowerCase().includes('agent')) {
                errorMessage = "Selected agent is not available. Please choose another agent.";
            } else if (errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('connection')) {
                errorMessage = "Network error. Please check your connection and try again.";
            } else if (errorMessage.toLowerCase().includes('server')) {
                errorMessage = "Server error. Please try again in a moment.";
            }

            toast.error(errorMessage, { id: toastId });
            console.error("Withdraw error:", error);

            // Don't close the dialog on error so user can retry
            setShowConfirmation(false);
        }
    };

    const selectQuickAmount = (amount: number) => {
        form.setValue("amount", amount.toString());
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning!";
        if (hour < 17) return "Good afternoon!";
        return "Good evening!";
    };

    return (
        <div className="min-h-screen fintech-hero-bg">
            <div className="fintech-container space-y-8 py-8">

                {/* Header */}
                <div className="text-center space-y-4 fintech-fade-in">
                    <div className="flex items-center justify-center space-x-4">
                        
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 backdrop-blur-sm">
                            <ArrowDownToLine className="h-12 w-12 text-emerald-600" />
                        </div>
                    </div>
                    <div>
                        <h1 className="fintech-gradient-text text-4xl md:text-5xl font-bold tracking-tight">
                            Cash Withdrawal
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
                            {getGreeting()} Withdraw cash from any of our trusted agents
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
                                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-green-500/20">
                                    <ArrowDownToLine className="h-5 w-5 text-emerald-600" />
                                </div>
                                <span className="fintech-gradient-text">Withdrawal Details</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                    {/* Agent Selection */}
                                    <FormField
                                        control={form.control}
                                        name="agent"
                                        render={({ field }) => (
                                            <FormItem className="fintech-slide-up delay-150">
                                                <FormLabel className="text-sm font-medium flex items-center space-x-2">
                                                    <Users className="h-4 w-4" />
                                                    <span>Select Agent</span>
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-12 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all duration-200">
                                                            <SelectValue placeholder="Choose an agent near you" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {agents?.map((agent: Agent) => (
                                                            <SelectItem key={agent._id} value={agent.phone}>
                                                                <div className="flex items-center space-x-3 py-1">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center space-x-2">
                                                                            <span className="font-medium">{agent.name}</span>
                                                                            <Badge variant="outline" className="text-xs">
                                                                                {agent.isAvailable !== false ? "Available" : "Busy"}
                                                                            </Badge>
                                                                        </div>
                                                                        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                                                                            <Phone className="h-3 w-3" />
                                                                            <span>{agent.phone}</span>
                                                                            {agent.location && (
                                                                                <>
                                                                                    <MapPin className="h-3 w-3 ml-2" />
                                                                                    <span>{agent.location}</span>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Selected Agent Info */}
                                    {selectedAgent && (
                                        <Card className="fintech-card-glass fintech-slide-up delay-300">
                                            <CardContent className="p-4">
                                                <h4 className="font-medium mb-3 flex items-center space-x-2">
                                                    <Users className="h-4 w-4 text-emerald-600" />
                                                    <span>Selected Agent</span>
                                                </h4>
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white font-semibold">
                                                        {selectedAgent.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="font-medium">{selectedAgent.name}</span>
                                                            <Badge variant="outline" className="text-xs">
                                                                {selectedAgent.isAvailable !== false ? "Available" : "Busy"}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                                                            <div className="flex items-center space-x-1">
                                                                <Phone className="h-3 w-3" />
                                                                <span>{selectedAgent.phone}</span>
                                                            </div>
                                                            {selectedAgent.location && (
                                                                <div className="flex items-center space-x-1">
                                                                    <MapPin className="h-3 w-3" />
                                                                    <span>{selectedAgent.location}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Quick Amount Selection */}
                                    <div className="fintech-slide-up delay-450">
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
                                            <FormItem className="fintech-slide-up delay-600">
                                                <FormLabel className="text-sm font-medium flex items-center space-x-2">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>Withdrawal Amount</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter amount to withdraw"
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
                                        <Card className="fintech-card-glass fintech-slide-up delay-750">
                                            <CardContent className="p-4">
                                                <h4 className="font-medium mb-3 flex items-center space-x-2">
                                                    <Info className="h-4 w-4 text-emerald-600" />
                                                    <span>Transaction Summary</span>
                                                </h4>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Withdrawal Amount:</span>
                                                        <span className="font-medium">৳{transactionDetails.amount.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Service Fee:</span>
                                                        <span className="font-medium">৳{transactionDetails.fee.toFixed(2)}</span>
                                                    </div>
                                                    <div className="border-t pt-2">
                                                        <div className="flex justify-between font-semibold">
                                                            <span>Total Deducted:</span>
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
                                                    "w-full fintech-slide-up delay-900",
                                                    (!isValid || !transactionDetails.canAfford || transactionDetails.amount === 0) && "opacity-50 cursor-not-allowed"
                                                )}
                                                disabled={!isValid || !transactionDetails.canAfford || isWithdrawing || transactionDetails.amount === 0}
                                            >
                                                <ArrowDownToLine className="h-5 w-5 mr-2" />
                                                {isWithdrawing ? "Processing..." :
                                                    !watchedAgent.trim() || !watchedAmount.trim() ? "Complete Form" :
                                                        !isValid ? "Invalid Details" :
                                                            !transactionDetails.canAfford ? "Insufficient Balance" :
                                                                "Withdraw Cash"}
                                            </Button>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent className="fintech-card">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="flex items-center space-x-2">
                                                    <Shield className="h-5 w-5 text-primary" />
                                                    <span>Confirm Withdrawal</span>
                                                </AlertDialogTitle>
                                                <AlertDialogDescription asChild>
                                                    <div className="space-y-4">
                                                        <p>Please review your withdrawal details before confirming.</p>

                                                        {formData && selectedAgent && (
                                                            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                                                                <div className="flex justify-between">
                                                                    <span className="text-muted-foreground">Agent:</span>
                                                                    <span className="font-medium">{selectedAgent.name}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-muted-foreground">Phone:</span>
                                                                    <span className="font-medium">{selectedAgent.phone}</span>
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
                                                                        <span>Total Deducted:</span>
                                                                        <span>৳{transactionDetails.total.toLocaleString()}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="flex items-center space-x-2 text-sm text-green-600">
                                                            <CheckCircle className="h-4 w-4" />
                                                            <span>Cash will be available for pickup immediately</span>
                                                        </div>
                                                    </div>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={handleConfirmWithdraw}
                                                    disabled={isWithdrawing}
                                                    className="bg-primary hover:bg-primary/90"
                                                >
                                                    {isWithdrawing ? "Processing..." : "Confirm Withdrawal"}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                {/* Benefits Information */}
                <div className="max-w-2xl mx-auto fintech-slide-up delay-1050">
                    <Card className="fintech-card-glass">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-500">
                                    <Shield className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                    Secure Cash Withdrawal
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div className="space-y-2">
                                    <Clock className="h-8 w-8 text-emerald-600 mx-auto" />
                                    <h4 className="font-semibold">Instant Processing</h4>
                                    <p className="text-sm text-muted-foreground">Cash ready in minutes</p>
                                </div>
                                <div className="space-y-2">
                                    <Shield className="h-8 w-8 text-green-600 mx-auto" />
                                    <h4 className="font-semibold">Verified Agents</h4>
                                    <p className="text-sm text-muted-foreground">Trusted & secure</p>
                                </div>
                                <div className="space-y-2">
                                    <Star className="h-8 w-8 text-yellow-600 mx-auto" />
                                    <h4 className="font-semibold">Low Fees</h4>
                                    <p className="text-sm text-muted-foreground">Only 0.5% service fee</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}