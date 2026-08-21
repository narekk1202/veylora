import { VerifyEmailView } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | Veylora",
  description: "A link was sent if that address exists.",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string | string[] }>;
}) {
  const { email } = await searchParams;
  const emailValue = Array.isArray(email) ? email[0] : email;

  return <VerifyEmailView email={emailValue} />;
}
