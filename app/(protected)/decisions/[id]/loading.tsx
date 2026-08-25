import { Skeleton } from "@/shared/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="page_view max-w-6xl gap-10">
      <div className="space-y-4 border-b pb-6">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-12 w-full max-w-3xl" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-8">
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-36 w-full" />
        </div>
      </div>
    </main>
  );
}
