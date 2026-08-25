"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  CATEGORIES,
  CATEGORY_IDS,
} from "@/shared/constants/catergories.consts";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { useDecisionFilterParams } from "../hooks/use-decision-filter-params";

const CATEGORY_VALUES = new Set<string>(CATEGORY_IDS);

const DecisionsCategoryTabs = () => {
  const isMobile = useIsMobile();
  const { searchParams, setFilterParam } = useDecisionFilterParams();

  const rawCategory = searchParams.get("category");
  const categoryValue =
    rawCategory && CATEGORY_VALUES.has(rawCategory) ? rawCategory : "all";

  return (
    <Tabs
      orientation={isMobile ? "vertical" : "horizontal"}
      className="bg-card rounded-md px-1 py-1.5 max-lg:w-full"
      value={categoryValue}
      onValueChange={(next) =>
        setFilterParam("category", next === "all" ? undefined : next)
      }
    >
      <TabsList variant="line" className="max-lg:w-full">
        <TabsTrigger value="all">All</TabsTrigger>
        {CATEGORIES.map((category) => (
          <TabsTrigger key={category.id} value={category.id}>
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default DecisionsCategoryTabs;
