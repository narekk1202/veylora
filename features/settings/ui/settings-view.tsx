import PageHeader from "@/shared/components/page-header";
import type { SettingsUser } from "../types";
import DangerZoneSection from "./danger-zone-section";
import DataPrivacySection from "./data-privacy-section";
import ProfileSection from "./profile-section";
import RemindersSection from "./reminders-section";

type SettingsViewProps = {
  user: SettingsUser;
};

const SettingsView = ({ user }: SettingsViewProps) => {
  return (
    <main className="page_view">
      <PageHeader title="Settings" />
      <ProfileSection user={user} />
      <RemindersSection />
      <DataPrivacySection />
      <DangerZoneSection />
    </main>
  );
};

export default SettingsView;
