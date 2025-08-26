
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Smartphone, Shield, Zap, Globe, Star } from "lucide-react";
import { Link } from "react-router";
import { SecurityBadge } from "@/components/fintech/SecurityBadge";
import { CurrencyDisplay } from "@/components/fintech/CurrencyDisplay";

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:24px_24px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-3">
              <SecurityBadge type="ssl" size="sm" />
              <SecurityBadge type="encrypted" size="sm" />
              <SecurityBadge type="verified" size="sm" />
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Swift</span>
                <span className="text-slate-900 dark:text-slate-100">Pay</span>
                <br />
                <span className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium">
                  Digital Banking Revolution
                </span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                Experience the future of digital payments with lightning-fast transactions,
                bank-level security, and seamless money management. Join thousands of users
                who trust SwiftPay for their financial needs.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">50K+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">৳100M+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">99.9%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Uptime</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="text-base px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 rounded-xl"
                size="lg"
                asChild
              >
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-6 py-3 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 rounded-xl"
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
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <Zap className="h-4 w-4 text-blue-600" />
                <span>Instant Transfers</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <Globe className="h-4 w-4 text-purple-600" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>

          {/* Visual Cards */}
          <div className="relative">
            {/* Main Wallet Card */}
            <Card className="relative overflow-hidden mb-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-0 shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/50">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">SwiftPay Wallet</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Personal Account</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Star className="h-5 w-5 text-yellow-500 ml-auto mb-1" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Premium</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Available Balance</p>
                    <CurrencyDisplay
                      amount={125340.50}
                      size="xl"
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">This Month</p>
                      <p className="font-semibold text-green-600 dark:text-green-400">+৳15,420</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Transactions</p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">248</p>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 rounded-lg">
                      Send Money
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                      Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Instant</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Transfers</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Secure</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Protected</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
