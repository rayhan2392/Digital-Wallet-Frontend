
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Target, Eye, Award, Users, Globe, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router";
import { SecurityBadge } from "@/components/fintech/SecurityBadge";

const values = [
  {
    title: "Our Mission",
    description: "To democratize financial services and make digital payments accessible to every Bangladeshi, regardless of their location or economic background.",
    icon: Target,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Our Vision",
    description: "To become Bangladesh's most trusted digital financial platform, empowering millions to achieve financial freedom through technology.",
    icon: Eye,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Our Values",
    description: "Trust, security, and innovation drive everything we do. We believe in transparent, fair, and inclusive financial services for all.",
    icon: Heart,
    gradient: "from-green-500 to-emerald-500",
  },
];

const achievements = [
  {
    stat: "1M+",
    label: "Active Users",
    icon: Users,
  },
  {
    stat: "৳5B+",
    label: "Transactions Processed",
    icon: TrendingUp,
  },
  {
    stat: "99.9%",
    label: "Uptime",
    icon: Shield,
  },
  {
    stat: "64",
    label: "Districts Covered",
    icon: Globe,
  },
];

const teamMembers = [
  {
    name: "Sarah Ahmed",
    role: "Founder & CEO",
    bio: "Visionary leader with 15+ years in fintech, passionate about financial inclusion.",
    avatar: "SA",
  },
  {
    name: "Rahim Khan",
    role: "Chief Technology Officer",
    bio: "Tech innovator ensuring SwiftPay's platform remains secure and scalable.",
    avatar: "RK",
  },
  {
    name: "Fatima Begum",
    role: "Head of Operations",
    bio: "Operations expert managing seamless experiences for millions of users.",
    avatar: "FB",
  },
];

const About: React.FC = () => {
  return (
    <div className="fintech-hero-bg">
      {/* Hero Section */}
      <section className="fintech-section">
        <div className="fintech-container text-center">
          <div className="space-y-8 fintech-fade-in">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="text-foreground">About</span>
                <br />
                <span className="fintech-gradient-text">SwiftPay</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Revolutionizing digital payments in Bangladesh. We're not just a wallet –
                we're your financial companion, building a more inclusive and accessible
                financial ecosystem for everyone.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex justify-center flex-wrap gap-4">
              <SecurityBadge type="ssl" size="md" />
              <SecurityBadge type="encrypted" size="md" />
              <SecurityBadge type="verified" size="md" />
            </div>

            <Button
              variant="fintech-primary"
              size="lg"
              className="text-lg px-8 py-6"
              asChild
            >
              <Link to="/register">
                Join Our Journey
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="fintech-section bg-gradient-to-br from-muted/30 to-primary/5">
        <div className="fintech-container">
          <Card variant="fintech" className="max-w-4xl mx-auto fintech-scale-in">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-blue-600 mx-auto flex items-center justify-center">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded in 2023 in the heart of Dhaka, SwiftPay was born from a simple yet powerful vision:
                  to make digital payments accessible to every Bangladeshi. What started as a small team of
                  passionate fintech enthusiasts has grown into Bangladesh's most trusted digital wallet platform,
                  serving over 1 million users across all 64 districts.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From rickshaw pullers to tech entrepreneurs, from students to business owners – SwiftPay bridges
                  the financial divide, enabling everyone to participate in the digital economy with confidence and ease.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="fintech-section">
        <div className="fintech-container">
          <div className="text-center mb-16 fintech-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Drives <span className="fintech-gradient-text">Us</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core principles that shape every decision and innovation
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <Card
                key={index}
                variant="fintech"
                className="text-center group hover:scale-105 transition-all duration-300 fintech-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-r ${value.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="fintech-section bg-gradient-to-br from-primary/5 to-green-500/5">
        <div className="fintech-container">
          <div className="text-center mb-16 fintech-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="fintech-gradient-text">Impact</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Numbers that reflect our commitment to transforming Bangladesh's financial landscape
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                variant="glass"
                className="text-center p-6 fintech-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-blue-600 mx-auto mb-6 flex items-center justify-center">
                  <achievement.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold fintech-gradient-text mb-2">
                  {achievement.stat}
                </div>
                <p className="text-muted-foreground font-medium">
                  {achievement.label}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="fintech-section">
        <div className="fintech-container">
          <div className="text-center mb-16 fintech-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="fintech-gradient-text">Team</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate innovators behind SwiftPay's success
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                variant="fintech"
                className="text-center group hover:scale-105 transition-all duration-300 fintech-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-blue-600 mx-auto mb-6 flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {member.avatar}
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {member.name}
                  </CardTitle>
                  <p className="text-primary font-medium">
                    {member.role}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
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
              Ready to Join the <span className="fintech-gradient-text">Revolution</span>?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Be part of Bangladesh's financial transformation. Experience the future of digital payments today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="fintech-primary" size="lg" className="px-8" asChild>
                <Link to="/register">Start Your Journey</Link>
              </Button>
              <Button variant="fintech-ghost" size="lg" className="px-8" asChild>
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
