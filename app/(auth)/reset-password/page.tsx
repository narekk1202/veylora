import { ResetPasswordView } from "@/features/auth";
import { NOINDEX_ROBOTS } from "@/shared/constants/seo.consts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Choose a new password. This replaces the previous one. Your locked decisions stay untouched.",
  robots: NOINDEX_ROBOTS,
};

export default function ResetPasswordPage() {
  return <ResetPasswordView />;
}
