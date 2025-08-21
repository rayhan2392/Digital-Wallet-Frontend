import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User, MessageSquare } from "lucide-react";
import { type FormEvent, useState } from "react";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }, 2000);
  };

  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
          <Card className="wallet-card">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-foreground text-center">
                Contact Us
              </CardTitle>
              <p className="text-lg text-muted-foreground text-center">
                Have questions? Reach out, and we’ll get back to you soon.
              </p>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <p className="text-[var(--success)] text-center font-semibold">
                  Thank you! Your message has been sent.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 border-[var(--border)]"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-[var(--border)]"
                      required
                    />
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Textarea
                      placeholder="Your Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="pl-10 border-[var(--border)]"
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;