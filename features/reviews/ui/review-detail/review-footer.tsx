import { Button } from "@/shared/components/ui/button";

type ReviewFooterProps = {
  onComplete?: () => void;
};

const ReviewFooter = ({ onComplete }: ReviewFooterProps) => {
  return (
    <footer className="border-border/40 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-muted-foreground text-xs italic">
        This review will be permanently added to your insights.
      </p>
      <Button type="button" className="h-11 shrink-0 px-8" onClick={onComplete}>
        Complete review
      </Button>
    </footer>
  );
};

export default ReviewFooter;
