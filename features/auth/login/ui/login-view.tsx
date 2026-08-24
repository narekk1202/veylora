import BrandingHeader from "@/shared/components/branding-header";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import LoginForm from "./login-form";

const LoginView = () => {
  return (
    <main className="page_container px-2">
      <div>
        <BrandingHeader
          title="Return to your record."
          description="Sign in to capture, lock, and review decisions with an honest past self."
        />
      </div>

      <LoginForm />

      <div className="mt-4">
        <span className="text-muted-foreground text-sm">New here?</span>
        <Link
          href={"/register"}
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-foreground px-1",
          )}
        >
          Create an account
        </Link>
      </div>

      <span className="text-muted-foreground/50 mt-5 text-center text-sm">
        Reasoning locks before outcomes. Hindsight stays honest.
      </span>
    </main>
  );
};

export default LoginView;
