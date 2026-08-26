"use client";

import { NewDecisionSchema } from "@/features/decisions/schemas";
import { buttonVariants } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import { cn } from "@/shared/lib/utils";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

const LockedStep = () => {
  const form = useFormContext<NewDecisionSchema>();

  return (
    <Empty className="min-h-[70vh] gap-8 border-0 py-8">
      <EmptyHeader className="max-w-lg gap-3">
        <EmptyMedia className="border-primary size-16 rounded-full border-2 bg-transparent">
          <Lock />
        </EmptyMedia>
        <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
          Step complete
        </p>
        <EmptyTitle className="font-serif text-4xl font-medium tracking-normal max-sm:text-3xl">
          Decision locked.
        </EmptyTitle>
        <EmptyDescription>
          Your reasoning is now locked. No edits — only honest reflection later.
        </EmptyDescription>
        <p className="text-muted-foreground/60 text-sm">
          Review scheduled for{" "}
          {form.getValues("reviewDate").toLocaleDateString()}
        </p>
      </EmptyHeader>

      <Card className="w-full max-w-lg text-left">
        <CardContent className="flex flex-col gap-3">
          <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            {form.getValues("question")}
          </p>
          <p className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span
              className="font-semibold tracking-wider uppercase"
              style={{
                color: Object.values(CATEGORY_CONFIG).find(
                  (config) => config.id === form.getValues("category"),
                )?.color,
              }}
            >
              {
                Object.values(CATEGORY_CONFIG).find(
                  (config) => config.id === form.getValues("category"),
                )?.name
              }
            </span>
            <span aria-hidden>·</span>
            <span>{form.getValues("confidence")}% confidence</span>
            <span aria-hidden>·</span>
            <span>Locked just now</span>
          </p>
        </CardContent>
      </Card>

      <EmptyContent className="max-w-lg flex-row flex-wrap justify-center">
        <Link
          href="/decisions"
          className={cn(buttonVariants({ variant: "default" }), "h-11 px-8")}
        >
          View decisions
        </Link>
        <Link
          href="/overview"
          className={cn(buttonVariants({ variant: "outline" }), "h-11 px-8")}
        >
          Back to overview
        </Link>
      </EmptyContent>
    </Empty>
  );
};

export default LockedStep;
