import LoginForm from "@/components/modules/authentication/LoginForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShieldCheck, UserCircle, Briefcase } from "lucide-react";
import { Link, Navigate } from "react-router";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { role } from "@/constants/Role";
import { LoadingState } from "@/components/common/LoadingStates";

// Helper function to get dashboard URL based on user role
const getDashboardUrl = (userRole?: string) => {
  const urlMap: Record<string, string> = {
    [role.super_admin]: '/admin',
    [role.admin]: '/admin',
    [role.agent]: '/agent',
    [role.user]: '/user'
  };
  return urlMap[userRole || ''] || '/';
};

const Login: React.FC = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);

  // Demo credentials
  const demoCredentials = [
    {
      role: 'Admin',
      email: 'test@admin.com',
      password: 'admin1234',
      icon: ShieldCheck,
      color: 'from-purple-600 to-indigo-600',
      badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20'
    },
    {
      role: 'Agent',
      email: 'test@agent.com',
      password: '123456',
      icon: Briefcase,
      color: 'from-green-600 to-emerald-600',
      badgeColor: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20'
    },
    {
      role: 'User',
      email: 'test@user.com',
      password: '123456',
      icon: UserCircle,
      color: 'from-blue-600 to-cyan-600',
      badgeColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20'
    }
  ];

  // If user is already authenticated, redirect to their dashboard
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

      {/* Demo Buttons - Fixed Position Right Side */}
      <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
        <p className="text-xs text-slate-600 dark:text-slate-400 text-right mb-1 font-medium">
          Quick Demo:
        </p>
        {demoCredentials.map((demo) => (
          <Button
            key={demo.role}
            type="button"
            size="sm"
            onClick={() => {
              if (window.fillLoginForm) {
                window.fillLoginForm(demo.email, demo.password);
              }
            }}
            className={`bg-gradient-to-r ${demo.color} text-white hover:opacity-90 shadow-md transition-all duration-200 w-24`}
          >
            <demo.icon className="h-3.5 w-3.5 mr-1.5" />
            {demo.role}
          </Button>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Login Form */}
        <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-0 shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/50">
          <CardHeader className="text-center pb-4 pt-10">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            <CardTitle className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">
              Welcome Back
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Sign in to your SwiftPay account
            </p>
          </CardHeader>

          <LoginForm />

          {/* Footer Links */}
          <div className="px-8 pb-10 pt-2 text-center space-y-4">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Sign up here
              </Link>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-500">
              By signing in, you agree to our{" "}
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

export default Login;