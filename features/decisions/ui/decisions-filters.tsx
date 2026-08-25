"use client";

import { Input } from "@/shared/components/ui/input";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { DecisionStatus } from "@/shared/generated/prisma/enums";
import { useEffect, useState } from "react";
import { useDecisionFilterParams } from "../hooks/use-decision-filter-params";
import DecisionsCategoryTabs from "./decisions-category-tabs";

const SEARCH_DEBOUNCE_MS = 300;

const STATUS_VALUES = new Set<string>(Object.values(DecisionStatus));

export function DecisionsFiltersFallback() {
  return (
    <div className="flex items-center gap-3 max-lg:flex-col">
      <Skeleton className="h-9 w-full lg:max-w-sm" />
      <Skeleton className="h-10 w-full lg:w-72" />
      <Skeleton className="h-10 w-full lg:flex-1" />
    </div>
  );
}

const DecisionsFilters = () => {
  const { searchParams, setFilterParam } = useDecisionFilterParams();
  const qFromUrl = searchParams.get("q") ?? "";
  const [search, setSearch] = useState(qFromUrl);
  const [prevQFromUrl, setPrevQFromUrl] = useState(qFromUrl);
  const [pendingQ, setPendingQ] = useState<string | null>(null);

  if (qFromUrl !== prevQFromUrl) {
    setPrevQFromUrl(qFromUrl);
    if (pendingQ === qFromUrl) {
      setPendingQ(null);
    } else {
      setSearch(qFromUrl);
    }
  }

  const rawStatus = searchParams.get("status");
  const statusValue =
    rawStatus && STATUS_VALUES.has(rawStatus) ? rawStatus : "all";

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed === qFromUrl) return;

    const timeoutId = window.setTimeout(() => {
      setPendingQ(trimmed);
      setFilterParam("q", trimmed || undefined);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [qFromUrl, search, setFilterParam]);

  return (
    <div className="flex items-center gap-3 max-lg:flex-col">
      <Input
        placeholder="Search decisions"
        className="w-full lg:max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Tabs
        className="bg-card rounded-md px-1 py-1.5 max-lg:w-full"
        value={statusValue}
        onValueChange={(next) =>
          setFilterParam("status", next === "all" ? undefined : next)
        }
      >
        <TabsList variant="line" className="max-lg:w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value={DecisionStatus.LOCKED}>Locked</TabsTrigger>
          <TabsTrigger value={DecisionStatus.REVIEWED}>Reviewed</TabsTrigger>
        </TabsList>
      </Tabs>

      <DecisionsCategoryTabs />
    </div>
  );
};

export default DecisionsFilters;
