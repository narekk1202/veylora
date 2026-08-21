import AuthHeader from "@/features/auth/components/auth-header";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import LoginForm from "./login-form";

const LoginView = () => {
  return (
    <main className="page_container px-2">
      <div>
        <AuthHeader
          title="Return to your record."
          description="Sign in to capture, lock, and review decisions with an honest past self."
        />
      </div>

      <LoginForm />

      <div className="mt-4">
        <span className="text-muted-foreground text-sm">New here?</span>
        <Button variant={"link"} className={"text-foreground px-1"}>
          <Link href={"/register"}>Create an account</Link>
        </Button>
      </div>

      <span className="text-muted-foreground/50 mt-5 text-center text-sm">
        Reasoning locks before outcomes. Hindsight stays honest.
      </span>
    </main>
  );
};

export default LoginView;
