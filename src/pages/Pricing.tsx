
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Smartphone, DollarSign, Send } from "lucide-react";
import { Link } from "react-router";

const pricingPlans = [
  {
    title: "Send Money",
    icon: Send,
    details: [
      "Free up to ৳200",
      "৳5 up to ৳10,000",
      "৳10 above ৳10,000",
    ],
    highlight: "Low fees for fast transfers",
  },
  {
    title: "Cash Out",
    icon: DollarSign,
    details: ["1.79% per transaction"],
    highlight: "Withdraw cash easily",
  },
  {
    title: "Cash In",
    icon: Smartphone,
    details: ["Free, no charges"],
    highlight: "Add funds anytime",
  },
];

const Pricing: React.FC = () => {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enjoy low fees and no hidden costs with our simple pricing structure.
          </p>
          <Button
            asChild
            className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
            size="lg"
          >
            <Link to="/register">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        {/* Pricing Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className="wallet-card animate-in fade-in slide-in-from-bottom-10 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <plan.icon className="h-12 w-12 text-[var(--success)] mb-4 mx-auto tx-loading" />
                <CardTitle className="text-xl text-foreground text-center">
                  {plan.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-muted-foreground text-center space-y-2">
                  {plan.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
                <p className="text-sm text-[var(--success)] font-semibold text-center">
                  {plan.highlight}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;