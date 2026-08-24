import BrandingHeader from "@/shared/components/branding-header";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import ResetPasswordForm from "./reset-password-form";

const ResetPasswordView = () => {
  return (
    <main className="page_container px-2">
      <div>
        <BrandingHeader
          title="Choose a new password."
          description="This replaces the previous one. Your locked decisions stay untouched."
        />
      </div>

      <ResetPasswordForm />

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

export default ResetPasswordView;
