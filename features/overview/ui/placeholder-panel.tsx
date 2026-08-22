import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty";

type PlaceholderPanelProps = {
  title: string;
  description: string;
};

const PlaceholderPanel = ({ title, description }: PlaceholderPanelProps) => {
  return (
    <Empty className="min-h-36 justify-center border">
      <EmptyHeader>
        <EmptyTitle className="text-muted-foreground font-normal">
          {title}
        </EmptyTitle>
        <EmptyDescription className="text-muted-foreground/70">
          {description}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default PlaceholderPanel;
