
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, Shield, Zap, Globe, Users, TrendingUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Instant Transfers",
    description: "Send money to anyone, anywhere in Bangladesh within seconds. No delays, no hassle.",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    stats: "< 3 seconds",
  },
  {
    title: "Bill Payments",
    description: "Pay utility bills, mobile recharges, and subscriptions with one tap.",
    icon: CreditCard,
    gradient: "from-green-500 to-emerald-500",
    stats: "500+ billers",
  },
  {
    title: "Cash Management",
    description: "Deposit and withdraw cash at 10,000+ agent points nationwide.",
    icon: DollarSign,
    gradient: "from-orange-500 to-red-500",
    stats: "10K+ agents",
  },
  {
    title: "Smart Analytics",
    description: "Track spending patterns, set budgets, and get insights on your finances.",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500",
    stats: "AI-powered",
  },
  {
    title: "Bank-Level Security",
    description: "Your money is protected with 256-bit encryption and biometric authentication.",
    icon: Shield,
    gradient: "from-indigo-500 to-blue-500",
    stats: "99.99% secure",
  },
  {
    title: "24/7 Availability",
    description: "Access your money anytime, anywhere. Our service never sleeps.",
    icon: Globe,
    gradient: "from-teal-500 to-green-500",
    stats: "Always on",
  },
];

const benefits = [
  {
    title: "No Hidden Fees",
    description: "Transparent pricing with no surprise charges",
    icon: DollarSign,
  },
  {
    title: "Instant Verification",
    description: "Get verified in minutes, not days",
    icon: Zap,
  },
  {
    title: "Multi-layered Security",
    description: "Advanced fraud protection keeps you safe",
    icon: Lock,
  },
  {
    title: "Community Support",
    description: "Join millions of satisfied SwiftPay users",
    icon: Users,
  },
];

const Features: React.FC = () => {
  return (
    <div className="fintech-hero-bg">
      {/* Header Section */}
      <section className="fintech-section">
        <div className="fintech-container text-center">
          <div className="space-y-6 fintech-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="fintech-gradient-text">Powerful Features</span>
              <br />
              <span className="text-foreground/80">Built for You</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the future of digital banking with cutting-edge features designed
              to make your financial life simpler, faster, and more secure.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="fintech-section">
        <div className="fintech-container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                variant="fintech"
                className="group hover:scale-105 transition-all duration-300 fintech-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {feature.title}
                  </CardTitle>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {feature.stats}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="fintech-section bg-gradient-to-br from-muted/30 to-primary/5">
        <div className="fintech-container">
          <div className="text-center mb-16 fintech-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="fintech-gradient-text">SwiftPay</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join millions who trust SwiftPay for their daily financial needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                variant="glass"
                className="text-center p-6 fintech-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center fintech-scale-in delay-700">
            <Card variant="fintech" className="p-8 md:p-12 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-8">
                Join over 50,000 users who have already made the switch to SwiftPay
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="fintech-primary" size="lg" className="px-8">
                  Create Account
                </Button>
                <Button variant="fintech-ghost" size="lg" className="px-8">
                  Learn More
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
