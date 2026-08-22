import AvatarDropdown from "./avatar-dropdown";
import { SidebarTrigger } from "./ui/sidebar";
import UserGreeter from "./user-greeter";

const AppHeader = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <UserGreeter />
      </div>
      <AvatarDropdown />
    </header>
  );
};

export default AppHeader;
