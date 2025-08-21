import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I send money using the wallet?",
    answer:
      "Enter the recipient’s phone number, specify the amount, and confirm with your PIN. It’s instant and secure, with fees as low as ৳0 for transfers up to ৳200.",
  },
  {
    question: "Is my money safe with your wallet?",
    answer:
      "Yes, we use bank-grade encryption and two-factor authentication to protect your funds and personal information.",
  },
  {
    question: "How can I cash in or cash out?",
    answer:
      "Cash in for free at any agent or partner location. Cash out at agents with a 1.79% fee, processed instantly.",
  },
  {
    question: "Can I pay bills through the wallet?",
    answer:
      "Absolutely! Pay utility bills, mobile recharges, and more directly from the app in just a few clicks.",
  },
  {
    question: "What if I face issues with a transaction?",
    answer:
      "Contact our 24/7 support team via the app or email. We’ll resolve any issues quickly and keep you updated.",
  },
];

const Faq: React.FC = () => {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="wallet-card max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-foreground text-center">
              Frequently Asked Questions
            </CardTitle>
            <p className="text-lg text-muted-foreground text-center">
              Everything you need to know about our digital wallet.
            </p>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b-[var(--border)] animate-in fade-in slide-in-from-bottom-10 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-[var(--primary)]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Faq;