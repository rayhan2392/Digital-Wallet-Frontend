import LoginForm from "@/components/modules/authentication/LoginForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";


const Login: React.FC = () => {
  return (
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
           <LoginForm></LoginForm>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Login;