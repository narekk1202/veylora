type BrandingMessageProps = {
  title: string;
  description: string;
};

const BrandingMessage = ({ title, description }: BrandingMessageProps) => {
  return (
    <>
      <h1 className="mt-9 font-serif text-4xl font-medium max-sm:text-3xl">
        {title}
      </h1>
      <p className="text-muted-foreground mt-5 w-full max-w-md text-center font-sans text-sm font-medium">
        {description}
      </p>
    </>
  );
};

export default BrandingMessage;
