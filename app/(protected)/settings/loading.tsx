import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";

function SectionSkeleton({
  headingClassName,
  children,
}: {
  headingClassName: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <Skeleton className={cn("h-3", headingClassName)} />
      {children}
    </section>
  );
}

export default function Loading() {
  return (
    <main className="page_view" aria-busy="true">
      <span className="sr-only">Loading settings</span>
      <Skeleton className="h-10 w-40 max-sm:h-9" />

      <SectionSkeleton headingClassName="w-16">
        <Card className="[--card-spacing:--spacing(6)]">
          <CardContent className="flex flex-col gap-6">
            <div className="flex items-start gap-5">
              <Skeleton className="size-16 shrink-0 rounded-full" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-11 w-full" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-9 w-16" />
            </div>
          </CardContent>
        </Card>
      </SectionSkeleton>

      <SectionSkeleton headingClassName="w-36">
        <Card className="gap-0 py-0">
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-full max-w-sm" />
            </div>
            <Skeleton className="h-5 w-8 rounded-full" />
          </div>
          <div className="flex items-center justify-between gap-4 border-t px-5 py-4">
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-3 w-full max-w-xs" />
            </div>
            <Skeleton className="h-5 w-8 rounded-full" />
          </div>
          <div className="flex flex-col gap-2 border-t px-5 py-5">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-11 w-full" />
          </div>
        </Card>
      </SectionSkeleton>

      <SectionSkeleton headingClassName="w-28">
        <Card className="gap-0 py-0">
          <div className="px-5 py-4">
            <Skeleton className="h-4 w-52" />
          </div>
          <div className="border-t px-5 py-4">
            <Skeleton className="h-4 w-44" />
          </div>
        </Card>
      </SectionSkeleton>

      <SectionSkeleton headingClassName="w-24">
        <Card className="[--card-spacing:--spacing(5)]">
          <CardContent className="flex items-center justify-between gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-full max-w-xs" />
            </div>
            <Skeleton className="h-9 w-16" />
          </CardContent>
        </Card>
      </SectionSkeleton>
    </main>
  );
}
