import { Link } from "react-router";
import { Smartphone, Mail, MapPin } from "lucide-react";

const footerLinks = [
  {
    title: "Company", links: [
      { label: "About", href: "/about" },
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ]
  },
  {
    title: "Support", links: [
      { label: "FAQ", href: "/faq" },
      { label: "Help Center", href: "/help" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ]
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--muted)] text-muted-foreground py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="flex items-center gap-2">
              <Smartphone className="h-8 w-8 text-[var(--success)]" />
              <h2 className="text-xl font-bold text-foreground">Digital Wallet</h2>
            </div>
            <p className="text-sm max-w-xs">
              Simplifying payments, transfers, and financial management for everyone in Bangladesh.
            </p>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
              <h3 className="text-lg font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-[var(--primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: "300ms" }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Get in Touch</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[var(--success)]" />
                <span>support@digitalwallet.bd</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[var(--success)]" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Digital Wallet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;