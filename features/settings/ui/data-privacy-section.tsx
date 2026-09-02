import { Card } from "@/shared/components/ui/card";
import { EXPORT_ACTIONS } from "../consts";
import SettingsSection from "./settings-section";

const DataPrivacySection = () => {
  return (
    <SettingsSection label="Data & privacy">
      <Card className="gap-0 py-0">
        {EXPORT_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            className="hover:bg-muted/40 w-full cursor-pointer px-5 py-4 text-left text-sm transition-colors not-first:border-t first:rounded-t-xl last:rounded-b-xl"
          >
            {action.label}
          </button>
        ))}
      </Card>
    </SettingsSection>
  );
};

export default DataPrivacySection;
