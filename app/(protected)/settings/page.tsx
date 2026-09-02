import { SettingsView } from "@/features/settings";
import { auth } from "@/shared/lib/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your profile, review reminders, and account data.",
};

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: { disableCookieCache: true },
  });

  const user = session?.user;

  if (!user) {
    return null;
  }

  return (
    <SettingsView
      user={{
        name: user.name,
        email: user.email,
        image: user.image,
        emailDueReminders: user.emailDueReminders ?? true,
        weeklyDigest: user.weeklyDigest ?? false,
      }}
    />
  );
}
