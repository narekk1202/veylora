import { Card } from "@/shared/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldTitle,
} from "@/shared/components/ui/field";
import { Switch } from "@/shared/components/ui/switch";
import { REMINDER_TOGGLES } from "../consts";
import SettingsSection from "./settings-section";

const RemindersSection = () => {
  return (
    <SettingsSection label="Review reminders">
      <Card className="gap-0 py-0">
        <FieldGroup className="gap-0">
          {REMINDER_TOGGLES.map((toggle) => (
            <Field
              key={toggle.id}
              orientation="horizontal"
              className="items-center px-5 py-4 not-first:border-t"
            >
              <FieldContent>
                <FieldTitle>{toggle.title}</FieldTitle>
                <FieldDescription className="text-xs">
                  {toggle.description}
                </FieldDescription>
              </FieldContent>
              <Switch
                id={toggle.id}
                defaultChecked={toggle.defaultChecked}
                aria-label={toggle.title}
              />
            </Field>
          ))}
        </FieldGroup>
      </Card>
    </SettingsSection>
  );
};

export default RemindersSection;
