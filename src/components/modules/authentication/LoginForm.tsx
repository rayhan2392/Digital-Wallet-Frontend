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

      if (res.success) {
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
            console.log("Executing navigation to:", dashboardUrl); // Debug log
            try {
              navigate(dashboardUrl);
              console.log("Navigation executed successfully"); // Debug log
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
    <CardContent className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      className="pl-10 h-12 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="text-sm font-medium">Password</FormLabel>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs text-primary hover:text-primary/80 p-0 h-auto"
                  >
                    Forgot password?
                  </Button>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      className="pl-10 pr-10 h-12 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="fintech-primary"
            size="lg"
            className="w-full h-12"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent" />
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>
    </CardContent>
  );
};

export default LoginForm;
