
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
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                <span className="text-slate-800 dark:text-slate-200">About</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">SwiftPay</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Revolutionizing digital payments in Bangladesh. We're not just a wallet –
                we're your financial companion, building a more inclusive and accessible
                financial ecosystem for everyone.
              </p>
            </div>

            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-lg"
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
      <section className="relative py-16 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto flex items-center justify-center">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Founded in 2023 in the heart of Dhaka, SwiftPay was born from a simple yet powerful vision:
                  to make digital payments accessible to every Bangladeshi. What started as a small team of
                  passionate fintech enthusiasts has grown into Bangladesh's most trusted digital wallet platform,
                  serving over 1 million users across all 64 districts.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  From rickshaw pullers to tech entrepreneurs, from students to business owners – SwiftPay bridges
                  the financial divide, enabling everyone to participate in the digital economy with confidence and ease.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Drives <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Us</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our core principles that shape every decision and innovation
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-0 shadow-lg"
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
      <section className="relative py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Impact</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Numbers that reflect our commitment to transforming Bangladesh's financial landscape
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="text-center p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-md"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 flex items-center justify-center">
                  <achievement.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {achievement.stat}
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  {achievement.label}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The passionate innovators behind SwiftPay's success
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-0 shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {member.avatar}
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {member.name}
                  </CardTitle>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {member.role}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12 max-w-3xl mx-auto text-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white border-0 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the <span className="text-blue-100">Revolution</span>?
            </h3>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Be part of Bangladesh's financial transformation. Experience the future of digital payments today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 bg-white text-blue-600 hover:bg-blue-50 font-semibold" asChild>
                <Link to="/register">Start Your Journey</Link>
              </Button>
              <Button size="lg" className="px-8 border-2 border-white text-white hover:bg-white/20 font-semibold bg-transparent" asChild>
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
