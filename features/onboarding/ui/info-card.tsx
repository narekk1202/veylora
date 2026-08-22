import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

type InfoCardProps = {
  index: number;
  title: string;
  description: string;
};

const InfoCard = ({ index, title, description }: InfoCardProps) => {
  return (
    <Card size="sm" className="flex h-24.5 w-full max-w-2xl justify-center">
      <CardHeader className="flex items-center gap-5 ml-10">
        <span className="text-primary text-sm">{index}</span>
        <div className="flex flex-col gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default InfoCard;
