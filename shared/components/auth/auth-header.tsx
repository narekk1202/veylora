import BrandText from "../brand-text";
import AuthWelcomeMessage from "./auth-welcome-message";

type AuthHeaderProps = {
  title: string;
  description: string;
};

const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <BrandText />
      <AuthWelcomeMessage title={title} description={description} />
    </div>
  );
};

export default AuthHeader;
