"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { initialsFromName } from "@/shared/lib/utils";
import { Loader2 } from "lucide-react";
import { useUpdateProfile } from "../hooks/use-update-profile";
import type { SettingsUser } from "../types";
import SettingsSection from "./settings-section";

const fieldLabelClassName =
  "text-muted-foreground text-[10px] font-semibold tracking-wider uppercase";

type ProfileSectionProps = {
  user: SettingsUser;
};

const ProfileSection = ({ user }: ProfileSectionProps) => {
  const { form, isPending, errors, onSubmit, isDirty } = useUpdateProfile(
    user.name,
  );
  const canSave = isDirty && form.formState.isValid && !isPending;

  return (
    <SettingsSection label="Profile">
      <Card className="[--card-spacing:--spacing(6)]">
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-6">
              <div className="flex items-start gap-5">
                <Avatar size="lg" className="size-16 data-[size=lg]:size-16">
                  <AvatarImage alt={user.name} src={user.image ?? undefined} />
                  <AvatarFallback className="text-base">
                    {initialsFromName(form.watch("name") || user.name)}
                  </AvatarFallback>
                </Avatar>
                <Field className="min-w-0 flex-1" data-invalid={!!errors.name}>
                  <FieldLabel
                    htmlFor="display-name"
                    className={fieldLabelClassName}
                  >
                    Display name
                  </FieldLabel>
                  <Input
                    {...form.register("name")}
                    id="display-name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    disabled={isPending}
                  />
                  {errors.name && (
                    <FieldError>{errors.name.message}</FieldError>
                  )}
                </Field>
              </div>
              <Field aria-disabled="true">
                <FieldLabel htmlFor="email" className={fieldLabelClassName}>
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  disabled
                  value={user.email}
                  autoComplete="email"
                  readOnly
                />
              </Field>
              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={!canSave}>
                  {isPending ? <Loader2 className="animate-spin" /> : null}
                  Save
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </SettingsSection>
  );
};

export default ProfileSection;
