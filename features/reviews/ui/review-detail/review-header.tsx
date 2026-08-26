type ReviewHeaderProps = {
  status?: "pending" | "completed";
};

const COPY = {
  pending: {
    title: "Time to revisit this decision.",
    description:
      "Reflection is the bridge between experience and insight. Record honestly what happened, without judgment of your past self.",
  },
  upcoming: {
    title: "Soon you'll be able to review this decision.",
    description:
      "We'll send you a notification when it's time to review this decision.",
  },
  completed: {
    title: "This decision has been reviewed.",
    description:
      "Here is what you recorded when you revisited this prediction — your outcome, calibration, and lessons kept for future insight.",
  },
} as const;

const ReviewHeader = ({ status = "pending" }: ReviewHeaderProps) => {
  const copy = COPY[status];

  return (
    <header className="flex flex-col gap-3">
      <h1 className="font-serif text-4xl font-medium tracking-tight max-sm:text-3xl">
        {copy.title}
      </h1>
      <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed font-medium sm:text-[15px]">
        {copy.description}
      </p>
    </header>
  );
};

export default ReviewHeader;
