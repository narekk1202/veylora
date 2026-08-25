const EmptyDecisions = () => {
  return (
    <div className="mt-10 flex h-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-foreground text-center font-serif text-2xl font-bold">
            No decisions yet
          </h1>
          <p className="text-muted-foreground text-center text-sm leading-5">
            Create your first decision to get started.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyDecisions;
