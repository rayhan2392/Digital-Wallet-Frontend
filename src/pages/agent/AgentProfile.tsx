import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";

import { useNavigate } from "react-router";
import {
    User,
    Mail,
    Phone,
    Shield,
    Calendar,
    Edit3,
    ArrowLeft,
    CheckCircle,
    Clock,
    AlertCircle,
    Wallet,
    Activity,
    DollarSign
} from "lucide-react";

export default function AgentProfile() {
    const navigate = useNavigate();

    const { data: myProfile, isLoading: profileLoading } = useUserInfoQuery(undefined);
    const { data: myWallet } = useGetMyWalletQuery(undefined);
    const { data: transactions = [] } = useGetMyTransactionsQuery({});

    const getInitials = (name: string) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'A';
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return (
                    <Badge className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                    </Badge>
                );
            case 'pending':
                return (
                    <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                    </Badge>
                );
            case 'suspended':
                return (
                    <Badge className="bg-red-50 text-red-700 border-red-200">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Suspended
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        Unknown
                    </Badge>
                );
        }
    };

    const getAgentBadge = () => {
        return (
            <Badge className="bg-green-50 text-green-700 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                Agent
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Calculate agent stats
    const totalTransactions = transactions.length;
    const completedTransactions = transactions.filter(t => t.status === 'completed').length;
    const cashInTransactions = transactions.filter(t => t.type === 'cash_in' && t.status === 'completed');
    const totalCommission = cashInTransactions.reduce((sum, t) => sum + Math.max(t.amount * 0.002, 2), 0);

    if (profileLoading) {
        return (
            <div className="min-h-screen fintech-hero-bg">
                <div className="fintech-container py-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Loading skeleton */}
                        <Card className="animate-pulse">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-20 h-20 bg-muted rounded-full"></div>
                                    <div className="space-y-2">
                                        <div className="h-6 bg-muted rounded w-40"></div>
                                        <div className="h-4 bg-muted rounded w-60"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen fintech-hero-bg">
            <div className="fintech-container py-8">

                {/* Header */}
                <div className="text-center space-y-4 fintech-fade-in mb-8">
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
                                    <p className="text-muted-foreground">Your account information and statistics</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-sm">
                                <Shield className="h-12 w-12 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className="fintech-gradient-text text-4xl md:text-5xl font-bold tracking-tight">
                            Agent Profile
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
                            {myProfile?.name ? `Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, ${myProfile.name}!` : 'Your agent account information'}
                        </p>
                    </div>
                </div>

                {/* Content Cards */}
                <div className="space-y-6">

                    {/* Main Profile Card */}
                    <Card variant="fintech" className="fintech-scale-in">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                                {/* Avatar Section */}
                                <div className="flex flex-col items-center space-y-4">
                                    <Avatar className="w-24 h-24 border-4 border-green-500/20">
                                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-2xl font-bold">
                                            {getInitials(myProfile?.name || '')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="text-center space-y-2">
                                        {getAgentBadge()}
                                        {getStatusBadge(myProfile?.status || 'approved')}
                                    </div>
                                </div>

                                {/* Profile Information */}
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            {myProfile?.name || 'Agent Name'}
                                        </h2>
                                        <p className="text-muted-foreground">
                                            Agent since {myProfile?.createdAt ? formatDate(myProfile.createdAt) : 'N/A'}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                                                    <Mail className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                                    <p className="font-medium">{myProfile?.email || 'Not provided'}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                                                    <Phone className="h-4 w-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                                    <p className="font-medium">{myProfile?.phone || 'Not provided'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                                                    <Calendar className="h-4 w-4 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">Joined</p>
                                                    <p className="font-medium">
                                                        {myProfile?.createdAt ? formatDate(myProfile.createdAt) : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                                                    <Activity className="h-4 w-4 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                                    <p className="font-medium">
                                                        {myProfile?.updatedAt ? formatDate(myProfile.updatedAt) : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Edit Profile Button (Disabled) */}
                            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
                                        <Edit3 className="h-4 w-4 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Profile Settings</p>
                                        <p className="text-sm text-muted-foreground">
                                            Edit functionality will be available soon
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    disabled
                                    className="opacity-50 cursor-not-allowed"
                                >
                                    <Edit3 className="h-4 w-4 mr-2" />
                                    Edit Profile (Coming Soon)
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fintech-slide-up delay-300">
                        <Card variant="fintech">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                                        <Wallet className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Agent Balance</p>
                                        <p className="text-2xl font-bold text-green-600">
                                            ৳{myWallet?.balance?.toLocaleString() || '0'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card variant="fintech">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                                        <Shield className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                                        <p className="text-lg font-semibold">
                                            {myProfile?.status === 'approved' ? 'Verified Agent' : 'Pending Verification'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card variant="fintech">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                                        <DollarSign className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Commission</p>
                                        <p className="text-lg font-semibold text-green-600">
                                            ৳{totalCommission.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Account Information Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fintech-slide-up delay-450">
                        {/* Personal Information */}
                        <Card variant="fintech">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="h-5 w-5 text-blue-600" />
                                    <span>Personal Information</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Full Name</span>
                                        <span className="text-sm font-medium">{myProfile?.name || 'Not provided'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Email Address</span>
                                        <span className="text-sm font-medium">{myProfile?.email || 'Not provided'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Phone Number</span>
                                        <span className="text-sm font-medium">{myProfile?.phone || 'Not provided'}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Agent Statistics */}
                        <Card variant="fintech">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Activity className="h-5 w-5 text-green-600" />
                                    <span>Agent Statistics</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Total Transactions</span>
                                        <span className="text-sm font-medium">{totalTransactions}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Completed</span>
                                        <span className="text-sm font-medium text-green-600">{completedTransactions}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Cash-In Count</span>
                                        <span className="text-sm font-medium">{cashInTransactions.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Total Commission</span>
                                        <span className="text-sm font-medium text-green-600">৳{totalCommission.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}