const ReviewHeader = () => {
  return (
    <header className="flex flex-col gap-3">
      <h1 className="font-serif text-4xl font-medium tracking-tight max-sm:text-3xl">
        Time to revisit this decision.
      </h1>
      <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed font-medium sm:text-[15px]">
        Reflection is the bridge between experience and insight. Record honestly
        what happened, without judgment of your past self.
      </p>
    </header>
  );
};

export default ReviewHeader;
