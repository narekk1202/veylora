import BrandingHeader from "@/shared/components/branding-header";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import RegisterForm from "./register-form";

const RegisterView = () => {
  return (
    <main className="page_container px-2">
      <div>
        <BrandingHeader
          title="Start an honest record."
          description="A private journal for decisions you make before the outcome arrives."
        />
      </div>

      <RegisterForm />

      <div className="mt-4">
        <span className="text-muted-foreground text-sm">
          Already have an account?
        </span>
        <Link
          href={"/login"}
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-foreground px-1",
          )}
        >
          Sign in
        </Link>
      </div>

      <span className="text-muted-foreground/50 mt-5 w-full max-w-md text-center text-sm">
        Once a decision is locked, original reasoning cannot be rewritten. That
        is the point.
      </span>
    </main>
  );
};

export default RegisterView;
