import { buttonVariants } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

const EmptyInsights = () => {
  return (
    <Card className="py-0">
      <Empty className="min-h-80 border-0 py-16">
        <EmptyHeader className="max-w-md gap-3">
          <EmptyTitle className="font-serif text-2xl font-medium tracking-normal">
            Insights unlock after your first review
          </EmptyTitle>
          <EmptyDescription>
            Complete a review to see patterns in how you predict, how confident
            you are, and how your timelines hold up.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-2 max-w-none justify-center gap-4 sm:flex-row">
          <Link
            href="/reviews"
            className={cn(buttonVariants({ variant: "default" }), "h-12 px-5")}
          >
            Go to reviews
          </Link>
        </EmptyContent>
      </Empty>
    </Card>
  );
};

export default EmptyInsights;
