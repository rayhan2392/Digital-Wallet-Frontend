import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { User, Mail, Phone, Lock, UserCheck, Building2, UserPlus } from "lucide-react";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    phone: z.string().regex(/^(?:\+880|880|0)1[3-9][0-9]{8}$/, "Invalid Bangladeshi phone number"),
    role: z.enum(["user", "agent"], {
      message: "Role is required"
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterForm: React.FC = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "user",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      password: data.password
    }

    try {
      const toastId = toast.loading("Creating your account...", {
        description: "Setting up your SwiftPay wallet"
      });
      const res = await register(userInfo).unwrap();
      if (res.success) {
        toast.success("Welcome to SwiftPay!", {
          id: toastId,
          description: "Your account has been created successfully"
        });
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed", {
        description: "Please check your information and try again"
      });
    }
  };

  return (
    <CardContent className="space-y-6 px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Full Name
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                      <User className="w-5 h-5" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      {...field}
                      className="pl-12 h-12 border-2 border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 text-base rounded-xl"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                      <Phone className="w-5 h-5" />
                    </div>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      {...field}
                      className="pl-12 h-12 border-2 border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 text-base rounded-xl"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

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
                      className="pl-12 h-12 border-2 border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 text-base rounded-xl"
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
                <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                      <Lock className="w-5 h-5" />
                    </div>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      {...field}
                      className="pl-12 h-12 border-2 border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 text-base rounded-xl"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                      <Lock className="w-5 h-5" />
                    </div>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      {...field}
                      className="pl-12 h-12 border-2 border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 text-base rounded-xl"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          {/* Role Selection */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  I am a
                </FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${field.value === "user"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md shadow-blue-500/20"
                          : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600"
                        }`}
                    >
                      <div className="relative">
                        <input
                          type="radio"
                          {...field}
                          value="user"
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${field.value === "user"
                            ? "border-blue-500 bg-blue-500"
                            : "border-slate-400 dark:border-slate-500"
                          }`}>
                          {field.value === "user" && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <UserCheck className={`h-4 w-4 ${field.value === "user" ? "text-blue-600" : "text-slate-400 dark:text-slate-500"
                          }`} />
                        <span className={`text-sm font-medium ${field.value === "user"
                            ? "text-blue-900 dark:text-blue-100"
                            : "text-slate-700 dark:text-slate-300"
                          }`}>
                          Personal User
                        </span>
                      </div>
                    </label>
                    <label
                      className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${field.value === "agent"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md shadow-blue-500/20"
                          : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600"
                        }`}
                    >
                      <div className="relative">
                        <input
                          type="radio"
                          {...field}
                          value="agent"
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${field.value === "agent"
                            ? "border-blue-500 bg-blue-500"
                            : "border-slate-400 dark:border-slate-500"
                          }`}>
                          {field.value === "agent" && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building2 className={`h-4 w-4 ${field.value === "agent" ? "text-blue-600" : "text-slate-400 dark:text-slate-500"
                          }`} />
                        <span className={`text-sm font-medium ${field.value === "agent"
                            ? "text-blue-900 dark:text-blue-100"
                            : "text-slate-700 dark:text-slate-300"
                          }`}>
                          Agent
                        </span>
                      </div>
                    </label>
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 text-white font-semibold text-base shadow-xl shadow-green-600/25 hover:shadow-2xl hover:shadow-green-600/30 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 transition-all duration-300 rounded-xl"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5" />
                  <span>Create Account</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};

export default RegisterForm;