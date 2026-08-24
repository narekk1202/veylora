import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const DecisionsAddCard = () => {
  return (
    <Card className="flex justify-center px-4 py-6 sm:min-h-44.5 sm:px-5">
      <CardHeader className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col justify-center gap-2 text-center sm:text-left">
          <CardTitle className="font-serif text-xl font-medium sm:text-2xl">
            What are you deciding?
          </CardTitle>
          <CardDescription className="text-muted-foreground mx-auto w-full max-w-md text-sm leading-6 font-medium sm:mx-0">
            Capture your thinking before you act. Veylora locks your reasoning
            to help you learn from your past self.
          </CardDescription>
        </div>
        <CardAction className="col-start-auto row-span-1 row-start-auto w-full sm:w-auto">
          <Button className="h-12 w-full sm:w-44.5">New decision</Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default DecisionsAddCard;
