import AuthHeader from "@/features/auth/components/auth-header";
import { Button } from "@/shared/components/ui/button";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

const VerifyEmailView = ({ email }: { email?: string }) => {

  return (
    <main className="page_container px-2">
      <div>
        <AuthHeader
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
        <Button variant={"link"} className={"text-muted-foreground mt-5"}>
          Resend email
        </Button>
        <Button variant={"link"} className={"text-muted-foreground/50"}>
          <Link href={"/login"}>Back to sign in</Link>
        </Button>
      </div>
    </main>
  );
};

export default VerifyEmailView;
