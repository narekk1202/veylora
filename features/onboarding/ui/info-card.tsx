type InfoCardProps = {
  index: number;
  title: string;
  description: string;
};

const InfoCard = ({ index, title, description }: InfoCardProps) => {
  return (
    <div className="border-muted-foreground/20 bg-muted flex h-23 w-full max-w-2xl items-center gap-5 rounded-lg border p-6">
      <span className="text-primary text-sm">{index}</span>
      <div className="flex flex-col items-start">
        <span className="text-md font-medium">{title}</span>
        <span className="text-muted-foreground gap-1 text-xs">
          {description}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
