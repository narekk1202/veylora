import {
  Card,
  CardContent,
  CardHeader,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { Skeleton } from "@/shared/components/ui/skeleton";

function MetricStatCardSkeleton() {
  return (
    <Card className="h-full [--card-spacing:--spacing(6)]">
      <CardHeader>
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-9 w-16" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-2 w-full" />
      </CardContent>
    </Card>
  );
}

function CategoryItemSkeleton() {
  return (
    <div className="flex items-start gap-4">
      <Skeleton className="size-8 shrink-0 rounded-lg" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}

function TimelineEstimateSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end justify-between gap-3">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-2 w-full" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="page_view gap-12" aria-busy="true">
      <span className="sr-only">Loading insights</span>

      <header className="flex h-auto w-full justify-between max-md:flex-col max-md:gap-4 md:items-center">
        <div className="flex flex-col items-start gap-3">
          <Skeleton className="h-10 w-36 max-sm:h-9" />
          <div className="flex w-full max-w-2xl flex-col gap-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <MetricStatCardSkeleton />
        </div>
        <div className="lg:col-span-3">
          <MetricStatCardSkeleton />
        </div>
        <div className="md:col-span-2 lg:col-span-6">
          <Card className="h-full flex-row items-center [--card-spacing:--spacing(6)]">
            <div className="min-w-0 flex-1">
              <CardHeader>
                <Skeleton className="h-3 w-32" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </div>
            <Skeleton className="mr-(--card-spacing) ml-6 h-12 w-32 shrink-0" />
          </Card>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Card className="h-full [--card-spacing:--spacing(8)]">
            <CardHeader>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="flex flex-col gap-12">
              <Skeleton className="h-64 w-full" />
              <div className="flex flex-col gap-2 rounded-lg border p-4">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-5">
          <Card className="h-full [--card-spacing:--spacing(8)]">
            <CardHeader>
              <Skeleton className="h-4 w-40" />
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-8">
              <div className="flex flex-1 flex-col gap-8">
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
              </div>
              <div className="mt-auto flex flex-col gap-8">
                <Separator />
                <Skeleton className="mx-auto h-4 w-64" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Card className="[--card-spacing:--spacing(8)]">
        <CardHeader>
          <Skeleton className="h-4 w-44" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center gap-6">
            <TimelineEstimateSkeleton />
            <TimelineEstimateSkeleton />
          </div>
          <div className="flex flex-col justify-center lg:border-l lg:pl-16">
            <Separator className="mb-8 lg:hidden" />
            <div className="flex max-w-xs flex-col gap-3">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
