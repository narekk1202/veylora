const EmptyReviews = ({ message }: { message: string }) => {
  return (
    <div className="mt-6 flex flex-col items-center justify-center py-12">
      <h2 className="text-foreground text-center font-serif text-2xl font-medium">
        Nothing here
      </h2>
      <p className="text-muted-foreground mt-1 text-center text-sm">{message}</p>
    </div>
  );
};

export default EmptyReviews;
