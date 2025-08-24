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
    <section className="fintech-section">
      <div className="fintech-container">
        <div className="text-center mb-16 fintech-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="fintech-gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about SwiftPay's features and services
          </p>
        </div>

        <Card variant="fintech" className="max-w-3xl mx-auto fintech-scale-in">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 flex items-center justify-center">
              <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold">
              Got Questions?
            </CardTitle>
            <p className="text-muted-foreground">
              Find answers to common questions about SwiftPay
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