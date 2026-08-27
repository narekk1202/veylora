type PageHeaderProps = {
  title: string;
  description: string;
  render?: React.ReactNode;
};

const PageHeader = ({ title, description, render }: PageHeaderProps) => {
  return (
    <header className="flex h-auto w-full justify-between max-md:flex-col max-md:gap-4 md:items-center">
      <div className="flex flex-col items-start gap-3">
        <h1 className="font-serif text-4xl tracking-tight max-sm:text-3xl">
          {title}
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          {description}
        </p>
      </div>
      {render}
    </header>
  );
};

export default PageHeader;
