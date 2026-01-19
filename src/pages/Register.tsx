import RegisterForm from "@/components/modules/authentication/RegisterForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate } from "react-router";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
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

      {/* Back Button - Fixed Position */}
      <div className="absolute top-6 left-6 z-20">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-800/50">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Register Form */}
        <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-0 shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/50">
          <CardHeader className="text-center pb-4 pt-10">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            <CardTitle className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">
              Create Account
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Join SwiftPay and start your digital payment journey
            </p>
          </CardHeader>

          <RegisterForm />

          {/* Footer Links */}
          <div className="px-8 pb-10 pt-2 text-center space-y-4">
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
  );
};

export default Register;