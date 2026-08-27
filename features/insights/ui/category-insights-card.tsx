import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import { Briefcase, User, Wallet } from "lucide-react";
import CategoryInsightItem from "./category-insight-item";

const CategoryInsightsCard = () => {
  return (
    <Card className="h-full [--card-spacing:--spacing(8)]">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
          Category Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-8">
        <div className="flex flex-1 flex-col gap-8">
          <CategoryInsightItem
            icon={Briefcase}
            color={CATEGORY_CONFIG.CAREER.color}
            title="Career Clarity"
            description="You tend to be most confident about career decisions (Avg. 84%). These also show the most detailed pre-decision reasoning."
          />
          <CategoryInsightItem
            icon={Wallet}
            color={CATEGORY_CONFIG.FINANCE.color}
            title="Financial Hesitation"
            description="Finance decisions are often revisited after locking. You tend to be 20% less confident here than in other categories."
          />
          <CategoryInsightItem
            icon={User}
            color={CATEGORY_CONFIG.PERSONAL.color}
            title="Personal Accuracy"
            description='90% of your "Mostly accurate" predictions fall under the Personal category.'
          />
        </div>
        <div className="mt-auto flex flex-col gap-8">
          <Separator />
          <p className="text-muted-foreground text-center font-serif text-sm italic">
            &ldquo;To know yourself is the beginning of all wisdom.&rdquo;
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryInsightsCard;
