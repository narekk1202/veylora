"use client";

import { Skeleton } from "@/shared/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useReviewFilterParams } from "../hooks/use-review-filter-params";
import { REVIEW_STATUS_FILTERS } from "../schemas";

const STATUS_VALUES = new Set<string>(REVIEW_STATUS_FILTERS);

export function ReviewsTabsFallback() {
  return <Skeleton className="h-10 w-72" />;
}

const ReviewsTabs = ({ dueCount }: { dueCount: number }) => {
  const { searchParams, setFilterParam } = useReviewFilterParams();

  const rawStatus = searchParams.get("status");
  const statusValue =
    rawStatus && STATUS_VALUES.has(rawStatus) ? rawStatus : "all";

  return (
    <Tabs
      value={statusValue}
      onValueChange={(next) =>
        setFilterParam("status", next === "all" ? undefined : next)
      }
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
