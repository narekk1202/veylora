import { cn } from "@/shared/lib/utils";

type SettingsSectionProps = {
  label: string;
  labelClassName?: string;
  children: React.ReactNode;
};

const SettingsSection = ({
  label,
  labelClassName,
  children,
}: SettingsSectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h2
        className={cn(
          "text-muted-foreground text-[11px] font-semibold tracking-wider uppercase",
          labelClassName,
        )}
      >
        {label}
      </h2>
      {children}
    </section>
  );
};

export default SettingsSection;
