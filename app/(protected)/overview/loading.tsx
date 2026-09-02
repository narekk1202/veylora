import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="page_view" aria-busy="true">
      <span className="sr-only">Loading overview</span>

      <Card className="flex justify-center px-4 py-6 sm:min-h-44.5 sm:px-5">
        <CardHeader className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-8 w-64 max-sm:mx-auto" />
            <Skeleton className="h-4 w-full max-w-md max-sm:mx-auto" />
            <Skeleton className="h-4 w-3/4 max-w-sm max-sm:mx-auto" />
          </div>
          <Skeleton className="h-12 w-full sm:w-44.5" />
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-8">
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="h-[86px] w-full rounded-xl" />
            <Skeleton className="h-[86px] w-full rounded-xl" />
          </section>
          <section className="flex flex-col gap-4">
            <Skeleton className="h-4 w-36" />
            <Card className="gap-0 py-0">
              <div className="px-4 py-3.5">
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="border-t px-4 py-3.5">
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="border-t px-4 py-3.5">
                <Skeleton className="h-4 w-1/2" />
              </div>
            </Card>
          </section>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Card className="h-full [--card-spacing:--spacing(6)]">
            <CardHeader>
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
              <Skeleton className="h-24 w-full" />
              <div className="flex flex-col gap-3">
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-1 w-full" />
                <Skeleton className="h-1 w-4/5" />
                <Skeleton className="h-1 w-3/5" />
              </div>
            </CardContent>
            <CardFooter className="border-t-0 bg-transparent">
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
