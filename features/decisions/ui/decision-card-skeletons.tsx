import { Skeleton } from "@/shared/components/ui/skeleton";

const DecisionCardSkeletons = () => {
  return (
    <div className="flex h-auto w-full flex-col gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-18 w-full rounded-xl" />
      ))}
    </div>
  );
};

export default DecisionCardSkeletons;
