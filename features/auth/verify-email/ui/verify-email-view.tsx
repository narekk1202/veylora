import BrandingHeader from "@/shared/components/branding-header";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

const VerifyEmailView = ({ email }: { email?: string }) => {
  return (
    <main className="page_container px-2">
      <div>
        <BrandingHeader
          title="Check your inbox."
          description="A link was sent if that address exists."
        />
      </div>

      <div className="sm:bg-primary-foreground mt-10 h-50 w-full max-w-md rounded-lg px-6 py-4 sm:border">
        <div className="flex flex-col items-center justify-center text-center">
          <CheckCircleIcon className="h-10 w-10 text-green-500" />
          <p className="text-muted-foreground mt-3">
            We sent a message to <br />
            <span className="text-primary font-bold">{email}</span>
          </p>

          <span className="text-muted-foreground/50 mt-6 text-sm">
            Open the message and continue from there. The link expires in 30
            minutes.
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <Link
          href={"/login"}
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-muted-foreground/50",
          )}
        >
          Back to sign in
        </Link>
      </div>
    </main>
  );
};

export default VerifyEmailView;
