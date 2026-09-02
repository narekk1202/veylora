import { VerifyEmailView } from "@/features/auth";
import { NOINDEX_ROBOTS } from "@/shared/constants/seo.consts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "A link was sent if that address exists.",
  robots: NOINDEX_ROBOTS,
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
