
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Smartphone, Users } from "lucide-react";
import { Link } from "react-router";

const teamMembers = [
  {
    name: "Sarah Ahmed",
    role: "Founder & CEO",
    bio: "Leading the vision to make financial services accessible to all.",
  },
  {
    name: "Rahim Khan",
    role: "CTO",
    bio: "Driving innovation with secure and scalable technology.",
  },
  {
    name: "Fatima Begum",
    role: "Head of Operations",
    bio: "Ensuring seamless transactions for millions of users.",
  },
];

const About: React.FC = () => {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Intro Section */}
        <div className="text-center space-y-4 mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            About Our Wallet
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering millions with simple, secure, and fast financial services.
          </p>
          <Button
            asChild
            className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
            size="lg"
          >
            <Link to="/register">
              Join Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Our Story Section */}
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100">
          <Card className="wallet-card">
            <CardHeader>
              <Smartphone className="h-12 w-12 text-[var(--success)] mb-4 mx-auto tx-loading" />
              <CardTitle className="text-2xl text-foreground text-center">
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto">
                Founded in 2023, our digital wallet was born to simplify financial
                transactions for everyone. Inspired by the need for accessible
                payments in Bangladesh, we’ve grown to serve millions, offering
                secure and instant solutions for daily money needs.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Mission Section */}
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
          <Card className="wallet-card">
            <CardHeader>
              <Smartphone className="h-12 w-12 text-[var(--success)] mb-4 mx-auto tx-loading" />
              <CardTitle className="text-2xl text-foreground text-center">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto">
                To empower every individual with seamless, secure, and affordable
                financial tools, bridging the gap between technology and everyday
                transactions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Team Section */}
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="wallet-card"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <CardHeader>
                  <Users className="h-12 w-12 text-[var(--success)] mb-4 mx-auto tx-loading" />
                  <CardTitle className="text-xl text-foreground text-center">
                    {member.name}
                  </CardTitle>
                  <p className="text-sm text-[var(--primary)] text-center">
                    {member.role}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
