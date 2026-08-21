import { VerifyEmailView } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | Veylora",
  description: "A link was sent if that address exists.",
};

export default function VerifyEmailPage() {
  return <VerifyEmailView />;
}
