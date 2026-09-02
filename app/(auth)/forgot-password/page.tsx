import { ForgotView } from "@/features/auth";
import { NOINDEX_ROBOTS } from "@/shared/constants/seo.consts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Enter the email on the account. If it exists, a reset link arrives shortly.",
  robots: NOINDEX_ROBOTS,
};

export default async function ForgotPasswordPage() {
  return <ForgotView />;
}
