import { ForgotView } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Veylora",
  description:
    "Enter the email on the account. If it exists, a reset link arrives shortly.",
};

export default function ForgotPasswordPage() {
  return <ForgotView />;
}
