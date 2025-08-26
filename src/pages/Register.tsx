import RegisterForm from "@/components/modules/authentication/RegisterForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserPlus, Shield, Zap, CheckCircle } from "lucide-react";
import { Link, Navigate } from "react-router";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { SecurityBadge } from "@/components/fintech/SecurityBadge";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { role } from "@/constants/Role";
import { LoadingState } from "@/components/common/LoadingStates";

// Helper to get dashboard URL by role
const getDashboardUrl = (userRole?: string) => {
  const urlMap: Record<string, string> = {
    [role.super_admin]: "/admin",
    [role.admin]: "/admin",
    [role.agent]: "/agent",
    [role.user]: "/user",
  };
  return urlMap[userRole || ""] || "/";
};

const Register: React.FC = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);

  // Prevent logged-in users from visiting register
  if (isLoading) {
    return <LoadingState type="page" message="Checking authentication..." />;
  }

  if (data?.email && data?.role) {
    const dashboardUrl = getDashboardUrl(data.role);
    return <Navigate to={dashboardUrl} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:24px_24px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Side - Welcome Content */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Back Button */}
            <Button variant="ghost" size="sm" asChild className="w-fit text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Logo />
              </div>

              <div className="space-y-5">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  <span className="text-slate-900 dark:text-slate-100">Join</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SwiftPay</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                  Create your account and become part of Bangladesh's largest
                  digital payment revolution. Fast, secure, and absolutely free to start.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Why choose SwiftPay?</span>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">Instant Account Setup</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Get verified in under 2 minutes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">100% Secure</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Bank-level encryption & protection</p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-3 pt-4">
                <SecurityBadge type="ssl" size="sm" />
                <SecurityBadge type="encrypted" size="sm" />
                <SecurityBadge type="verified" size="sm" />
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="order-1 lg:order-2">
            <Card className="max-w-md mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-0 shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/50">
              <CardHeader className="text-center pb-8 pt-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <UserPlus className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Create Account
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400">
                  Join over 1 million users on SwiftPay
                </p>
              </CardHeader>

              <RegisterForm />

              {/* Footer Links */}
              <div className="px-8 pb-8 text-center space-y-4">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Already have an account?{" "}
                  <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    Sign in here
                  </Link>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500">
                  By creating an account, you agree to our{" "}
                  <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Terms</Link>
                  {" and "}
                  <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Privacy Policy</Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;