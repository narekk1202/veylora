"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import type { ReviewTab } from "../types";

type ReviewsTabsProps = {
  value: ReviewTab;
  dueCount: number;
  onValueChange: (value: ReviewTab) => void;
};

const ReviewsTabs = ({ value, dueCount, onValueChange }: ReviewsTabsProps) => {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => onValueChange(next as ReviewTab)}
      className="w-fit"
    >
      <TabsList className="h-auto gap-1 rounded-lg p-1">
        <TabsTrigger value="all" className="px-3 py-1.5">
          All
        </TabsTrigger>
        <TabsTrigger value="due" className="px-3 py-1.5">
          Due now {dueCount > 0 ? `(${dueCount})` : ""}
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="px-3 py-1.5">
          Upcoming
        </TabsTrigger>
        <TabsTrigger value="completed" className="px-3 py-1.5">
          Completed
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ReviewsTabs;
