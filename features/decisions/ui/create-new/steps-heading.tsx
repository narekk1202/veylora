import { Badge } from "@/shared/components/ui/badge";
import { CATEGORY_COLOR } from "@/shared/constants/catergories.consts";
import { DecisionCategory } from "../../types";

type StepsHeadingProps = {
  title: string;
  description: string;
  category?: DecisionCategory;
};

const StepsHeading = ({ title, description, category }: StepsHeadingProps) => {
  const categoryColor = CATEGORY_COLOR[category as DecisionCategory];
  return (
    <header className="flex flex-col gap-2">
      {category && (
        <Badge
          className="h-5.75 uppercase"
          style={{
            color: categoryColor,
            backgroundColor: `${categoryColor}40`,
          }}
        >
          {category} decision
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
