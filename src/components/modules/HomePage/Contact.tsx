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
    <section className="fintech-section bg-gradient-to-br from-primary/5 to-green-500/5">
      <div className="fintech-container">
        <div className="text-center mb-16 fintech-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="fintech-gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about SwiftPay? We're here to help you 24/7
          </p>
        </div>

        <div className="max-w-2xl mx-auto fintech-scale-in">
          <Card variant="fintech">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6 flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Contact SwiftPay
              </CardTitle>
              <p className="text-muted-foreground">
                Send us a message and we'll respond within 24 hours
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