
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const Unauthorized: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-[var(--muted)]/50 via-[var(--primary)]/20 to-[var(--success)]/10 min-h-screen flex items-center">
      <div className="container mx-auto px-4 md:px-6 text-center animate-in fade-in slide-in-from-bottom-10 duration-700">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Unauthorized Access
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8">
          You do not have permission to access this page.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Current time: 10:10 AM, August 24, 2025 (BDT)
        </p>
        <div className="flex justify-center">
          <Button asChild className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 px-6 py-3">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Unauthorized;
