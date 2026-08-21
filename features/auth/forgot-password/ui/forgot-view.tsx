import BrandingHeader from "@/shared/components/branding-header";
import { Button } from "@/shared/components/ui/button";
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

      <Button variant={"link"} className={"text-muted-foreground/50 mt-5 px-1"}>
        <Link href={"/login"}>Back to sign in</Link>
      </Button>
    </main>
  );
};

export default ForgotView;
