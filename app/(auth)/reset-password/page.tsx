import { ResetPasswordView } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Veylora",
  description:
    "Choose a new password. This replaces the previous one. Your locked decisions stay untouched.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordView />;
}
