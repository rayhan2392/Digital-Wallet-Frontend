
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Smartphone } from "lucide-react";
import { Link } from "react-router";

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-background to-muted/10 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Pay, Send, Save with Ease
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Manage your money on the go with secure, fast, and simple transactions.
            </p>
            <div className="flex gap-4">
              <Button
                asChild
                className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
                size="lg"
              >
                <Link to="/register">
                  Sign Up
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[var(--border)] text-[var(--primary)] hover:bg-[var(--accent)]"
              >
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
          {/* Visual Card */}
          <div className="relative animate-in fade-in slide-in-from-right-10 duration-700">
            <Card className="wallet-card">
              <CardContent className="p-8 text-center">
                <Smartphone className="mx-auto h-16 w-16 text-[var(--success)] mb-4 tx-loading" />
                <p className="text-xl font-semibold text-foreground">Your Digital Wallet</p>
                <p className="text-lg text-[var(--success)] balance-positive">৳12,340 BDT</p>
                <p className="text-sm text-muted-foreground address-mono mt-2">
                  +880 123 456 7890
                </p>
                <Button variant="ghost" className="copy-button mt-4">
                  Copy Number
                </Button>
              </CardContent>
            </Card>
            <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-[var(--success)]/20 animate-pulse" />
            <div className="absolute -bottom-4 -right-4 h-10 w-10 rounded-full bg-[var(--primary)]/20 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
