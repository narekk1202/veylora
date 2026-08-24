import { Button } from "@/shared/components/ui/button";

const DecisionsHeader = () => {
  return (
    <header className="flex h-auto w-full items-center justify-between max-md:flex-col max-md:gap-4">
      <div className="flex flex-col items-start gap-3">
        <h1 className="font-serif text-2xl font-medium">Decisions</h1>
        <p className="text-muted-foreground text-sm">
          Your full decision archive — locked, in progress, and reviewed.
        </p>
      </div>

      <Button className="h-12 w-44.5 max-sm:w-full">New decision</Button>
    </header>
  );
};

export default DecisionsHeader;
