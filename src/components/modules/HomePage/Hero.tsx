
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Smartphone, Shield, Zap, Globe, Star } from "lucide-react";
import { Link } from "react-router";
import { SecurityBadge } from "@/components/fintech/SecurityBadge";
import { CurrencyDisplay } from "@/components/fintech/CurrencyDisplay";

const Hero: React.FC = () => {
  return (
    <section className="fintech-hero-bg min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="fintech-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-8 fintech-fade-in">
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-3">
              <SecurityBadge type="ssl" size="sm" />
              <SecurityBadge type="encrypted" size="sm" />
              <SecurityBadge type="verified" size="sm" />
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="fintech-gradient-text">Swift</span>
                <span className="text-foreground">Pay</span>
                <br />
                <span className="text-3xl md:text-4xl text-muted-foreground font-medium">
                  Digital Banking Revolution
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Experience the future of digital payments with lightning-fast transactions,
                bank-level security, and seamless money management. Join thousands of users
                who trust SwiftPay for their financial needs.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold fintech-gradient-text">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold fintech-gradient-text">৳100M+</div>
                <div className="text-sm text-muted-foreground">Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold fintech-gradient-text">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="fintech-primary"
                size="lg"
                className="text-lg px-8 py-6"
                asChild
              >
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button
                variant="fintech-ghost"
                size="lg"
                className="text-lg px-8 py-6"
                asChild
              >
                <Link to="/features">
                  <Zap className="mr-2 h-5 w-5" />
                  Explore Features
                </Link>
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-6 pt-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-blue-600" />
                <span>Instant Transfers</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4 text-purple-600" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
          {/* Visual Cards */}
          <div className="relative fintech-slide-up delay-300">
            {/* Main Wallet Card */}
            <Card variant="fintech" className="relative overflow-hidden mb-6">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-full bg-gradient-to-r from-primary to-blue-600">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">SwiftPay Wallet</p>
                      <p className="text-sm text-muted-foreground">Personal Account</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Star className="h-5 w-5 text-yellow-500 ml-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Premium</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                    <CurrencyDisplay
                      amount={125340.50}
                      size="xl"
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground">This Month</p>
                      <p className="font-semibold text-green-600">+৳15,420</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Transactions</p>
                      <p className="font-semibold">248</p>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <Button variant="fintech-primary" size="sm" className="flex-1">
                      Send Money
                    </Button>
                    <Button variant="fintech-ghost" size="sm" className="flex-1">
                      Request
                    </Button>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-xl" />
              </CardContent>
            </Card>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card variant="glass" className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Zap className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Instant</p>
                    <p className="text-xs text-muted-foreground">Transfers</p>
                  </div>
                </div>
              </Card>

              <Card variant="glass" className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Secure</p>
                    <p className="text-xs text-muted-foreground">Protected</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 animate-pulse" />
            <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 animate-pulse delay-1000" />
            <div className="absolute top-1/2 -right-8 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse delay-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
