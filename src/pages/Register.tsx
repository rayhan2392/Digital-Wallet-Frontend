import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, Mail, Phone, User } from "lucide-react";

export default function Register() {
    return (
        <div>
            <section className="bg-gradient-to-br from-[var(--muted)]/50 via-[var(--primary)]/20 to-[var(--success)]/10 min-h-screen py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
                        <Card className="wallet-card bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-lg">
                            <CardHeader className="text-center">
                                {/* <SwiftPayIcon size={48} className="mx-auto mb-4 text-[var(--primary)]" /> */}
                                <CardTitle className="text-3xl font-bold text-foreground">
                                    Join Swift Pay
                                </CardTitle>
                                <p className="text-lg text-muted-foreground">
                                    Create your account to start managing your money effortlessly.
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Full Name"
                                        className="pl-10 border-[var(--border)] bg-[var(--background)]/50"
                                    />
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="pl-10 border-[var(--border)] bg-[var(--background)]/50"
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        className="pl-10 border-[var(--border)] bg-[var(--background)]/50"
                                    />
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        className="pl-10 border-[var(--border)] bg-[var(--background)]/50"
                                    />
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="pl-10 border-[var(--border)] bg-[var(--background)]/50"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="radio"
                                        id="user"
                                        name="role"
                                        className="border-[var(--border)]"
                                    />
                                    <label htmlFor="user" className="text-foreground">User</label>
                                    <Input
                                        type="radio"
                                        id="agent"
                                        name="role"
                                        className="border-[var(--border)]"
                                    />
                                    <label htmlFor="agent" className="text-foreground">Agent</label>
                                </div>
                                <Button
                                    className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
                                >
                                    Register
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    )
}