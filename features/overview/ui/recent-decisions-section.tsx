import { Card } from "@/shared/components/ui/card";
import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import type { Category } from "@/shared/generated/prisma/enums";
import { Briefcase, Heart, User, Wallet, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { OverviewDecision } from "../types";
import { formatRelativeDate } from "../utils";

const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  CAREER: Briefcase,
  FINANCE: Wallet,
  PERSONAL: User,
  RELATIONSHIPS: Heart,
};

type RecentDecisionsSectionProps = {
  decisions: OverviewDecision[];
};

const RecentDecisionsSection = ({ decisions }: RecentDecisionsSectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Recent decisions
      </h2>
      <Card className="gap-0 py-0">
        {decisions.map((decision) => {
          const Icon = CATEGORY_ICONS[decision.category];
          const color = CATEGORY_CONFIG[decision.category].color;

          return (
            <Link
              key={decision.id}
              href={`/decisions/${decision.id}`}
              className="hover:bg-muted/40 flex items-center justify-between gap-4 px-4 py-3.5 transition-colors not-first:border-t first:rounded-t-xl last:rounded-b-xl"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Icon
                  className="size-4 shrink-0"
                  style={{ color }}
                  aria-hidden
                />
                <span className="truncate text-sm">{decision.question}</span>
              </span>
              <span className="text-muted-foreground shrink-0 text-[10px] tracking-wide">
                {formatRelativeDate(decision.createdAt)}
              </span>
            </Link>
          );
        })}
      </Card>
    </section>
  );
};

export default RecentDecisionsSection;
