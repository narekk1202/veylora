import BrandText from "@/shared/components/brand-text";
import BrandingMessage from "./branding-message";

type BrandingHeaderProps = {
  title: string;
  description: string;
};

const BrandingHeader = ({ title, description }: BrandingHeaderProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <BrandText />
      <BrandingMessage title={title} description={description} />
    </div>
  );
};

export default BrandingHeader;
