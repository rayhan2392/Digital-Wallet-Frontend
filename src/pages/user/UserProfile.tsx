import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";

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
  Star
} from "lucide-react";

export default function UserProfile() {
  const navigate = useNavigate();

  const { data: myProfile, isLoading: profileLoading } = useUserInfoQuery(undefined);
  const { data: myWallet } = useGetMyWalletQuery(undefined);

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
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

  const getUserBadge = () => {
    return (
      <Badge className="bg-blue-50 text-blue-700 border-blue-200">
        <User className="h-3 w-3 mr-1" />
        User
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

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
      <div className="fintech-container space-y-8 py-8">

        {/* Header */}
        <div className="text-center space-y-4 fintech-fade-in">
          <div className="flex items-center justify-center space-x-4">
            
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 backdrop-blur-sm">
              <User className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <div>
            <h1 className="fintech-gradient-text text-4xl md:text-5xl font-bold tracking-tight">
              My Profile
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
              {getGreeting()}, {myProfile?.name}! Manage your account information
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">

          {/* Main Profile Card */}
          <Card variant="fintech" className="fintech-scale-in">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold">
                      {getInitials(myProfile?.name || '')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center space-y-2">
                    {getUserBadge()}
                    {getStatusBadge(myProfile?.status || 'approved')}
                  </div>
                </div>

                {/* Profile Information */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {myProfile?.name || 'User Name'}
                    </h2>
                    <p className="text-muted-foreground">
                      Member since {myProfile?.createdAt ? formatDate(myProfile.createdAt) : 'N/A'}
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
                    <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
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
                      {myProfile?.status === 'approved' ? 'Verified' : 'Pending Verification'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="fintech">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Member Tier</p>
                    <p className="text-lg font-semibold">
                      Standard User
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

            {/* Security Status */}
            <Card variant="fintech">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Account Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-700">Account Verified</p>
                      <p className="text-sm text-green-600">Your account is secure</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Account Status</span>
                    {getStatusBadge(myProfile?.status || 'approved')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="text-sm font-medium">
                      {myProfile?.createdAt ? formatDate(myProfile.createdAt) : 'N/A'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card variant="fintech" className="fintech-slide-up delay-600">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Quick Actions</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your wallet and transactions
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/user/send-money")}
                    className="h-16 flex flex-col space-y-1"
                  >
                    <ArrowLeft className="h-5 w-5 rotate-45" />
                    <span className="text-sm">Send Money</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/user/withdraw")}
                    className="h-16 flex flex-col space-y-1"
                  >
                    <Wallet className="h-5 w-5" />
                    <span className="text-sm">Withdraw</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/user/transactions")}
                    className="h-16 flex flex-col space-y-1"
                  >
                    <Activity className="h-5 w-5" />
                    <span className="text-sm">Transactions</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}