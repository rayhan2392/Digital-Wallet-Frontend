import { Link } from "react-router";
import { Shield, Mail, MapPin, Twitter, Linkedin, Github } from "lucide-react";
import { SecurityBadge } from "@/components/fintech/SecurityBadge";
import Logo from "@/components/logo";

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
    <footer className="bg-gradient-to-br from-muted via-muted to-primary/5 text-muted-foreground fintech-section border-t fintech-border">
      <div className="fintech-container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6 fintech-fade-in">
            <Logo />
            <p className="text-sm max-w-xs leading-relaxed">
              Secure, fast, and reliable digital payments for the modern world.
              Empowering financial freedom across Bangladesh.
            </p>
            <div className="flex flex-wrap gap-2">
              <SecurityBadge type="ssl" size="sm" />
              <SecurityBadge type="encrypted" size="sm" />
              <SecurityBadge type="verified" size="sm" />
            </div>
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
          <div className="fintech-slide-up" style={{ animationDelay: "300ms" }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer">
                <Mail className="h-5 w-5 text-primary" />
                <span>support@swiftpay.bd</span>
              </li>
              <li className="flex items-center gap-3 hover:text-primary transition-colors">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-foreground mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t fintech-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} SwiftPay. All rights reserved.</p>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <div className="flex items-center space-x-2 text-green-600">
                <Shield className="h-4 w-4" />
                <span>Secured by 256-bit SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;