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
  const [register] = useRegisterMutation();
  const navigate= useNavigate();

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
    console.log(data);
    const userInfo = {
      name:data.name,
      email:data.email,
      phone:data.phone,
      role:data.role,
      password:data.password
    }

    try {
      const res = await register(userInfo).unwrap();
      if(res.success){
        toast.success("User created successfully")
        navigate("/")

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardContent className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      {...field}
                      className="pl-10 border-[var(--border)] bg-[var(--background)]/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
          </div>
          <div className="relative">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      {...field}
                      className="pl-10 border-[var(--border)] bg-[var(--background)]/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </div>
          <div className="relative">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      {...field}
                      className="pl-10 border-[var(--border)] bg-[var(--background)]/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
          </div>
          <div className="relative">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="pl-10 border-[var(--border)] bg-[var(--background)]/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
          </div>
          <div className="relative">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                      className="pl-10 border-[var(--border)] bg-[var(--background)]/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </div>
          <div className="relative">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Input
                          type="radio"
                          id="user"
                          {...field}
                          value="user"
                          className="border-[var(--border)]"
                        />
                        <label htmlFor="user" className="text-foreground">User</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="radio"
                          id="agent"
                          {...field}
                          value="agent"
                          className="border-[var(--border)]"
                        />
                        <label htmlFor="agent" className="text-foreground">Agent</label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
          >
            Register
          </Button>
        </form>
      </Form>
    </CardContent>
  );
};

export default RegisterForm;