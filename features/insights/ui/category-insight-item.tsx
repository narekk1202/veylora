import type { ComponentType } from "react";

type CategoryInsightItemProps = {
  icon: ComponentType<{ className?: string }>;
  color: string;
  title: string;
  description: string;
};

const CategoryInsightItem = ({
  icon: Icon,
  color,
  title,
  description,
}: CategoryInsightItemProps) => {
  return (
    <div className="flex items-start gap-4">
      <div
        className="flex size-8 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}1A`, color }}
        aria-hidden
      >
        <Icon className="size-4" />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CategoryInsightItem;
