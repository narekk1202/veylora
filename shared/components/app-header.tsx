import { User } from "better-auth"
import AvatarDropdown from "./avatar-dropdown"
import { SidebarTrigger } from "./ui/sidebar"
import UserGreeter from "./user-greeter"

type AppHeaderProps = {
  user: User;
};

const AppHeader = ({ user }: AppHeaderProps) => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <UserGreeter user={user} />
      </div>
      <AvatarDropdown user={user} />
    </header>
  );
};

export default AppHeader;
