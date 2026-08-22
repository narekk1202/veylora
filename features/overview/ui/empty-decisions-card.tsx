import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty";

const EmptyDecisionsCard = () => {
  return (
    <Card className="py-0">
      <Empty className="min-h-80 border-0 py-16">
        <EmptyHeader className="max-w-md gap-3">
          <EmptyTitle className="font-serif text-2xl font-medium tracking-normal">
            No decisions yet
          </EmptyTitle>
          <EmptyDescription>
            Capture a decision before you act. Veylora will lock your thinking
            so you can learn from your past self later.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-2 max-w-none flex-row justify-center gap-4">
          <Button type="button" className="h-12 px-5">
            Record your first decision
          </Button>
          <Button
            type="button"
            variant="link"
            className="text-muted-foreground"
          >
            How Veylora works
          </Button>
        </EmptyContent>
      </Empty>
    </Card>
  );
};

export default EmptyDecisionsCard;
