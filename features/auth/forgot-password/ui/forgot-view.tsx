import BrandingHeader from "@/shared/components/branding-header";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import ForgotForm from "./forgot-form";

const ForgotView = () => {
  return (
    <main className="page_container px-2">
      <div>
        <BrandingHeader
          title="Recover access."
          description="Enter the email on the account. If it exists, a reset link arrives shortly."
        />
      </div>

      <ForgotForm />

      <Link
        href={"/login"}
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-muted-foreground/50 mt-5 px-1",
        )}
      >
        Back to sign in
      </Link>
    </main>
  );
};

export default ForgotView;
