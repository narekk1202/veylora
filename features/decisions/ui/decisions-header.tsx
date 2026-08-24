import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

const DecisionsHeader = () => {
  return (
    <header className="flex h-auto w-full justify-between max-md:flex-col max-md:gap-4 md:items-center">
      <div className="flex flex-col items-start gap-3">
        <h1 className="font-serif text-2xl font-medium">Decisions</h1>
        <p className="text-muted-foreground text-sm">
          Your full decision archive — locked, in progress, and reviewed.
        </p>
      </div>

      <Link
        href="/decisions/new"
        className={cn(
          buttonVariants({ variant: "default" }),
          "h-12 w-44.5 max-sm:w-full",
        )}
      >
        New decision
      </Link>
    </header>
  );
};

export default DecisionsHeader;
