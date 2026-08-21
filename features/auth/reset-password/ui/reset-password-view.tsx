import AuthHeader from "@/features/auth/ui/auth-header";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import ResetPasswordForm from "./reset-password-form";

const ResetPasswordView = () => {
  return (
    <main className="page_container px-2">
      <div>
        <AuthHeader
          title="Choose a new password."
          description="This replaces the previous one. Your locked decisions stay untouched."
        />
      </div>

      <ResetPasswordForm />

      <Button variant={"link"} className={"text-muted-foreground/50 mt-5 px-1"}>
        <Link href={"/login"}>Back to sign in</Link>
      </Button>
    </main>
  );
};

export default ResetPasswordView;
