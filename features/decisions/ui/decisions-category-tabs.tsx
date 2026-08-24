'use client'

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { CATEGORIES } from "@/shared/constants/catergories.consts";
import { useIsMobile } from "@/shared/hooks/use-mobile";

const DecisionsCategoryTabs = () => {
  const isMobile = useIsMobile();

  return (
    <Tabs
      defaultValue="all"
      orientation={isMobile ? "vertical" : "horizontal"}
      className="bg-card rounded-md px-1 py-1.5 max-lg:w-full"
    >
      <TabsList variant="line" className="max-lg:w-full">
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
