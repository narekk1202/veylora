import { Card } from "@/shared/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Switch } from "@/shared/components/ui/switch";
import { REMINDER_TOGGLES, REVIEW_PERIOD_DEFAULT } from "../consts";
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
          <Field className="border-t px-5 py-5">
            <FieldLabel
              htmlFor="review-period"
              className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase"
            >
              Default review period
            </FieldLabel>
            <Input
              id="review-period"
              name="reviewPeriod"
              defaultValue={REVIEW_PERIOD_DEFAULT}
            />
          </Field>
        </FieldGroup>
      </Card>
    </SettingsSection>
  );
};

export default RemindersSection;
