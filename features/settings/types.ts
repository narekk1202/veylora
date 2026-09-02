export type SettingsUser = {
  name: string;
  email: string;
  image?: string | null;
  emailDueReminders: boolean;
  weeklyDigest: boolean;
};

export type SettingsActionResult =
  { success: true } | { success: false; error: string };
