
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Smartphone, Shield, Zap, TrendingUp, Users, CircleCheck } from "lucide-react";
import { Link } from "react-router";
import { CurrencyDisplay } from "@/components/fintech/CurrencyDisplay";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:24px_24px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
              <CircleCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Trusted by 50,000+ Users
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="text-slate-900 dark:text-slate-100">
                  Digital Wallet
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  For Everyone
                </span>
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Send, receive, and manage money instantly with Bangladesh's fastest growing digital payment platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="h-14 px-8 text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 rounded-xl group"
                size="lg"
                asChild
              >
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 rounded-xl"
                asChild
              >
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">50K+</div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Active Users</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">৳100M</div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Daily Volume</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">99.9%</div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right: Wallet Card Preview */}
          <div className="relative lg:block hidden">
            {/* Floating decoration elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

            {/* Main Wallet Card */}
            <div className="relative">
              <Card className="overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-xl border-2 border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-900/20 transform hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-slate-900 dark:text-slate-100">SwiftPay</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Digital Wallet</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                      <span className="text-xs font-semibold text-green-700 dark:text-green-400">ACTIVE</span>
                    </div>
                  </div>

                  {/* Balance */}
                  <div className="mb-8">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Available Balance</p>
                    <CurrencyDisplay
                      amount={125340.50}
                      size="xl"
                      className="text-4xl font-bold text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50">
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Income</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">+৳15,420</p>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Transactions</p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">248</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 rounded-xl h-12 font-semibold shadow-lg shadow-blue-600/25">
                      <Zap className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                    <Button variant="outline" className="border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl h-12 font-semibold">
                      Request
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Small Feature Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Card className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-slate-100">Instant</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Transfers</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30">
                      <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-slate-100">Secure</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Protected</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
