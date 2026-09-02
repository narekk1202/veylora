import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import type { SettingsUser } from "../types";
import SettingsSection from "./settings-section";
import { initialsFromName } from '@/shared/lib/utils'

const fieldLabelClassName =
  "text-muted-foreground text-[10px] font-semibold tracking-wider uppercase";

type ProfileSectionProps = {
  user: SettingsUser;
};

const ProfileSection = ({ user }: ProfileSectionProps) => {
  return (
    <SettingsSection label="Profile">
      <Card className="[--card-spacing:--spacing(6)]">
        <CardContent>
          <FieldGroup className="gap-6">
            <div className="flex items-start gap-5">
              <Avatar size="lg" className="size-16 data-[size=lg]:size-16">
                <AvatarImage alt={user.name} src={user.image ?? undefined} />
                <AvatarFallback className="text-base">
                  {initialsFromName(user.name)}
                </AvatarFallback>
              </Avatar>
              <Field className="min-w-0 flex-1">
                <FieldLabel
                  htmlFor="display-name"
                  className={fieldLabelClassName}
                >
                  Display name
                </FieldLabel>
                <Input
                  id="display-name"
                  name="displayName"
                  defaultValue={user.name}
                  autoComplete="name"
                />
              </Field>
            </div>
            <Field aria-disabled="true">
              <FieldLabel htmlFor="email" className={fieldLabelClassName}>
                Email
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                disabled
                defaultValue={user.email}
                autoComplete="email"
                readOnly
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </SettingsSection>
  );
};

export default ProfileSection;
