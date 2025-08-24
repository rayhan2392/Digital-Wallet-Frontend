import RegisterForm from "@/components/modules/authentication/RegisterForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserPlus, Shield, Zap } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { SecurityBadge } from "@/components/fintech/SecurityBadge";


const Register: React.FC = () => {
  return (
    <div className="fintech-hero-bg min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="fintech-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side - Welcome Content */}
          <div className="space-y-8 fintech-fade-in order-2 lg:order-1">
            {/* Back Button */}
            <Button variant="fintech-ghost" size="sm" asChild className="w-fit">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Logo />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  <span className="text-foreground">Join</span>
                  <br />
                  <span className="fintech-gradient-text">SwiftPay</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Create your account and become part of Bangladesh's largest
                  digital payment revolution. Fast, secure, and absolutely free to start.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <p className="text-sm font-medium text-muted-foreground">Why choose SwiftPay?</p>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Instant Account Setup</p>
                    <p className="text-sm text-muted-foreground">Get verified in under 2 minutes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">100% Secure</p>
                    <p className="text-sm text-muted-foreground">Bank-level encryption & protection</p>
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
          <div className="order-1 lg:order-2 fintech-slide-up">
            <Card variant="fintech" className="max-w-md mx-auto relative overflow-hidden">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-6 flex items-center justify-center">
                  <UserPlus className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold mb-2">
                  Create Account
                </CardTitle>
                <p className="text-muted-foreground">
                  Join over 1 million users on SwiftPay
                </p>
              </CardHeader>

              <RegisterForm />

              {/* Footer Links */}
              <div className="p-6 pt-0 text-center space-y-4">
                <div className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-primary hover:underline">
                    Sign in here
                  </Link>
                </div>
                <div className="text-xs text-muted-foreground">
                  By creating an account, you agree to our{" "}
                  <Link to="/terms" className="text-primary hover:underline">Terms</Link>
                  {" and "}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;