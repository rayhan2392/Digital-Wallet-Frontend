
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, CreditCard, DollarSign, History } from "lucide-react";

const features = [
  {
    title: "Send Money",
    description: "Transfer funds instantly to any phone number with zero hassle.",
    icon: Smartphone,
  },
  {
    title: "Pay Bills",
    description: "Settle utility bills, mobile recharges, and more in seconds.",
    icon: CreditCard,
  },
  {
    title: "Cash In/Out",
    description: "Add or withdraw cash seamlessly at nearby agents.",
    icon: DollarSign,
  },
  {
    title: "Track Transactions",
    description: "Monitor your spending with detailed history and insights.",
    icon: History,
  },
];

const Features: React.FC = () => {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Features That Empower You
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how our digital wallet simplifies your financial life with secure and easy-to-use tools.
          </p>
        </div>
        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="wallet-card animate-in fade-in slide-in-from-bottom-10 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <feature.icon className="h-12 w-12 text-[var(--success)] mb-4 mx-auto tx-loading" />
                <CardTitle className="text-xl text-foreground text-center">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
