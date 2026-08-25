import { CheckCircle2, Circle, Clock3 } from "lucide-react";

const LifecycleItem = ({
  active,
  complete,
  date,
  label,
}: {
  active: boolean;
  complete?: boolean;
  date: string;
  label: string;
}) => {
  const Icon = complete ? CheckCircle2 : active ? Clock3 : Circle;

  return (
    <li className="relative flex gap-3 pb-5 last:pb-0">
      <span
        className={
          active
            ? "border-primary bg-primary/15 text-primary flex size-5 shrink-0 items-center justify-center rounded-full"
            : "text-muted-foreground flex size-5 shrink-0 items-center justify-center rounded-full border"
        }
      >
        <Icon className="size-10" />
      </span>
      <span>
        <span
          className={
            active
              ? "block text-xs font-medium"
              : "text-muted-foreground block text-xs"
          }
        >
          {label}
        </span>
        <span className="text-muted-foreground block text-[10px]">{date}</span>
      </span>
    </li>
  );
};

export default LifecycleItem;
