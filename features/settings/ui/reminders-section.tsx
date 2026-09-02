"use client";

import { Card } from "@/shared/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldTitle,
} from "@/shared/components/ui/field";
import { Switch } from "@/shared/components/ui/switch";
import { REMINDER_TOGGLES, type ReminderToggleId } from "../consts";
import { useUpdateReminder } from "../hooks/use-update-reminder";
import type { SettingsUser } from "../types";
import SettingsSection from "./settings-section";

type RemindersSectionProps = {
  emailDueReminders: SettingsUser["emailDueReminders"];
  weeklyDigest: SettingsUser["weeklyDigest"];
};

const reminderValues = (
  emailDueReminders: boolean,
  weeklyDigest: boolean,
): Record<ReminderToggleId, boolean> => ({
  "email-due": emailDueReminders,
  "weekly-digest": weeklyDigest,
});

const ReminderToggle = ({
  id,
  title,
  description,
  initialEnabled,
}: {
  id: ReminderToggleId;
  title: string;
  description: string;
  initialEnabled: boolean;
}) => {
  const { enabled, isPending, onCheckedChange } = useUpdateReminder(
    id,
    initialEnabled,
  );

  return (
    <Field
      orientation="horizontal"
      className="items-center px-5 py-4 not-first:border-t"
    >
      <FieldContent>
        <FieldTitle>{title}</FieldTitle>
        <FieldDescription className="text-xs">{description}</FieldDescription>
      </FieldContent>
      <Switch
        id={id}
        checked={enabled}
        onCheckedChange={onCheckedChange}
        disabled={isPending}
        aria-label={title}
      />
    </Field>
  );
};

const RemindersSection = ({
  emailDueReminders,
  weeklyDigest,
}: RemindersSectionProps) => {
  const values = reminderValues(emailDueReminders, weeklyDigest);

  return (
    <SettingsSection label="Review reminders">
      <Card className="gap-0 py-0">
        <FieldGroup className="gap-0">
          {REMINDER_TOGGLES.map((toggle) => (
            <ReminderToggle
              key={toggle.id}
              id={toggle.id}
              title={toggle.title}
              description={toggle.description}
              initialEnabled={values[toggle.id]}
            />
          ))}
        </FieldGroup>
      </Card>
    </SettingsSection>
  );
};

export default RemindersSection;
