"use client";

import ConfirmDialog from "@/shared/components/confirm-dialog";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import SettingsSection from "./settings-section";

const DangerZoneSection = () => {
  return (
    <SettingsSection label="Danger zone" labelClassName="text-destructive">
      <Card className="border-destructive/20 bg-destructive/5 [--card-spacing:--spacing(5)]">
        <CardContent className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-stretch">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-sm font-medium">Delete account</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Permanently remove your account and all locked decisions.
            </p>
          </div>
          <ConfirmDialog
            title="Delete account"
            description="This permanently removes your account and all locked decisions. This action cannot be undone."
            onConfirm={() => undefined}
          >
            <Button
              variant="outline"
              className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive h-9 shrink-0 px-4 max-sm:w-full"
            >
              Delete
            </Button>
          </ConfirmDialog>
        </CardContent>
      </Card>
    </SettingsSection>
  );
};

export default DangerZoneSection;
