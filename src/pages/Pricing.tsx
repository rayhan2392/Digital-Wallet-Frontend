
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Smartphone, DollarSign, Send, Check, Star, Shield, CreditCard } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";

const pricingTiers = [
  {
    name: "Personal",
    price: "FREE",
    description: "Perfect for individuals and small transactions",
    icon: Smartphone,
    gradient: "from-blue-500 to-cyan-500",
    popular: false,
    features: [
      "Free account creation",
      "Send money: ৳5 fee (up to ৳10,000)",
      "Cash in: Completely free",
      "Cash out: 1.79% fee",
      "Bill payments: ৳2 convenience fee",
      "24/7 customer support",
      "Basic transaction history",
      "Mobile app access"
    ],
  },
  {
    name: "Business",
    price: "৳99",
    period: "/month",
    description: "Ideal for small businesses and frequent users",
    icon: CreditCard,
    gradient: "from-purple-500 to-pink-500",
    popular: true,
    features: [
      "Everything in Personal",
      "Reduced fees: ৳3 send money fee",
      "Bulk payment options",
      "Advanced analytics dashboard",
      "Priority customer support",
      "API access for integrations",
      "Monthly transaction reports",
      "Custom payment links"
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations",
    icon: Shield,
    gradient: "from-green-500 to-emerald-500",
    popular: false,
    features: [
      "Everything in Business",
      "Dedicated account manager",
      "Custom fee structure",
      "White-label solutions",
      "Advanced security features",
      "Multi-user account management",
      "Real-time transaction monitoring",
      "SLA guarantees"
    ],
  },
];

const feeStructure = [
  {
    service: "Send Money",
    icon: Send,
    fees: [
      { range: "Up to ৳200", fee: "FREE", highlight: true },
      { range: "৳201 - ৳10,000", fee: "৳5", highlight: false },
      { range: "Above ৳10,000", fee: "৳10", highlight: false },
    ]
  },
  {
    service: "Cash In",
    icon: Smartphone,
    fees: [
      { range: "Any amount", fee: "FREE", highlight: true },
    ]
  },
  {
    service: "Cash Out",
    icon: DollarSign,
    fees: [
      { range: "Any amount", fee: "1.79%", highlight: false },
    ]
  },
  {
    service: "Bill Payments",
    icon: CreditCard,
    fees: [
      { range: "Utility bills", fee: "৳2", highlight: false },
      { range: "Mobile recharge", fee: "FREE", highlight: true },
    ]
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Simple Pricing</span>
                <br />
                <span className="text-slate-600 dark:text-slate-400 text-3xl md:text-4xl font-medium">
                  No Hidden Fees
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Choose the plan that fits your needs. From individuals to enterprises,
                we offer transparent pricing with no surprises.
              </p>
            </div>

            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-lg"
              asChild
            >
              <Link to="/register">
                Start Free Today
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative group hover:scale-105 transition-all duration-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-0 shadow-lg ${tier.popular ? "ring-2 ring-blue-500 shadow-2xl shadow-blue-500/20" : ""
                  }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 text-sm font-semibold">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-r ${tier.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <tier.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">
                    {tier.name}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm mb-4">
                    {tier.description}
                  </p>
                  <div className="space-y-1">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {tier.price}
                    </div>
                    {tier.period && (
                      <div className="text-slate-600 dark:text-slate-400 text-sm">
                        {tier.period}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${tier.popular ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white' : 'border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    size="lg"
                    asChild
                  >
                    <Link to="/register">
                      {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="relative py-20 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Detailed <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Fee Structure</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Complete breakdown of all fees and charges
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {feeStructure.map((service, index) => (
              <Card
                key={index}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-md"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-xl">{service.service}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.fees.map((fee, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                        <span className="text-sm text-muted-foreground">{fee.range}</span>
                        <span className={`font-semibold ${fee.highlight ? 'text-green-600' : 'text-foreground'}`}>
                          {fee.fee}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="fintech-section">
        <div className="fintech-container">
          <Card variant="fintech" className="p-8 md:p-12 max-w-3xl mx-auto text-center fintech-scale-in">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Save on <span className="fintech-gradient-text">Transaction Fees</span>?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join thousands of users who have already switched to SwiftPay's transparent pricing.
              No hidden fees, no surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="fintech-primary" size="lg" className="px-8" asChild>
                <Link to="/register">Start Saving Today</Link>
              </Button>
              <Button variant="fintech-ghost" size="lg" className="px-8" asChild>
                <Link to="/features">Compare Features</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Pricing;