import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import type { Category } from "@/shared/generated/prisma/enums";
import { Briefcase, Heart, User, Wallet, type LucideIcon } from "lucide-react";
import type { CategoryInsight } from "../types";
import CategoryInsightItem from "./category-insight-item";

const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  CAREER: Briefcase,
  FINANCE: Wallet,
  PERSONAL: User,
  RELATIONSHIPS: Heart,
};

type CategoryInsightsCardProps = {
  insights: CategoryInsight[];
};

const CategoryInsightsCard = ({ insights }: CategoryInsightsCardProps) => {
  return (
    <Card className="h-full [--card-spacing:--spacing(8)]">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
          Category Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-8">
        <div className="flex flex-1 flex-col gap-8">
          {insights.map((insight) => (
            <CategoryInsightItem
              key={`${insight.category}-${insight.title}`}
              icon={CATEGORY_ICONS[insight.category]}
              color={CATEGORY_CONFIG[insight.category].color}
              title={insight.title}
              description={insight.description}
            />
          ))}
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
