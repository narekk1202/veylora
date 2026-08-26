"use client";

import { Button } from "@/shared/components/ui/button";
import {
  CATEGORIES,
  CATEGORY_IDS,
} from "@/shared/constants/catergories.consts";
import { cn } from "@/shared/lib/utils";
import { useDecisionFilterParams } from "../hooks/use-decision-filter-params";

const CATEGORY_VALUES = new Set<string>(CATEGORY_IDS);

const DecisionsCategoryTabs = () => {
  const { searchParams, setFilterParam } = useDecisionFilterParams();

  const rawCategory = searchParams.get("category");
  const categoryValue =
    rawCategory && CATEGORY_VALUES.has(rawCategory) ? rawCategory : "all";

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        aria-pressed={categoryValue === "all"}
        variant={categoryValue === "all" ? "secondary" : "outline"}
        className={cn("text-muted-foreground", {
          "text-foreground bg-foreground/10": categoryValue === "all",
        })}
        onClick={() => setFilterParam("category", "all")}
      >
        All Categories
      </Button>
      {CATEGORIES.map((option) => {
        const isSelected = categoryValue === option.id;

        return (
          <Button
            key={option.id}
            type="button"
            aria-pressed={isSelected}
            variant={isSelected ? "secondary" : "outline"}
            className={cn("text-muted-foreground", {
              "text-foreground bg-foreground/10": isSelected,
            })}
            onClick={() => setFilterParam("category", option.id)}
          >
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: option.color }}
            />
            {option.name}
          </Button>
        );
      })}
    </div>
  );
};

export default DecisionsCategoryTabs;
