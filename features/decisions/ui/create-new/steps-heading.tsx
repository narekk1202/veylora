import { Badge } from "@/shared/components/ui/badge";
import {
  CATEGORY_CONFIG,
  CategoryKey,
} from "@/shared/constants/catergories.consts";

type StepsHeadingProps = {
  title: string;
  description: string;
  category?: CategoryKey;
};

const StepsHeading = ({ title, description, category }: StepsHeadingProps) => {
  const categoryMeta = category ? CATEGORY_CONFIG[category] : undefined;

  return (
    <header className="flex flex-col gap-2">
      {categoryMeta && (
        <Badge
          className="h-5.75 uppercase"
          style={{
            color: categoryMeta.color,
            backgroundColor: `${categoryMeta.color}40`,
          }}
        >
          {categoryMeta.name} decision
        </Badge>
      )}
      <h2 className="font-serif text-4xl font-medium italic max-sm:text-3xl">
        {title}
      </h2>
      <p className="text-muted-foreground text-sm font-medium">{description}</p>
    </header>
  );
};

export default StepsHeading;
