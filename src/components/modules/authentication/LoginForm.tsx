import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { role } from "@/constants/Role";

//  Zod schema for validation
const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

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

// Helper function to get role display name
const getRoleDisplayName = (userRole?: string) => {
  const roleMap: Record<string, string> = {
    [role.super_admin]: 'Super Admin',
    [role.admin]: 'Administrator',
    [role.agent]: 'Agent',
    [role.user]: 'User'
  };
  return roleMap[userRole || ''] || 'User';
};

const LoginForm: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  //  useForm with Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const toastId = toast.loading("Signing you in...", {
        description: "Please wait while we verify your credentials"
      });

      const res = await login(userInfo).unwrap();

      console.log(res);

      if (res.success) {

        if ( res.data?.user?.role==="agent" && res.data?.user?.isApproved===false) {
          toast.warning("Account Not Approved", {
            id: toastId,
            description: "You can stay logged in but dashboard access is restricted"
          });

          // Navigate to home page
          setTimeout(() => {
            navigate('/');
          }, 1500);
          return;
        }
        // Get user role from the confirmed path
        const userRole = res.data?.user?.role;

        if (userRole) {
          // Role found, proceed with navigation
          const dashboardUrl = getDashboardUrl(userRole);
          const roleName = getRoleDisplayName(userRole);

          // Show success message with role info
          toast.success("Welcome back to SwiftPay!", {
            id: toastId,
            description: `You have been successfully signed in as ${roleName}`
          });

          // Show redirect message
          toast.info("Redirecting to your dashboard...", {
            description: `Taking you to your ${roleName} dashboard`,
            duration: 2000
          });

          // Navigate to dashboard after a longer delay to ensure auth state is updated
          setTimeout(() => {

            try {
              navigate(dashboardUrl);

            } catch (navError) {
              console.error("Navigation failed:", navError); // Debug log
              // Fallback: try to navigate to home
              navigate('/');
            }
          }, 2500);
        } else {
          // Fallback: redirect to home if role is somehow missing
          toast.success("Welcome back to SwiftPay!", {
            id: toastId,
            description: "You have been successfully signed in"
          });

          toast.info("Redirecting to home page...", {
            description: "Your role information will be available shortly"
          });

          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Sign in failed", {
        description: "Please check your credentials and try again"
      });
    }
  };



  return (
    <CardContent className="space-y-8 px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                      <Mail className="w-5 h-5" />
                    </div>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      className="pl-12 h-14 border-2 border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 text-base rounded-xl"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </FormLabel>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs text-blue-600 dark:text-blue-400 p-0 h-auto hover:bg-transparent font-medium"
                  >
                    Forgot password?
                  </Button>
                </div>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                      <Lock className="w-5 h-5" />
                    </div>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      className="pl-12 pr-12 h-14 border-2 border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 text-base rounded-xl"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-semibold text-base shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/30 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 transition-all duration-300 rounded-xl"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Signing In...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Sign In</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};

export default LoginForm;
